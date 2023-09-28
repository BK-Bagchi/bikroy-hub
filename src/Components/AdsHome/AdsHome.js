/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './AdsHome.css'
import adsHomeDatabase from '../Database/AdsHomeDatabse';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const AdsHome = () => {
    const history = useHistory()
    return (
        <section className="ads-home container">
            <p>Posted adds</p>
            <div className="card-group">
                {
                    adsHomeDatabase.map(adsHome =>{
                        const {id, adImageUrl, adName, adDescription, adTime}= adsHome
                        
                        return (
                            <div className='card' key={id} onClick={()=>{
                                localStorage.setItem('adId', id)
                                history.push('/showAds')
                                window.location.reload()
                            }}>
                                <img className="card-img-top" src={require(`../../Resources/ads/${adImageUrl}`)} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{adName}</h5>
                                    <p className="card-text">{adDescription}</p>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">Posted {adTime} days ago</small>
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