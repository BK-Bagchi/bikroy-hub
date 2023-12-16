import React, { useEffect, useState } from 'react';
import './Categories.css'
import axios from 'axios';

const Categories = () => {
    const [adsInfo, setAdsInfo]= useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/getAdsInfo")
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

    const countAdByCategory = adsInfo.reduce((acc, ad) => {
        const category = ad.category || ''; 
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
    //   console.log(countByCategory)

    return (
        <section className="container categories">
            <p className="text-center mt-2 mb-2 font-weight-bold">See items by Categories</p>
            <div className="row">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <img className='card-icon' src={require(`../../Resources/images/mobile-icon.png`)} alt="mobile-icon" />
                            <h5 className="card-title">Mobile</h5>
                            <p className="card-text">Total Ads: <b>{countAdByCategory.Mobile}</b></p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <img className='card-icon' src={require(`../../Resources/images/electronics-icon.png`)} alt="electronics-icon" />
                            <h5 className="card-title">Electronics</h5>
                            <p className="card-text">Total Ads: <b>{countAdByCategory.Electronic}</b></p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <img className='card-icon' src={require(`../../Resources/images/vehicle-icon.jpeg`)} alt="vehicle-icon" />
                            <h5 className="card-title">Vehicle</h5>
                            <p className="card-text">Total Ads: <b>{countAdByCategory.Vehicle}</b></p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <img className='card-icon' src={require(`../../Resources/images/laptop-icon.png`)} alt="laptop-icon" />
                            <h5 className="card-title">Laptop</h5>
                            <p className="card-text">Total Ads: <b>{countAdByCategory.Laptop}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;