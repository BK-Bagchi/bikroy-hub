import React, { useEffect, useState } from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ViewPostedAds = () => {
  const history= useHistory()

  const userEmail= localStorage.getItem('email')
  const [postedAds, setPostedAds]= useState([])

  useEffect(() => {
    axios.get(`http://localhost:4000/getPostedAdsByAnUser?userEmail=${userEmail}`)
      .then(response => {
        // console.log('Response:', response.data);
        setPostedAds(response.data.userAds)
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error.message);
      });
  }, [userEmail]);
  // console.log(postedAds)
  
  return (
    <>
        <Navbar/>
        <section className="ads-home container">
            <p>Posted ads(click to edit)</p>
            <div className="card-group">
                {
                    postedAds.map(postedAdsByAnUser =>{
                        const {_id, itemName, description, price, imageURL, postingTime}= postedAdsByAnUser
                        
                        return (
                            <div className='card' key={_id} onClick={()=>{
                                localStorage.setItem('adId', _id)
                                history.push('/editPostedAds')
                            }}>
                                <img className="card-img-top" src={imageURL} alt="Card img cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{itemName}</h5>
                                    <p className="card-text">{description}</p>
                                    <span className="card-text price">Price: {price}</span>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Posted on {postingTime}</small>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
        <Bottom/>
    </>
  )
}

export default ViewPostedAds