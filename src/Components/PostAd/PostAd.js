import React from 'react';
import Bottom from '../Bottom/Bottom';
import Navbar from '../Top/Navbar';
import './PostAd.css';

const PostAd = () => {
    return (
        <>
            <Navbar/>
            <section className="post-ad container">
                <div className="post-ad-form">
                    <form className="d-flex flex-column align-items-center">
                        <input type="text" placeholder="Item name"/>
                        <input type="text" placeholder="Condition"/>
                        <input type="number" placeholder="Price"/>
                        <div className="condition">
                            <p>Condition</p>
                            <input type="checkbox" id="new" name="new" value="Bike"/>
                            <label htmlFor="new">New</label> <br />
                            <input type="checkbox" id="used" name="used" value="Car"/>
                            <label htmlFor="used">Used</label>
                        </div>
                        <textarea name="description" placeholder="Product Description"></textarea>
                        <input type="text" placeholder="Your location" />
                        <input type="number" placeholder="Your Contact"/>
                    </form>
                </div>
            </section>
            <Bottom/>
        </>
    );
};

export default PostAd;