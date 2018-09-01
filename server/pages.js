import url from 'url'
import { get } from 'lodash/fp'
import { join, extname, dirname } from 'path'
import fs from 'fs-extra'
import cheerio from 'cheerio'
import settings from './settings'
import configure from './configure'

import matchedVariations from './matchedVariations'

const INDENT = '          '

function importPartsHTML(src, partsDir) {
  const matches = src.match(/\[\[#@.*@#\]\]/g)
  if (matches !== null && matches !== undefined && matches.length !== 0) {
    matches.map(val => {
      console.info(INDENT, `tag  : ${val}`)
      const file = val
        .replace('[[#@', '')
        .replace('@#]]', '')
        .trim()
      const regexp = new RegExp(`\[\[#@[ ]*${file}[ ]*@#\]\]`, 'g')
      src = src.replace(
        regexp,
        fs.readFileSync(join(settings.rootDir, partsDir, file))
      )
    })
  } else {
    return src
  }

  return importPartsHTML(src, partsDir)
}

export default (req, res, next) => {
  const { originalUrl, query } = req

  if (!isToGetHtmlFile(originalUrl)) return next()
  if (!hasRulesAndHouseplantQuery(configure, originalUrl, query)) return next()
  const rules = getRules(configure, originalUrl)
  console.info(INDENT, `pages: ${rules.uri}`)

  const variations = getVariations(rules, query)
  const matched = matchedVariations(variations, req) || variations[0]
  const { manipulate, baseFile } = matched

  const baseFileDir =
    rules.baseDir ||
    join(get('subRoots.pages')(configure) || '.', dirname(rules.uri))
  console.info(
    INDENT,
    `file : ${join(settings.rootDir, baseFileDir, baseFile)}`
  )

  let src = fs.readFileSync(
    join(settings.rootDir, baseFileDir, baseFile),
    'utf8'
  )

  if (manipulate) {
    const $ = cheerio.load(src, { decodeEntities: false })
    const partsDir =
      rules.baseDir ||
      rules.partsDir ||
      get('subRoots.parts')(configure) ||
      baseFileDir
    entries(manipulate).forEach(([selector, file]) => {
      const snippet = fs.readFileSync(
        join(settings.rootDir, partsDir, file),
        'utf8'
      )
      $(selector).replaceWith(snippet.toString())
    })
    src = $.html()
  }

  res.set('Content-Type', 'text/html')
  res.send(importPartsHTML(
    src.toString('utf8'),
    get('subRoots.parts')(configure)
  ))
}

export function getVariations(rules, query) {
  const { device, houseplant } = query
  const variations = rules.variations
  if (device) {
    return variations[device].filter((variation) => variation.label === houseplant)
  } else {
    return variations.filter((variation) => variation.label === houseplant)
  }
}

export function isToGetHtmlFile(uri) {
  return extname(getPathname(uri)) === '.html'
}

export function hasRulesAndHouseplantQuery(config, uri, query) {
  return getRules(config, uri) && query.houseplant
}

export function getPathname(uri) {
  return url.parse(uri).pathname
}

export function getRules(config, uri) {
  const pathname = getPathname(uri)
  return config.pages.find(page => page.uri === pathname)
}
