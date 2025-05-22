import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoute.route.js'
import { dbConnect } from './lib/dbConnect.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()

const port = process.env.PORT || 8001

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log("Listening on Port", port);
    dbConnect()
})
