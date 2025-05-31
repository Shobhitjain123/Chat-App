import express from "express";
import { login, signup, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router()

authRoutes.post('/signup', signup)
authRoutes.post('/login', login)
authRoutes.get('/logout', isLoggedIn, logout)
authRoutes.put("/update-profile", isLoggedIn, updateProfile)
authRoutes.get('/check', isLoggedIn, checkAuth)
export default authRoutes