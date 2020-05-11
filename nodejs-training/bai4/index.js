const express = require('express')
require('dotenv').config()
var router = require('./router/router')
var mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT

mongoose.connect('mongodb://localhost/anhpham', {useNewUrlParser: true,
 useUnifiedTopology: true, 
 useCreateIndex: true
})
app.use(bodyParser.json({ limit: "50mb" }))
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
)

app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))