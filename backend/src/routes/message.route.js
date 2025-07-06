import {Router} from 'express'
import { getMessages, getUsersList, sendMessage } from '../controllers/message.controller.js'
import { isLoggedIn } from '../middlewares/auth.middleware.js'

const messageRoutes = Router()

console.log("Defining /user");
messageRoutes.get("/user", isLoggedIn, getUsersList)
console.log("Defining /messageID");
messageRoutes.get("/:id", isLoggedIn, getMessages)
console.log("Defining /sendMessage");
messageRoutes.post("/send/:id", isLoggedIn, sendMessage)

export default messageRoutes