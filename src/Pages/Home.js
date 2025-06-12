import React, { useRef, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import {app} from '../firebase'
import { collection, addDoc, getFirestore, where,query, getDocs, QuerySnapshot  } from "firebase/firestore"; 
import swal from 'sweetalert';


function Home() {



 const auth = getAuth();
 const navigate = useNavigate()
 const [userEmail, setuserEmail] = useState()
 const [userName, setUserName] =  useState();
 const [loggedInUserId, setloggedInUserId] = useState();
  const db = getFirestore(app)


 //checking if user is authenticate (auth status)
 onAuthStateChanged(auth, (user)=>{
  if(user){

    // console.log(user.uid);
    // console.log(user.email);
    setuserEmail(user.email);
    setloggedInUserId(user.uid);
    const userId = user.uid;

    ///read data from db using the user id above 
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", userId));
    getDocs(q).then((QuerySnapshot)=>{
      QuerySnapshot.forEach((doc)=>{
          console.log(doc.data())
          const theName = doc.data().username; 
          console.log(theName)
          setUserName(theName);
      })
    })

    // const querySnapshot =  getDocs(q);
    // querySnapshot.forEach((doc) =>{
    //   console.log(doc)
    // })


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
      <h2>Welcome, {userName}</h2>

      <button className='btn btn-warning' onClick={logoutUser}>Logout</button>
      <hr />

      <input type="text" ref={tweetInput} placeholder='your tweet here' />
      <button onClick={sendTweet}>Tweet</button> 

    </div>
  )
}

export default Home