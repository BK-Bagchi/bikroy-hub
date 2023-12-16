import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import axios from "axios";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTZX7AzIhfL3JfRs3nVNHeWDYOkTauThs",
  authDomain: "bikroydotcom-f2fff.firebaseapp.com",
  projectId: "bikroydotcom-f2fff",
  storageBucket: "bikroydotcom-f2fff.appspot.com",
  messagingSenderId: "301393604905",
  appId: "1:301393604905:web:eec3ba89be98813a940738",
  measurementId: "G-7FKJF5K57M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    const userLogin= (displayName, email, photoURL) => {
      axios.post('http://localhost:4000/userLogin', {displayName, email, photoURL}, {
        headers: {'Content-Type': 'application/json',}
        })
        .then((response) => {
            // Parse the response as JSON and handle it here
            console.log('this is axios post method',response.data);
        })
        .catch((error) => {
            // Handle any errors
            console.error('Error:', error);
        });
    }

    signInWithPopup(auth, provider).then((result) => {
      const {displayName, email, photoURL} = result.user;
      userLogin(displayName, email, photoURL);
      
      localStorage.setItem("displayName", displayName);
      localStorage.setItem("email", email);
      localStorage.setItem("photoURL", photoURL);
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/myAccount";
  }).catch((error) => {
      const { code, message, email, credential } = error
      console.log(code, "| |", message, "| |", email, "| |", credential)
  });
};

export const db = getFirestore(app);
export const storage = getStorage(app);