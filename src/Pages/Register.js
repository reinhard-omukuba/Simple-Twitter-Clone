import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// firebase
import {app} from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import swal from 'sweetalert';
import { collection, addDoc, getFirestore } from "firebase/firestore"; 

//bootstrap
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';




function Register() {

  const email = useRef();
  const password = useRef();
  const fullName = useRef();
  const auth = getAuth();
  const db = getFirestore(app)
  const navigate = useNavigate();

  const [signInBtn, showsignInBtn] = useState(true);
  const [loadingBtn, showloadingBtn] = useState(false);


  function signUpUser(){

    const userEmail = email.current.value;
    const userPassword = password.current.value;
    const username = fullName.current.value;

    //changing the state of the buttons
    showsignInBtn(false);
    showloadingBtn(true);

    createUserWithEmailAndPassword(auth, userEmail, userPassword).then((userCred)=>{
      //take an action after the user is created successfully 
        //

          const userid = userCred.user.uid; 
          const timestamp = new Date();

         const docRef =  addDoc(collection(db, "users",), {
            email: userEmail,
            signedUpdate:timestamp,
            userId: userid,
            username:username,
          }).then(()=>{
            navigate("/home");
          })

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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name address</Form.Label>
              <Form.Control type="text" placeholder="your name" ref={fullName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" ref={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="password" ref={password} />
            </Form.Group>

            {signInBtn && 
                <Button variant="primary" onClick={signUpUser}>Sign Up</Button>
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

            <div className='navigateLinkCont'>
                <Link to='/' className='navigateLink'>Already have an account? Sign in</Link>
            </div>


            
        </div>


        <div className='authLeft'>

</div> 


    </div>
  )
}

export default Register