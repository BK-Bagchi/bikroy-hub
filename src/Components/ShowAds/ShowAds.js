/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import './ShowAds.css'

const ShowAds = () => {
  return (
    <>
        <Navbar/>
        <section className="show-ad container p-2">
            <p className='ad-name m-2'>Ad name specified by user</p>
            <div className="ad-picture w-100 d-flex align-items-center justify-content-center">
              <img className="picture w-25" src={require(`../../Resources/ads/Laptop.jpg`)} alt="picture" />
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum maxime sequi repellat, nulla illo reiciendis consectetur perspiciatis laborum quae! Velit!</p>
              </div>
            </div>
        </section>
        <Bottom/>
    </>
  )
}

export default ShowAds