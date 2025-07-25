import { Server } from "socket.io";
import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', "https://chattyfrontend.netlify.app"]
    }
})

export function getRecieverSocketId (userId) {
    return userSocketMap[userId]
}

// Used to store online users
const userSocketMap = {}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId] = socket.id

    // io.emit() is used to send events to all the connected users
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
     
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
        
    })
    
})

export {io, app, server}