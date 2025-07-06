import express from "express";
import { login, signup, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router()

console.log("Defining /signup");
authRoutes.post('/signup', signup)
console.log("Defining /login");
authRoutes.post('/login', login)
console.log("Defining /logout");
authRoutes.get('/logout', isLoggedIn, logout)
console.log("Defining /updateProfile");
authRoutes.put("/update-profile", isLoggedIn, updateProfile)
console.log("Defining /check");
authRoutes.get('/check', isLoggedIn, checkAuth)
export default authRoutes