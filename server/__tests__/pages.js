import { isToGetHtmlFile } from '../pages'

test('pages:isToGetHtmlFile', () => {
  expect(isToGetHtmlFile('http://houseplant.com/index.html')).toBeTruthy()
})