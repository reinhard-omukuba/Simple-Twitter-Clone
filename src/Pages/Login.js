import React from 'react'
import { Link } from 'react-router-dom'


function Login() {
  return (
    <div className='mainAuth'>

        <div className='authLeft'>

        </div>

        <div className='authRight'>
            <h1>Login</h1>
            <input type="email" placeholder='enter your email' />
            <input type="password" placeholder='enter your password' />
            <button>Sign In</button>
            <Link to='/signup'>Dont have an account? Sign Up</Link>
        </div>


    </div>
  )
}

export default Login