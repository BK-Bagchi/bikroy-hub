import React from 'react';
import { useHistory } from 'react-router-dom';
import Bottom from '../Bottom/Bottom';
import Navbar from '../Top/Navbar';
import './MyAccount.css'

const MyAccount = () => {
    const history= useHistory();

    return (
        <>
            <Navbar/>
            <section className="myAccount container d-flex align-items-center justify-content-around">
                <div className="profile-postadd d-flex justify-content-around">
                    <button className="profile-btn" onClick={()=>{
                        history.push('/myProfile');
                    }}>View Profile</button>
                    <button className="post-add-btn" onClick={()=>{
                        history.push('/viewPostedAds');
                    }}>View Posted Ads</button>
                    <button className="post-add-btn" onClick={()=>{
                        history.push('/viewMyOrders');
                    }}>View My Orders</button>
                    <button className="post-add-btn" onClick={()=>{
                        history.push('/viewGotOrders');
                    }}>View Got Orders</button>
                    <button className="post-add-btn" onClick={()=>{
                        history.push('/postAds');
                    }}>Post Your Add Now</button>
                    <button className="post-add-btn" onClick={()=>{
                        localStorage.setItem("isLoggedIn", "");
                        history.push('/');
                    }}>Logout</button>
                </div>
            </section>
            <Bottom/>
        </>
    );
};

export default MyAccount;