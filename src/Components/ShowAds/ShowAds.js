/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import './ShowAds.css'
import axios from 'axios'

const ShowAds = () => {
  const adId= localStorage.getItem('adId')
  const [adsInfo, setAdsInfo]= useState([])

  useEffect(()=>{
    axios.get('http://localhost:4000/getAdsInfo')
      .then(response => {
        // console.log('Response:', response.data);
        setAdsInfo(response.data)
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error.message);
      });
  },[])
  const showingAd= adsInfo.filter(add=> add._id === adId)
  console.log(showingAd);

  return (
    <>
      <Navbar/>
      {
          showingAd.map(thisAd=>{
            {/* const {_id, adImageUrl, adName, adDescription, adTime}= thisAd */}
            const {_id, brand, category, contactNumber, description, imageURL, itemName, postingTime, price}= thisAd

            return(
              <section className={`show-ad container p-2 {adTime}`} key={_id}>
                <p className='ad-name m-2'>{itemName}</p>
                <span>Posted on {postingTime}</span><br />
                <button className='buy-now'>Buy Now</button>
                <div className="ad-picture w-100 d-flex align-items-center justify-content-center">
                  <img className="picture w-25" src={imageURL} alt="picture" />
                </div>
                <div className='description d-flex flex-column align-items-center justify-content-center my-3'>
                  <div className="product-price">
                    <p className="price">Tk. {price}</p>
                  </div>
                  <div className="details d-flex flex-wrap">
                  {/* dynamically data will come from db at this place */}
                    <div>
                      <h6>Brand Name</h6>
                      <p>{brand}</p>
                    </div>
                    <div>
                      <h6>Model</h6>
                      <p>{itemName}</p>
                    </div>
                    <div>
                      <h6>Contact Now</h6>
                      <p>{contactNumber}</p>
                    </div>
                    <div>
                      <h6>Category</h6>
                      <p>{category}</p>
                    </div>
                  </div>
                  <div className="description">
                    <p>{description}</p>
                  </div>
                </div>
                
              </section>
            )
          })
        }
      <Bottom/>
    </>
  )
}

export default ShowAds