import React from 'react'
import { isArray } from 'lodash/fp'
import URI from 'urijs'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'
import configure from '../mocks/configure' // TODO

export default () => {
  const { siteGroup, pages } = configure
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>houseplant</Toolbar>
      </AppBar>
      <Typography variant="headline" gutterBottom>
        HTML
      </Typography>
      {<SiteSelect siteGroup={siteGroup} />}
      {<Pages pages={pages} />}
    </div>
  )
}

function SiteSelect({ siteGroup }) {
  return (
    <div>
      {Object.entries(siteGroup).map(([key, val]) => (
        <div>
          {key}
          {val}
        </div>
      ))}
    </div>
  )
}

function Pages({ pages }) {
  return (
    <div>
      {pages.map(page => {
        return (
          <Card>
            <CardHeader title={page.description} subheader={page.uri} />
            <CardContent>
              {isArray(page.variations)
                ? (() => {
                  const variations = page.variations
                  return variations.map(variation => {
                    const uri = URI(`http://localhost:8180/${page.uri}/${variation.baseFile}`)
                      .query({
                        houseplant: variation.label
                      })
                      .toString()
                    return (
                      <div>
                        <div>{variation.description}</div>
                        <a href={uri}>{uri}</a>
                      </div>
                    )
                  })
                })()
                : Object.keys(page.variations).map(key => {
                  const variations = page.variations[key]
                    return variations.map(variation => {
                      const { label, description } = variation
                      const uri = URI(`http://localhost:8180/${page.uri}/${variation.baseFile}`)
                        .query({
                          houseplant: label,
                          device: key
                        })
                        .toString()
                      return (
                        <div>
                          <div>
                          <Icon>
                            {key === 'pc' ? 'desktop_windows' : 'smartphone'}
                          </Icon>
                          <span>{description}</span>
                          </div>
                          <a href={uri}>{uri}</a>
                        </div>
                      )
                    })
                  })}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
