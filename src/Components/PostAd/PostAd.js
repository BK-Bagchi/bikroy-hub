import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bottom from '../Bottom/Bottom';
import Navbar from '../Top/Navbar';
import './PostAd.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Sign/FirebaseConfig";

const PostAd = () => {
    const history= useHistory()
    const [formData, setFromData]= useState({
        itemName: '',
        price: 0,
        category: '',
        description: '',
        contactNumber: 0,
        imageURL: '',
        postingTime: ''
    })

    const [imageUpload, setImageUpload] = useState();
    const uploadFile = () => {
        if (!imageUpload) return;
    
        const imageRef = ref(storage, `9jacoder/images/${imageUpload.name}`);
    
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);
            setFromData({
                ...formData,
                imageURL: url
            })
          });
        });
      };

    // console.log(formData);

    useEffect(()=>{
        const date = new Date();
        const futureDateTime = new Date(date.getTime() + 6 * 60 * 60 * 1000);
        const nowDateTime = `${futureDateTime.getFullYear()}-${(futureDateTime.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${futureDateTime.getDate().toString().padStart(2, '0')} ${futureDateTime.getHours().toString().padStart(2, '0')}:${futureDateTime.getMinutes().toString().padStart(2, '0')}:${futureDateTime.getSeconds().toString().padStart(2, '0')}`;

        setFromData({
            ...formData,
            postingTime: nowDateTime
        })
    },[])
    // console.log(formData);

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
                        <div className="form-fields">
                            <p>Item name</p>
                            <input type="text" placeholder="Item name" name='itemName' onBlur={handelFormInput}/>
                        </div>
                        {/* <input type="text" placeholder="Condition" name="condition" onBlur={handelFormInput}/> */}
                        <div className="form-fields">
                            <p>Item Price</p>
                            <input type="number" placeholder="Price" name="price" onBlur={handelFormInput}/>
                        </div>
                        <div className="form-fields" onBlur={handelFormInput}>
                            <p>Category</p>
                            <select name="category" id="category" style={{margin: '10px'}}>
                                <option value="" style={{display: "none"}}>Select Item Category</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Vechile">Vechile</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Laptop">Laptop</option>
                            </select>
                        </div>
                        <div className="form-fields">
                            <p>Upload photo</p>
                            <input type="file" onChange={(event) => {
                                setImageUpload(event.target.files[0])}}
                                onBlur={() =>uploadFile()}
                            style={{margin: '10px'}}/>
                            {/* <button onClick={uploadFile}>Upload</button> */}
                        </div>
                        <div className="form-fields">
                            <p>Item description</p>
                            <textarea name="description" placeholder="Product Description" onBlur={handelFormInput}></textarea>
                        </div>
                        <div className="form-fields">
                            <p>Your contact</p>
                            <input type="number" placeholder="Your Contact" name='contactNumber' onBlur={handelFormInput}/>
                        </div>
                        <button type="submit" className="submit-btn">Post Ad</button>
                    </form>
                </div>
            </section>
            <Bottom/>
        </>
    );
};

export default PostAd;