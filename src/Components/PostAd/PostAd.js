import React, { useState } from 'react';
import axios from 'axios';
import Bottom from '../Bottom/Bottom';
import Navbar from '../Top/Navbar';
import './PostAd.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const PostAd = () => {
    const history= useHistory()
    const [formData, setFromData]= useState({
        itemName: '',
        price: 0,
        category: '',
        description: '',
        contactNumber: 0
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
        
        history.push('/')
    }
    return (
        <>
            <Navbar/>
            <section className="post-ad container">
                <div className="post-ad-form">
                    <form className="d-flex flex-column align-items-center" onSubmit={handelSubmit}>
                        <input type="text" placeholder="Item name" name='itemName' onBlur={handelFormInput}/>
                        {/* <input type="text" placeholder="Condition" name="condition" onBlur={handelFormInput}/> */}
                        
                        <input type="number" placeholder="Price" name="price" onBlur={handelFormInput}/>
                        <div className="d-flex align-items-center" onBlur={handelFormInput} style={{width: '40%'}}>
                            <p>Category</p>
                            <select name="category" id="category" style={{margin: '10px'}}>
                                <option value="" style={{display: "none"}}>Select Item Category</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Vechile">Vechile</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Laptop">Laptop</option>
                            </select>
                        </div>
                        <textarea name="description" placeholder="Product Description" onBlur={handelFormInput}></textarea>
                        <input type="number" placeholder="Your Contact" name='contactNumber' onBlur={handelFormInput}/>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                </div>
            </section>
            <Bottom/>
        </>
    );
};

export default PostAd;