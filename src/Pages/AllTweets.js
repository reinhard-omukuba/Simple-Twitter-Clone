import React from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import {app} from '../firebase'
import { collection, addDoc, getFirestore, where,query, getDocs, QuerySnapshot  } from "firebase/firestore"; 
import swal from 'sweetalert';

function AllTweets() {
  return (
    <div>
        
    </div>
  )
}

export default AllTweets