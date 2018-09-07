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
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'

import configure from '../mocks/configure' // TODO

export default () => {
  const { siteGroup, pages } = configure
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>houseplant</Toolbar>
      </AppBar>
      <main>
        <Typography variant="headline" gutterBottom>
          HTML
        </Typography>
        {<SiteSelect siteGroup={siteGroup} />}
        {<Pages pages={pages} />}
      </main>
      <style jsx>{`
        main {
          padding: 20px;
        }
      `}</style>
    </div>
  )
}

function SiteSelect({ siteGroup }) {
  return (
    <div>
      <FormGroup row>
        {Object.entries(siteGroup).map(([key, val]) => (
          <FormControlLabel
            key={key}
            control={<Switch checked={true} onChange={() => {}} value={key} />}
            label={val}
          />
        ))}
      </FormGroup>
    </div>
  )
}

const MyCard = withStyles({ root: { 'margin-bottom': 20 } })(Card)

function Pages({ pages }) {
  return (
    <div>
      {pages.map(page => {
        return (
          <MyCard key={page.uri}>
            <CardHeader title={page.description} subheader={page.uri} />
            <CardContent>
              {isArray(page.variations)
                ? (() => {
                    const variations = page.variations
                    return variations.map(variation => {
                      const uri = URI(
                        `http://localhost:8180/${page.uri}/${
                          variation.baseFile
                        }`
                      )
                        .query({
                          houseplant: variation.label
                        })
                        .toString()
                      return (
                        <div key={variation.label} className="cardContent">
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
                      const uri = URI(
                        `http://localhost:8180/${page.uri}/${
                          variation.baseFile
                        }`
                      )
                        .query({
                          houseplant: label,
                          device: key
                        })
                        .toString()
                      return (
                        <div className="cardContent">
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
          </MyCard>
        )
      })}
      <style jsx>{`
        .cardContent {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  )
}
