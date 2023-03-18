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
                    <button className="profile">View Profile</button>
                    <button className="post-add" onClick={()=>{
                        history.push('/postAds');
                        window.location.reload();
                    }}>Post Your Add Now</button>
                </div>
            </section>
            <Bottom/>
        </>
    );
};

export default MyAccount;