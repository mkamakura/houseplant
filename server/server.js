import next from 'next'
import express from 'express'
import pages from './pages'
import config from '../houseplant.json'

const app = next({ dev: true })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
   // server.use(pages)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    const { port, host } = config
    server.listen(port, host, (err) => {
      if (err) throw err
      console.log(`> Ready on http://${host}:${port}`)
    })
  })