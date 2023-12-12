/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import './AdsHome.css'
import adsHomeDatabase from '../Database/AdsHomeDatabse';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';


const AdsHome = () => {
    const history = useHistory()
    const [adsInfo, setAdsInfo] = useState([])

    useEffect(() => {
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
    // console.log(adsInfo)

    return (
        <section className="ads-home container">
            <p>Recently posted</p>
            <div className="card-group">
                {
                    adsInfo.map(adsHome =>{
                        {/* const {id, adImageUrl, adName, adDescription, adTime}= adsHome */}
                        const {_id, itemName, description, price, category}= adsHome
                        
                        return (
                            <div className='card' key={_id} onClick={()=>{
                                localStorage.setItem('adId', _id)
                                history.push('/showAds')
                            }}>
                                {/* <img className="card-img-top" src={require(`../../Resources/ads/${adImageUrl}`)} alt="Card image cap" /> */}
                                <img className="card-img-top" src={require(`../../Resources/ads/Laptop.jpg`)} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{itemName}</h5>
                                    <p className="card-text">{description}</p>
                                    <span className="card-text price">Price: {price}</span>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Posted "adTime" days ago</small>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default AdsHome;