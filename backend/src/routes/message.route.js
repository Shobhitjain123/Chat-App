import {Router} from 'express'
import { getMessages, getUsersList, sendMessage } from '../controllers/message.controller.js'
import { isLoggedIn } from '../middlewares/auth.middleware.js'

const messageRoutes = Router()


messageRoutes.get("/user", isLoggedIn, getUsersList)

messageRoutes.get("/:id", isLoggedIn, getMessages)

messageRoutes.post("/send/:id", isLoggedIn, sendMessage)

export default messageRoutes