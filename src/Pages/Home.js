import React, { useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'



function Home() {

 const auth = getAuth();
 const navigate = useNavigate()
 const [userEmail, setuserEmail] = useState()

 //checking if user is authenticate (auth status)
 onAuthStateChanged(auth, (user)=>{

  if(user){

    console.log(user.uid);
    console.log(user.email);

    setuserEmail(user.email);

  }else{
   navigate("/")
  }

 })

 //logout the user
 function logoutUser(){
    signOut(auth).then(() => {
      // Sign-out successful.
       navigate("/")
    }).catch((error) => {
      // An error happened.
    });
 }


  return (
    <div>
      <h1>Home page</h1>

      <h1>Logged In User: {userEmail}</h1>

      <button className='btn btn-warning' onClick={logoutUser}>Logout</button>

    </div>
  )
}

export default Home