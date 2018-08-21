import React from 'react'
import cavehouse from '../cavehouse'

export default () => cavehouse.pages.map((page) => {
  return (
    <div>
      <div>{page.title}</div>
      <ul>
        <li>
          <a href={page.uri}>{page.uri}</a>
        </li>
        {page.patterns.map((pattern, i) => (
          <li key={i}>
            <span>{pattern.title}</span>
            <a href={`${page.uri}?pattern=${i}`}>{`${page.uri}?pattern=${i}`}</a>
          </li>
        ))}
      </ul>
    </div>
  )
})
