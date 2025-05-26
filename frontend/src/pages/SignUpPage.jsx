import React, { useState } from 'react'
import { userAuthStore } from '../store/useAuthStore'
const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  })

  const {isSigningIn, signup} = userAuthStore()

  const validateForm = () => {}
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='min-h-screen grid lg: grid-cols'>
      
    </div>
  )
}

export default SignUpPage