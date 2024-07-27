import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Signup() {

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    dob: ""
  })

  const signup = async () => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, {
      fullName: user.fullname,
      email: user.email,
      password: user.password,
      dob: user.dob
    })

    if(response.data.success){
      toast.success(response.data.message)

      setUser({
        fullname: '',
        email: '',
        password: '',
        dob: ''
      })
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div>

      <form className='auth-form'>
        <h1 className='auth-heading'>User Registration</h1>
        <input
          type='text'
          placeholder='Enter your Fullname'
          className='input-box'
          value={user.fullname}
          onChange={(e) => {
            setUser({ ...user, fullname: e.target.value })
          }}
        />
        <input
          type='email'
          placeholder='Enter Your Email'
          className='input-box'
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value })
          }}
        />
        <input
          type='password'
          placeholder='Enter Your Password'
          className='input-box'
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value })
          }}
        />
        <input
          type='date'
          placeholder='Enter your Date-of-Birth'
          className='input-box'
          value={user.dob}
          onChange={(e) => {
            setUser({ ...user, dob: e.target.value })
          }}
        />

        <button
          type='button'
          className='btn'
          onClick={signup}
        >
          Register
        </button>
        <Link to='/login' className='auth-link'>Already have an account? Login</Link>
      </form>
      <Toaster/>
    </div>
  )
}

export default Signup