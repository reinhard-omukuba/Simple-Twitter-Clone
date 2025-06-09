import React, { useRef, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import {app} from '../firebase'
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
import swal from 'sweetalert';


function Home() {



 const auth = getAuth();
 const navigate = useNavigate()
 const [userEmail, setuserEmail] = useState()
 const [loggedInUserId, setloggedInUserId] = useState();

 //checking if user is authenticate (auth status)
 onAuthStateChanged(auth, (user)=>{
  if(user){

    console.log(user.uid);
    console.log(user.email);
    setuserEmail(user.email);
    setloggedInUserId(user.uid);

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

 //sending a tweet to the db

 const tweetInput = useRef();
 const db = getFirestore(app)

 function sendTweet(){

  const timestamp = new Date();
  const tweet = tweetInput.current.value;

    const docRef =  addDoc(collection(db, "tweets",), {
      tweet: tweet,
      timestamp:timestamp,
      userId: loggedInUserId
    }).then(()=>{
       swal("Success", "Tweet posted successfully" , "success");
    })

    //console.log("Document written with ID: ", docRef.id);


 }

  return (
    <div>
      <h1>Home page</h1>

      <h1>Logged In User: {userEmail}</h1>

      <button className='btn btn-warning' onClick={logoutUser}>Logout</button>
      <hr />

      <input type="text" ref={tweetInput} placeholder='your tweet here' />
      <button onClick={sendTweet}>Tweet</button> 

    </div>
  )
}

export default Home