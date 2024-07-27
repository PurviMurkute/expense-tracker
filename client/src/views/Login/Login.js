import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginNow = async () => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
      email: email,
      password: password
    })

    if(response.data.success){
      toast.success(response.data.message)

      localStorage.setItem('currentUser', JSON.stringify(response.data.data))

      toast.loading('redirecting to dashboard...')

      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    }else{
      toast.error(response.data.message)
    }
  }

  return (
    <div>
      <form className='auth-form'>
      <h1 className='auth-heading'>User Login</h1>
      <input
          type='email'
          placeholder='Enter Your Email'
          className='input-box'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input
          type='password'
          placeholder='Enter Your Password'
          className='input-box'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button 
        type='button' 
        className='btn'
        onClick={loginNow}
        >
          Login
          </button>
        <Link to='/signup' className='auth-link'>Do not have an account? Signup</Link>
      </form>
      <Toaster/>
    </div>
  )
}

export default Login