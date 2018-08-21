import url from 'url'
import { join, extname } from 'path'
import fs from 'fs-extra'
import cheerio from 'cheerio'
import config from '../cavehouse'

const INDENT = '          '

export default (req, res, next) => {
  const { originalUrl, query } = req
  const pathname = url.parse(originalUrl).pathname
  if (extname(pathname) !== '.html') return next()
  const rules = config.pages.find((page) => page.uri === pathname)
  console.info(INDENT, `pages: ${rules.uri}`)
  let src = fs.readFileSync(join(config.rootDir, rules.baseDir, rules.baseFile), 'utf-8')

  const pattern = rules.patterns[query.pattern]
  if (pattern) {
    const $ = cheerio.load(src, { decodeEntities: false })
    const partsDir = join(config.rootDir, rules.baseDir)
    pattern.manipulates.forEach(({ selector, file }) => {
      const snippet = fs.readFileSync(join(partsDir, file), 'utf8')
      $(selector).replaceWith(snippet.toString())
    })
    src = $.html()
  }
  res.set('Content-Type', 'text/html')
  res.send(src)
}