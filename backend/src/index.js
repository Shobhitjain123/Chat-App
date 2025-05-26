import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoute.route.js'
import messageRoutes from './routes/message.route.js'
import { dbConnect } from './lib/dbConnect.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
dotenv.config()

const port = process.env.PORT || 8001

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

app.listen(port, () => {
    console.log("Listening on Port", port);
    dbConnect()
})
