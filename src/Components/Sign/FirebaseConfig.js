import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
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
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const { displayName, email, photoURL } = result.user;
      const idToken = await result.user.getIdToken();

      try {
        // 🔹 Send ID Token to backend (backend will verify & issue JWT)
        const response = await axios.post(
          `${API_BASE_URL}/userLogin`,
          { idToken, displayName, email, photoURL },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Backend login response:", response.data);

        // 🔹 Save backend JWT in localStorage
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        //for now
        localStorage.setItem("displayName", response.data.user.displayName);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("photoURL", response.data.user.photoURL);
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "/myAccount";
      } catch (error) {
        console.error("Error during login:", error);
      }
    })
    .catch((error) => {
      const { code, message, email, credential } = error;
      console.log(code, "| |", message, "| |", email, "| |", credential);
    });
};

export const db = getFirestore(app);
export const storage = getStorage(app);
