import React, { useState } from 'react';
import axios from 'axios';
import Bottom from '../Bottom/Bottom';
import Navbar from '../Top/Navbar';
import './PostAd.css';

const PostAd = () => {
    const [formData, setFromData]= useState({
        itemName: '',
        condition: '',
        price: 0,
        isUsed: '',
        description: '',
        location:'',
        number: 0
    })

    const handelFormInput= (e)=>{
        const {name, value}= e.target
        setFromData({
            ...formData,
            [name]: value
        })
    }

    const handelSubmit = (e)=>{
        e.preventDefault()
        itemInfo()
        // console.log(formData)
    }

    const itemInfo = ()=>{
        axios.post('http://localhost:4000/postAds', formData, {
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
    }
    return (
        <>
            <Navbar/>
            <section className="post-ad container">
                <div className="post-ad-form">
                    <form className="d-flex flex-column align-items-center" onSubmit={handelSubmit}>
                        <input type="text" placeholder="Item name" name='itemName' onBlur={handelFormInput}/>
                        <input type="text" placeholder="Condition" name="condition" onBlur={handelFormInput}/>
                        <input type="number" placeholder="Price" name="price" onBlur={handelFormInput}/>
                        <div className="condition" onBlur={handelFormInput}>
                            <p>Condition</p>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" id="new" name="isUsed" value="new"/>
                                <label htmlFor="new">New</label>
                            </div>
                            <div className='d-flex align-items-center'>
                                <input type="checkbox" id="used" name="isUsed" value="used"/>
                                <label htmlFor="used">Used</label>
                            </div>
                        </div>
                        <textarea name="description" placeholder="Product Description" onBlur={handelFormInput}></textarea>
                        <input type="text" placeholder="Your location" name='location' onBlur={handelFormInput}/>
                        <input type="number" placeholder="Your Contact" name='number' onBlur={handelFormInput}/>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                </div>
            </section>
            <Bottom/>
        </>
    );
};

export default PostAd;