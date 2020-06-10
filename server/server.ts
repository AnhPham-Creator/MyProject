import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express, { Request, Response, ErrorRequestHandler, NextFunction } from "express"
import cors from 'cors'
import { Routes } from './src/router/user-router'
import bodyParser from 'body-parser'
import errorHandler from './src/middleware/error.middleware'
import notFoundHandler from './src/middleware/error.middleware'

const app = express()
const PORT = process.env.PORT || 3000;
dotenv.config()
mongoose.connect('mongodb://localhost/firstapp', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log('listening on port ' + PORT)
    })
})
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000
    })
)
Routes(app)
app.use(express.static('public'))
app.use(errorHandler)
app.use(notFoundHandler)



