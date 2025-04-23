import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// firebase
import {db} from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import swal from 'sweetalert';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; 




function Register() {

  const email = useRef();
  const password = useRef();
  const auth = getAuth();

  const [signInBtn, showsignInBtn] = useState(true);
  const [loadingBtn, showloadingBtn] = useState(false);


  function signUpUser(){

    const userEmail = email.current.value;
    const userPassword = password.current.value;

    //changing the state of the buttons
    showsignInBtn(false);
    showloadingBtn(true);

    createUserWithEmailAndPassword(auth, userEmail, userPassword).then((userCred)=>{
      //take an action after the user is created successfully 

      //swal("Good job!", "You clicked the button!", "success");


    }).catch((err)=>{
      const errormessage = err.message;
      swal("Sign up error", errormessage , "error");

      //change the state of the button
      showsignInBtn(true);
      showloadingBtn(false);

    })
 

  }


  return (
<div className='mainAuth'>
        <div className='authRight'>
            <h1>Sign Up</h1>
            <input type="email" placeholder='enter your name' />
            <input type="email" placeholder='enter your email' ref={email} />
            <input type="password" placeholder='enter your password' ref={password} />

            {signInBtn && 
                <button onClick={signUpUser}>Sign up</button>
            }

            {loadingBtn &&
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> 
                  Signing Up...
              </Button>
            }


            <Link to='/'>Already have an account? Sign in</Link>
        </div>


        <div className='authLeft'>

</div> 


    </div>
  )
}

export default Register