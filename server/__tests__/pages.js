import assert from 'assert'
import rewire from 'rewire'

const pages = rewire('../pages.js')
const isToGetHtmlFile = pages.__get__('isToGetHtmlFile')

test('pages: isToGetHtmlFile', () => {

})