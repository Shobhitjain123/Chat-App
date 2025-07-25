import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import Navbar from "./components/Navbar"
import { userAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import {Loader} from 'lucide-react'
import { Toaster } from "react-hot-toast"
import {useThemeStore} from "./store/useThemeStore.js"
const App = () => {

  const {authUser, checkAuth, isCheckingUserAuth, onlineUsers} = userAuthStore()
  const {theme} = useThemeStore()

  useEffect(() => {
     checkAuth()    
   }, [checkAuth])
   
   if(isCheckingUserAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className = "size-10 animate-spin" />
    </div>
   )

  return (
    <div data-theme={theme}>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element= { authUser ? <HomePage /> : <Navigate to={"/login"} />}></Route>
          <Route path="/signup" element= { !authUser ? <SignUpPage /> : <Navigate to={"/"} />}></Route>
          <Route path="/login" element= { !authUser ? <LoginPage /> : <Navigate to={"/"} />}></Route>
          <Route path="/settings" element= {<SettingsPage />}></Route>
          <Route path="/profile" element= { authUser ? <ProfilePage /> : <Navigate to={"/login"} />}></Route>
        </Routes>
        <Toaster />
    </div>
  )
}

export default App