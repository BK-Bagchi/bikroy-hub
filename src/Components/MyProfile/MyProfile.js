import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import './MyProfile.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const MyProfile = () => {
    const history= useHistory()
    const myName= localStorage.getItem('displayName')
    const myProfilePicture= localStorage.getItem('photoURL')
    const [profileInfo, setProfileInfo]= useState({
        _id: 13,
        name: myName,
        profilePicture: myProfilePicture,
        businessName: 'Your business name',
        phoneNumber: '01xxxxxxxxx',
        aboutYourBusiness: 'All about my business'
    })

    //setting profile info for temporary use
    useEffect(() => {
        axios.get('http://localhost:4000/getProfileInfo')
          .then(response => {
            // console.log('Response:', response.data);
            setProfileInfo(response.data[0])
          })
          .catch(error => {
            // Handle errors here
            console.error('Error:', error.message);
          });
      }, []);
    //   console.log(profileInfo)

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
                        <img src={profileInfo.profilePicture} alt="User Profile Pic" />
                    </div>
                    <input type="text" value= {profileInfo.name} name='name' readOnly/>
                    <input type="text" value={profileInfo.businessName} name='businessName' readOnly/>
                    <input type="text" value={profileInfo.phoneNumber} name='phoneNumber' readOnly/>
                    <div className="about-user">
                        <p>About me</p>
                        <textarea name="aboutYourBusiness" value={profileInfo.aboutYourBusiness} readOnly></textarea>
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