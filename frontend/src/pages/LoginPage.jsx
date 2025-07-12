import React from 'react'
import { userAuthStore } from '../store/useAuthStore'
import { MessageSquare, Mail, Lock, Loader2, EyeClosed, Eye } from 'lucide-react'
import AuthImagePattern from '../components/AuthImagePattern'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const LoginPage = () => {

  const [showPassword, setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  })
  const {login, isLogginIn} = userAuthStore()
  const handleSubmit = (e) => {
    try {
      e.preventDefault()
      login(formData)
    } catch (error) {
      setError(true)
    } finally{
      setError(false)
    }
  }

  return (
    <div className='min-h-screen grid lg: grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8 '>
          {/* Logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className='text-2xl font-bold mt-2'> Login To your account </h1>
              <p className='text-base-content/60'>Enjoy Sharing moments!!</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6 '>
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

          <button type="submit" className='btn btn-primary w-full' disabled= {isLogginIn}>
            {
              isLogginIn ? (
                <>
                  <Loader2 className='size-5 animate-spin' /> Loading...
                </>
              ) : (
                "Log In"
              )
            }
          </button>

          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>
              Do not Have an account{" "}
              <Link to={"/signup"} className='link link-primary'> "Sign Up"</Link>
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

export default LoginPage