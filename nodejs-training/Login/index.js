const express = require('express')
const router = require('./router/router')

const app = express()
const port = 3000

const bodyParser = require('body-parser')

var cookieParser = require('cookie-parser')

app.use(cookieParser())

app.set('view engine', 'pug')
app.set('views', './views')

// getting-started.js
var mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/Store_Data', {useNewUrlParser: true})
mongoose.connect('mongodb://localhost/Store_Data', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json({ limit: "50mb" }))
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
)
app.use(express.static('public'))

app.use('/',router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))