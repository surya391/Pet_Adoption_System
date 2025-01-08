import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import configureDB from './config/db.js'

import userRouter from './config/routes/auth.route.js'
const app = express()
configureDB()
dotenv.config()
app.use(express.json())
app.use(cors())

app.use(function(req,res,next){
    console.log(`${new Date()}-${req.method}- ${req.url}-${req.ip}`)
    next()
})

app.use('/api/auth',userRouter)

app.listen(process.env.PORT, () => {
    console.log('server is running on the port:', process.env.PORT)
})