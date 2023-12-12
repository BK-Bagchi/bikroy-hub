import React, { useEffect, useState } from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import axios from 'axios'

const EditPostedAds = () => {
    const userEmail= localStorage.getItem('email')
    const adId= localStorage.getItem('adId')
    const [adInfo, setAdInfo]= useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/getPostedAdsByAnUser?userEmail=${userEmail}`)
          .then(response => {
            // console.log('Response:', response.data);
            setAdInfo(response.data.userAds)
          })
          .catch(error => {
            // Handle errors here
            console.error('Error:', error.message);
          });
      }, [userEmail]);
    
      const editableAd= adInfo.filter(add=> add._id === adId)
      console.log(editableAd);

  return (
    <>
        <Navbar/>
        <div>EditPostedAds</div>
        <Bottom/>
    </>
  )
}

export default EditPostedAds