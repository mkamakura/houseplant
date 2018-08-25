import React from 'react'
import configure from '../mocks/configure'

export default () => {
  return configure.pages.map((page) => (
    <div>
      {page.uri}
    </div>
  ))
}
