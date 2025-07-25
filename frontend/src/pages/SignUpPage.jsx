import React, { useState } from 'react'
import { userAuthStore } from '../store/useAuthStore'
import { Lock, Mail, MessageSquare, User, Eye, EyeClosed, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const { isSigningIn, signup } = userAuthStore()

  const validateForm = () => {
      if(!formData.fullName.trim()) return toast.error("Full Name is reqiured")
      if(!formData.email.trim()) return toast.error("Email is reqiured")
      if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email type")
      if(!formData.password.trim()) return toast.error("Password is reqiured")
      if(formData.password.length < 6) return toast.error("Password is too small")

      return true
   }
  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validateForm()

    if(success) signup(formData)
  }

  return (
    <div className='min-h-screen grid lg: grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-4 sm:p-12'>
        <div className='w-full max-w-md space-y-4'>
          {/* Logo */}
          <div className='text-center mb-4'>
            <div className='flex flex-col justify-center items-center pt-8 gap-y-0.5 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className='text-2xl font-bold mt-2'> Create Account </h1>
              <p className='text-base-content/60'>Get Started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6 '>
            <div className='form-control'>
              {/* Full Name Input */}
              <label className='label'>
                <span className='label-text font-medium'>
                  Full Name
                </span>
              </label>

              <div className='relative'>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input type="text" className={'input input-bordered w-full pl-10'} placeholder='John Doe' value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              </div>



            </div>
            <div className='form-control'>
              {/* Email Input */}
              <label className='label'>
                <span className='label-text font-medium'>
                  Email
                </span>
              </label>

              <div className='relative'>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input type="email" className={'input input-bordered w-full pl-10'} placeholder='you@gmail.com' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>



            </div>
            <div className='form-control'>
              {/* Password Input */}
              <label className='label'>
                <span className='label-text font-medium'>
                  Password
                </span>
              </label>

              <div className='relative'>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input type={showPassword ? 'text' : 'password'} className={'input input-bordered w-full pl-10'} placeholder='******' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

                <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center z-1' onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeClosed className='size-5 text-base-content/40 hover:cursor-pointer' />
                  ) : (
                    <Eye className='size-5 text-base-content/40 hover:cursor-pointer' />
                  )}
                </button>
              </div>
            </div>

          <button type="submit" className='btn btn-primary w-full' disabled= {isSigningIn}>
            {
              isSigningIn ? (
                <>
                  <Loader2 className='size-5 animate-spin' /> "Loading..."
                </>
              ) : (
                "Create Account"
              )
            }
          </button>

          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Already Have an account{" "}
              <Link to={"/login"} className='link link-primary'> "Sign in"</Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side  */}
      
      <AuthImagePattern 
      title = "Join our Community" 
      subtitle = "Connect with friends, share moments, and stay in touch with your loved ones" />

    </div>
  )
}

export default SignUpPage