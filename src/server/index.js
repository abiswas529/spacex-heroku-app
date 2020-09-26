import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize from 'serialize-javascript'
import App from '../shared/App'
import routes from '../shared/routes'

const app = express()

app.use(cors())
app.use(express.static('public'))

app.get('*', (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}
  const param = {
    launch_success: req.query.launch_success ? req.query.launch_success : '',
    land_success: req.query.land_success ? req.query.land_success : '',
    launch_year: req.query.launch_year ? req.query.launch_year : '',
  }
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(param)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
        <StaticRouter location={ req.url } context={ context }>
            <App />
        </StaticRouter>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SpaceX Data</title>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${ serialize(data) }</script>
        </head>

        <body>
          <div id="app">${ markup }</div>
        </body>
      </html>
    `)
  }).catch(next)
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${ port }`)
})