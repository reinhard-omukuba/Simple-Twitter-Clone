import React, { useRef,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// firebase
import {db} from '../firebase'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import swal from 'sweetalert';

//bootstrap
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';


function ResetPassword() {

      const email = useRef();
      const auth = getAuth();
        const [signInBtn, showsignInBtn] = useState(true);
        const [loadingBtn, showloadingBtn] = useState(false); 


      function sendPasswordLink(){
            const emailInput = email.current.value;
             showsignInBtn(false);
            showloadingBtn(true);

            sendPasswordResetEmail(auth, emailInput)
            .then(() => {
                // Password reset email sent!
                // ..
                      showsignInBtn(true);
                    showloadingBtn(false);
                swal("Sent Successfuly", "A password reset link has been sent to your email." , "success");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                swal("An error occured", errorMessage , "error");
                      showsignInBtn(true);
                    showloadingBtn(false);
                // ..
            });

      }


  return (
<div className='mainAuth'>

        <div className='authLeft'>

        </div>

        <div className='authRight'>
            <h1>Reset Password</h1>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" ref={email} />
            </Form.Group>


            

            {signInBtn && 
              <Button variant="primary" onClick={sendPasswordLink}>Send password reset Link</Button>
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
                  Onyi tulia....
              </Button>
            }

            <div className='navigateLinkCont'>
              <Link to='/signup'  className='navigateLink'>Dont have an account? Sign Up </Link> | <Link to='/'  className='navigateLink'> Sign in</Link>
            </div>
            
        </div>


    </div>

  )
}

export default ResetPassword