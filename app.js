
//basic

const express = require('express')
const router = require('./src/route/api')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')


//security middlewares

const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitze = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
dotenv.config()


//database 

const mongoose = require('mongoose')



//security middleware implement

app.use(cors())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(mongoSanitze())


// body parser implement 
app.use(bodyParser.json())

//reqest rate limit 
const ratelimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(ratelimiter)

//mongodb database connection
const connection_uri = "mongodb://localhost:27017/Todo"

let OPTION = { user: '', pass: '', autoIndex: true }

mongoose.connect(connection_uri, OPTION, (err) => {
    console.log('successfully connected')
    console.log(err)
})



//routing implement 

app.use('/api/v1', router)

//undefine routing implement

app.use('*', (req, res) => {
    res.status(404).json({ status: "fail", data: "not found" })
})

module.exports = app;



