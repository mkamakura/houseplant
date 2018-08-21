import next from 'next'
import express from 'express'
import pages from './pages'

const app = next()
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use(pages)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })