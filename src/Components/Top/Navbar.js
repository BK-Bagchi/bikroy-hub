import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history= useHistory();
    const photoURL= localStorage.getItem('photoURL')
    const [loggedIn, isLoggedIn]= useState(localStorage.getItem("isLoggedIn"));
    useEffect(()=>{
        isLoggedIn(localStorage.getItem("isLoggedIn"));
    },[loggedIn]);
    
    // (loggedIn)?console.log("tureR"):console.log("falseR");
    
    return (
        <>
            <section className='top'>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container d-flex align-items-center">
                            <div className="d-flex justify-content-center" id="navbarText">
                                <img className="logo-small" src= {require(`../../Resources/images/logo-small.png`)} alt="bikroy.com" onClick={()=>{
                                    history.push('/');
                                    }} />
                            </div>
                            <div className="d-flex justify-content-center" id="navbarText">
                                {
                                    loggedIn?
                                    <img className="myAccountLoginBtn" src={photoURL} alt="Profile at navbar" onClick={()=>{
                                        history.push('/myAccount');}} />
                                    :
                                    <button className="login" onClick={()=>{
                                        history.push('/login');
                                        }}>Login
                                    </button>
                                }
                            </div>
                        </div>
                    </nav>
            </section>
            <section className="middle">
                <div className="name">
                    <p>Bikroy.com</p>
                </div>
            </section>
        </>
    );
};

export default Navbar;