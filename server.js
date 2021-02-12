/* eslint-disable */
/* @ts-nocheck */
const express = require("express")

const history = require("connect-history-api-fallback")
const app = express()
const defaultConfig = require("./dist/app.config.json")
require("dotenv").config()

const mergeEnvVars = require("./merge-env-vars")
const config = mergeEnvVars(defaultConfig)

const staticFileMiddleware = express.static("dist")

const basePath = config.basePath || ""
const port = process.env.PORT || 8080
app.use(`${basePath}/config.json`, (_, res) => {
  res.json(config)
})

app.use(history({
  index: `${basePath}/index.html`,
  verbose: true
}))

app.use(basePath, staticFileMiddleware)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}${basePath}`)
})
