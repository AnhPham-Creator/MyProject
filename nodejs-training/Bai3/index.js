require('dotenv').config()
const express = require('express')
const router = require('./router/router')
const sequelize = require('./connection')

const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: "50mb" }))
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
)

app.use('/',router)
sequelize.sync()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))