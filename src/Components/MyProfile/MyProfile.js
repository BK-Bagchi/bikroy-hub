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
    const myEmail= localStorage.getItem('email')
    const [profileInfo, setProfileInfo]= useState({
        _id: 13,
        name: myName,
        profilePicture: myProfilePicture,
        businessName: '',
        phoneNumber: '',
        aboutYourBusiness: ''
    })

    //setting profile info for temporary use
    useEffect(() => {
        axios.get(`http://localhost:4000/getProfileInfo?userEmail=${myEmail}`)
          .then(response => {
            // console.log('Response:', response.data);
            setProfileInfo(response.data[0])
          })
          .catch(error => {
            // Handle errors here
            console.error('Error:', error.message);
          });
      }, [myEmail]);
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
                        <img src={myProfilePicture} alt="User Profile Pic" />
                    </div>
                    <input type="text" value= {myName} name='name' readOnly/>
                    <input type="text" value={profileInfo.businessName} name='businessName' placeholder='Your business name' readOnly/>
                    <input type="text" value={profileInfo.phoneNumber} name='phoneNumber' placeholder='Your phone number' readOnly/>
                    <div className="about-user">
                        <p>About business</p>
                        <textarea name="aboutYourBusiness" value={profileInfo.aboutBusiness} placeholder='About your business' readOnly></textarea>
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