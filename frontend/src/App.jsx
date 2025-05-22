import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element= {<HomePage />}></Route>
          <Route path="/signup" element= {<SignUpPage />}></Route>
          <Route path="/login" element= {<LoginPage />}></Route>
          <Route path="/settings" element= {<SettingsPage />}></Route>
          <Route path="/profile" element= {<ProfilePage />}></Route>
        </Routes>

    </div>
  )
}

export default App