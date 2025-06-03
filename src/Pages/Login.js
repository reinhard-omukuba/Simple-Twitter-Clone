import React, { useRef,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// firebase
import {db} from '../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import swal from 'sweetalert';

//bootstrap
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';




function Login() {

  const email = useRef()
  const password = useRef();
  const auth = getAuth();
  const navigate = useNavigate()

  const [signInBtn, showsignInBtn] = useState(true);
  const [loadingBtn, showloadingBtn] = useState(false);
  

  function signInUser(){

    const emailInput = email.current.value;
    const passInput = password.current.value;

    //changing the state of the buttons
    showsignInBtn(false);
    showloadingBtn(true);

    signInWithEmailAndPassword(auth, emailInput, passInput)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate("/home")
      // ...
    })
    .catch((error) => {
      showsignInBtn(true);
      showloadingBtn(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      swal("Sign up error", errorMessage , "error");
    });
  }

  return (
    <div className='mainAuth'>

        <div className='authLeft'>

        </div>

        <div className='authRight'>
            <h1>Login</h1>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" ref={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="password" ref={password} />
            </Form.Group>

            

            {signInBtn && 
              <Button variant="primary" onClick={signInUser}>Sign In</Button>
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
                  Signing In...
              </Button>
            }

            <div className='navigateLinkCont'>
              <Link to='/signup'  className='navigateLink'>Dont have an account? Sign Up </Link> | <Link to='/reset-password'  className='navigateLink'> Forgot Password</Link>
            </div>
            
        </div>


    </div>
  )
}

export default Login