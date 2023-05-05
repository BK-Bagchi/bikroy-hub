import React from 'react';
import {signInWithGoogle} from "./FirebaseConfig";
import './Sign.css';
import Navbar from '../Top/Navbar';
import Bottom from '../Bottom/Bottom';

const Firebase= () =>{
  return(
    <>
        <Navbar/>
        <section className="firebase-auth container d-flex align-items-center justify-content-center mt-4">
            <div className="brand-icons">
                <span className="google-icon" onClick={signInWithGoogle}>Sign in with Google</span>
            </div>
        </section>
        <Bottom/>
    </>
  );
}

export default Firebase;
