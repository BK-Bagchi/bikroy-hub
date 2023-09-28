/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import './ShowAds.css'
import adsHomeDatabase from '../Database/AdsHomeDatabse'

const ShowAds = () => {
  const adId= localStorage.getItem('adId')
  const showingAd= adsHomeDatabase.filter(add=> add.id=== parseInt(adId))

  return (
    <>
      <Navbar/>
        {
          showingAd.map(thisAd=>{
            const {id, adImageUrl, adName, adDescription, adTime}= thisAd

            return(
              <section className={`show-ad container p-2 ${adTime}`} key={id}>
                <p className='ad-name m-2'>{adName}</p>
                <div className="ad-picture w-100 d-flex align-items-center justify-content-center">
                  <img className="picture w-25" src={require(`../../Resources/ads/${adImageUrl}`)} alt="picture" />
                </div>
                <div className='description d-flex flex-column align-items-center justify-content-center my-3'>
                  <div className="product-price">
                    <p className="price">Tk. 1000</p>
                  </div>
                  <div className="details d-flex flex-wrap">
                  {/* dynamically data will come from db at this place */}
                    <div>
                      <h6>Condition</h6>
                      <p>Condition</p>
                    </div>
                    <div>
                      <h6>Brand</h6>
                      <p>Brand</p>
                    </div>
                    <div>
                      <h6>Model</h6>
                      <p>Model</p>
                    </div>
                    <div>
                      <h6>Condition</h6>
                      <p>Condition</p>
                    </div>
                    <div>
                      <h6>Type</h6>
                      <p>Type</p>
                    </div>
                    <div>
                      <h6>Model</h6>
                      <p>Model</p>
                    </div>
                    <div>
                      <h6>Condition</h6>
                      <p>Condition</p>
                    </div>
                  </div>
                  <div className="description">
                    <p>{adDescription}</p>
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