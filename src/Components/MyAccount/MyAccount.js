import React from 'react';
import Navbar from '../Top/Navbar';
import './MyAccount.css'

const MyAccount = () => {
    return (
        <>
            <Navbar/>
            <section className="myAccount container d-flex align-items-center justify-content-around">
                <div className="profile-postadd d-flex justify-content-around">
                    <button className="profile">View Profile</button>
                    <button className="post-add">Post Your Add Now</button>
                </div>
            </section>
        </>
    );
};

export default MyAccount;