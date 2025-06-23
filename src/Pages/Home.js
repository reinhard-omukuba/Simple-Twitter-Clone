import React, { useEffect, useRef, useState } from 'react'
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

    // Pull all tweets sent above from the db

  
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
      window.location.reload()
       //swal("Success", "Tweet posted successfully" , "success");
    })

     }
 

    const [alltweets, setTweets] = useState([]);

    useEffect(()=>{
      const fetchAlltweets =  async()=>{
        //fetching all tweets from the tweets collection
        const q = query(collection(db, "tweets"));
        //im waiting for all data to be pulled from q then dumped into qsnapshot
        const querySnapshot = await getDocs(q);
        //creating an empty array to store individual data (tweets)
        const tweets = [];
        //looping through all data fetched from the db so that we can have them in our array
        querySnapshot.forEach((doc)=>{
          //im adding all data to the empty array - tweets
          const data = doc.data();
          tweets.push({ id: doc.id, ...data});
        })
        //now that we have all the data in the tweet array, lets set it to the state below 
        setTweets(tweets)
      }
      fetchAlltweets();
    }, []);



    console.log(alltweets);   





  return (
    <div>
      <h1>Home page</h1>

      <h1>Logged In User: {userEmail}</h1>
      <h2>Welcome, {userName}</h2>

      <button className='btn btn-warning' onClick={logoutUser}>Logout</button>
      <hr />

      <input type="text" ref={tweetInput} placeholder='your tweet here' />
      <button onClick={sendTweet}>Tweet</button> 

      <hr/>

      {/* Show all tweets pulled from the db  */}
      {alltweets.map((tw) =>(
        <div key={tw.id}>
          <p>{tw.tweet}</p>
        </div>
      ))};

    </div>
  )
}

export default Home