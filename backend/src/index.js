import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoute.route.js'
import messageRoutes from './routes/message.route.js'
import { dbConnect } from './lib/dbConnect.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {app, io, server} from './lib/socket.js'

app.use(express.json())
dotenv.config()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

const port = process.env.PORT || 8001

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

server.listen(port, () => {
    console.log("Listening on Port", port);
    dbConnect()
})
