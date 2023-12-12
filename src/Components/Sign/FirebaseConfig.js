import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

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
    signInWithPopup(auth, provider).then((result) => {
      const {displayName, email, photoURL} = result.user;
      
      localStorage.setItem("displayName", displayName);
      localStorage.setItem("email", email);
      localStorage.setItem("photoURL", photoURL);
      localStorage.setItem("isLoggedIn", "true");
  }).catch((error) => {
      const { code, message, email, credential } = error
      console.log(code, "| |", message, "| |", email, "| |", credential)
  });
};

export const db = getFirestore(app);
export const storage = getStorage(app);