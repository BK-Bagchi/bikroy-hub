import React, { useEffect, useState } from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import './MyProfile.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const MyProfile = () => {
    const history= useHistory()
    const myName= localStorage.getItem('displayName')
    const myProfilePicture= localStorage.getItem('photoURL')
    const [loginInfo, setLoginInfo]= useState({
        name: myName,
        profilePicture: myProfilePicture,
        businessName: 'Your business name',
        phoneNumber: '01xxxxxxxxx',
        aboutYourBusiness: 'All about my business'
    })

    //setting profile info for temporary use
    useEffect(() => {
        const locationFromLocalStorage = localStorage.getItem('businessName');
        const phoneNumberFromLocalStorage = localStorage.getItem('phoneNumber');
        const aboutYouFromLocalStorage = localStorage.getItem('aboutYourBusiness');
    
        if (locationFromLocalStorage) {
          setLoginInfo((prevLoginInfo) => ({
            ...prevLoginInfo,
            businessName: locationFromLocalStorage,
          }));
        }
    
        if (phoneNumberFromLocalStorage) {
          setLoginInfo((prevLoginInfo) => ({
            ...prevLoginInfo,
            phoneNumber: phoneNumberFromLocalStorage,
          }));
        }
    
        if (aboutYouFromLocalStorage) {
          setLoginInfo((prevLoginInfo) => ({
            ...prevLoginInfo,
            aboutYou: aboutYouFromLocalStorage,
          }));
        }
      }, []);

  return (
    <>
        <Navbar/>
        <section className="profile container">
            <div className="edit-profile">
                <p className='text text-right' onClick={()=>{
                    history.push('/editProfile');
                }}>Edit Profile</p>
                <p className='text text-right' onClick={()=>{
                    localStorage.setItem("isLoggedIn", "");
                    history.push('/');
                }}>Logout</p>
            </div>
            <div className="profile-form">
                <form className="d-flex flex-column align-items-center">
                    <div className="profile-picture">
                        <img src={loginInfo.profilePicture} alt="User Profile Pic" />
                    </div>
                    <input type="text" value= {loginInfo.name} name='name' readOnly/>
                    <input type="text" value={loginInfo.businessName} name='businessName' readOnly/>
                    <input type="text" value={"0"+loginInfo.phoneNumber} name='phoneNumber' readOnly/>
                    <div className="about-user">
                        <p>About me</p>
                        <textarea name="aboutYourBusiness" value={loginInfo.aboutYourBusiness} readOnly></textarea>
                    </div>
                </form>
            </div>
        </section>
        <Bottom/>
    </>
  )
}

export default MyProfile
//rafce