import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

// firebase
import {db} from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



function Register() {

  const email = useRef();
  const password = useRef();
  const auth = getAuth();


  function signUpUser(){

    const userEmail = email.current.value;
    const userPassword = password.current.value;

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
 

  }


  return (
<div className='mainAuth'>
        <div className='authRight'>
            <h1>Sign Up</h1>
            <input type="email" placeholder='enter your name' />
            <input type="email" placeholder='enter your email' ref={email} />
            <input type="password" placeholder='enter your password' ref={password} />
            <button onClick={signUpUser}>Sign up</button>
            <Link to='/'>Already have an account? Sign in</Link>
        </div>


        <div className='authLeft'>

</div> 


    </div>
  )
}

export default Register