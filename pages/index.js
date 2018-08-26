import React from 'react'
import { isArray } from 'lodash/fp'
import URI from 'urijs'
import configure from '../mocks/configure' // TODO

export default () => {
  const { siteGroup, pages } = configure
  return (
    <div>
      <h2>HTML</h2>
      {<SiteSelect siteGroup={siteGroup}/>}
      {<Pages pages={pages}/>}
    </div>
  )
}

function SiteSelect({ siteGroup }) {
  return (
    <div>
      {Object.entries(siteGroup).map(([key, val]) => <div>{key}{val}</div>)}
    </div>
  )
}

function Pages({ pages }) {
  return (
    <div>
      {pages.map((page) => {
        if (isArray(page.variations)) {
          const variations = page.variations
          return variations.map((variation) => (
            <div>
              <span>{variation.description}</span>
              <span>{typeof URI(`http://localhost:8180/${variation.baseFile}`).query({
                houseplant: variation.label
              }).toString()}</span>
            </div>
          ))
        } else {
          return Object.keys(page.variations).map((key) => {
            const variations = page.variations[key]
            return variations.map((variation) => {
              const { label, description } = variation
              return (
                <div>
                  <span>{description}</span>
                  <span>{URI(`http://localhost:8180/${variation.baseFile}`).query({
                    houseplant: label,
                    device: key,
                  }).toString()}</span>
                </div>
              )
            })
          })
        }
      })}
    </div>
  )
}