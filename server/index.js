import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()

import configureDB from './config/db.js'

configureDB()
dotenv.config()
app.use(express.json())
app.use(cors())

app.use(function(req,res,next){
    console.log(`${new Date()}-${req.method}- ${req.url}-${req.ip}`)
    next()
})


app.listen(process.env.PORT, () => {
    console.log('server is running on the port:', process.env.PORT)
})