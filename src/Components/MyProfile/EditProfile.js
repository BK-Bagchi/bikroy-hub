import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import './MyProfile.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const MyProfile = () => {
    const history= useHistory()
    const myName= localStorage.getItem('displayName')
    const myProfilePicture= localStorage.getItem('photoURL')

    const [formData, setFromData]= useState({
        name: myName,
        profilePicture: myProfilePicture,
        location: '',
        phoneNumber: 0,
        aboutYou: ''
    })

    const handelFormInput= (e) =>{
        const {name, value} = e.target
        setFromData({
            ...formData,
            [name]: value
        })
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)

        //setting profile info for temporary use
        localStorage.setItem("location", formData.location)
        localStorage.setItem("phoneNumber", formData.phoneNumber)
        localStorage.setItem("aboutYou", formData.aboutYou);
        
        profileInfo();
        history.push('/myProfile')
      };

      const profileInfo = () => {
        axios.post('http://localhost:4000/profileInfo', formData, {
            headers: {'Content-Type': 'application/json',}
            })
            .then((response) => {
                // Parse the response as JSON and handle it here
                console.log('this is axios post method',response.data);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error:', error);
            });
      };
      
  return (
    <>
        <Navbar/>
        <section className="profile container">
            <div className="edit-profile">
                <p className='text text-right' onClick={()=>{
                        history.push('/myProfile');
                        window.location.reload();
                    }}>My Profile</p>
            </div>
            <div className="profile-form">
                <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                    <div className="profile-picture">
                        <img src={myProfilePicture} alt="User Profile Pic" />
                    </div>
                    <input type="text" value= {myName} readOnly/>
                    <input type="text" placeholder="Enter Your location" name='location' onBlur={handelFormInput}/>
                    <input type="number" placeholder="Enter Your Contact" name='phoneNumber' onBlur={handelFormInput}/>
                    <div className="about-user">
                        <p>Write something about yourself so that others can connect to you.</p>
                        <textarea placeholder="About you..." name="aboutYou" onBlur={handelFormInput}></textarea>
                    </div>
                    <button type='submit' className='submit-btn'>Submit</button>
                </form>
            </div>
        </section>
        <Bottom/>
    </>
  )
}

export default MyProfile
//rafce