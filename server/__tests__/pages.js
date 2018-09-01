import {
  isToGetHtmlFile,
  hasRulesAndHouseplantQuery,
  getPathname,
  getRules,
  getVariations,
} from '../pages'

test('pages:getVariations', () => {
  const rules = {
    variations: {
      pc: [
        { label: 'default' },
      ],
    },
  }

  const query = { houseplant: 'default', device: 'pc' }
  expect(getVariations(rules, query)).toEqual([rules.variations.pc[0]])
})

test('pages:isToGetHtmlFile', () => {
  expect(isToGetHtmlFile('http://houseplant.com/index.html')).toBeTruthy()
  expect(isToGetHtmlFile('http://houseplant.com/index.js')).toBeFalsy()
})

test('pages:hasRulesAndHouseplantQuery', () => {
  const config = {
    pages: [
      {
        uri: '/test/index.html',
      },
    ],
  }
  const uri = 'http://houseplant.com/test/index.html?houseplant=default&device=pc'
  const query = { houseplant: 'default', device: 'pc' }
  const queryOnlyDevice = { device: 'pc' }
  expect(hasRulesAndHouseplantQuery(config, uri, query)).toBeTruthy()
  expect(hasRulesAndHouseplantQuery(config, uri, queryOnlyDevice)).toBeFalsy()
})

test('pages:getPathname', () => {
  const uri = 'http://houseplant.com/test/index.html?houseplant=default&device=pc'
  expect(getPathname(uri)).toEqual('/test/index.html')
})

test('pages:getRules', () => {
  const config = {
    pages: [
      {
        uri: '/test/index.html',
      },
    ],
  }
  const uri = 'http://houseplant.com/test/index.html'
  expect(getRules(config, uri)).toEqual(config.pages[0])
})
