import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

// firebase
import {db} from '../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import swal from 'sweetalert';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; 


function Login() {

  const email = useRef()
  const password = useRef();
  const auth = getAuth();

  function signInUser(){

    const emailInput = email.current.value;
    const passInput = password.current.value;


    signInWithEmailAndPassword(auth, emailInput, passInput).then((userCred)=>{
      swal("Good job!", "You clicked the button!", "success");

    }).catch((error)=>{
      const errormessage = error.message;
      swal("Sign up error", errormessage , "error");
    })




  }

  return (
    <div className='mainAuth'>

        <div className='authLeft'>

        </div>

        <div className='authRight'>
            <h1>Login</h1>
            <input type="email" ref={email} placeholder='enter your email' />
            <input type="password" ref={password} placeholder='enter your password' />
            <button onClick={signInUser}>Sign In</button>
            <Link to='/signup'>Dont have an account? Sign Up</Link>
        </div>


    </div>
  )
}

export default Login