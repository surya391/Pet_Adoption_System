import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import configureDB from './config/db.js'

import userRouter from './config/routes/auth.route.js'
import profileRouter from './config/routes/profile.route.js'
import petRouter from './config/routes/pet.route.js'
import petTypeRouter from './config/routes/pet-type-route.js'
import requestRouter from './config/routes/request-route.js'
import requestTypeRouter from './config/routes/request-type-route.js'
import reviewRouter from './config/routes/review-router.js'

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
app.use('/api/profile',profileRouter)
app.use('/api/pet',petRouter)
app.use('/api/pet-types', petTypeRouter);
app.use('/api/request', requestRouter);
app.use('/api/request-types', requestTypeRouter);
app.use('/api/review',reviewRouter)


app.listen(process.env.PORT, () => {
    console.log('server is running on the port:', process.env.PORT)
})