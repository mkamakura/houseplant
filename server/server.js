import next from 'next'
import express from 'express'
import pages from './pages'
import settings from './settings'

const app = next({ dev: true })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(pages)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const { port, host } = settings
  server.listen(port, host, err => {
    if (err) throw err
    console.log(`> Ready on http://${host}:${port}`)
  })
})
