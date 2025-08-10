import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyA52_mYh6mOk2IMbrFM9ky1d3oVeUh9_F8",
  authDomain: "bikroydot-com.firebaseapp.com",
  projectId: "bikroydot-com",
  storageBucket: "bikroydot-com.firebasestorage.app",
  messagingSenderId: "620650236016",
  appId: "1:620650236016:web:820c1a62a962ebf0164cb5",
  measurementId: "G-02FYNFJD0Z",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  const userLogin = (displayName, email, photoURL) => {
    axios
      .post(
        "https://bikroydotcom-server.onrender.com/userLogin",
        { displayName, email, photoURL },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        // Parse the response as JSON and handle it here
        console.log("this is axios post method", response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  };

  signInWithPopup(auth, provider)
    .then((result) => {
      const { displayName, email, photoURL } = result.user;
      userLogin(displayName, email, photoURL);

      localStorage.setItem("displayName", displayName);
      localStorage.setItem("email", email);
      localStorage.setItem("photoURL", photoURL);
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/myAccount";
    })
    .catch((error) => {
      const { code, message, email, credential } = error;
      console.log(code, "| |", message, "| |", email, "| |", credential);
    });
};

export const db = getFirestore(app);
export const storage = getStorage(app);
