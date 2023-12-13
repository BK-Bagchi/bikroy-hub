import React, { useEffect, useState } from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import axios from 'axios'
import './PostAd.css'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Sign/FirebaseConfig";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


const EditPostedAds = () => {
    const history= useHistory()

    const userEmail= localStorage.getItem('email')
    const adId= localStorage.getItem('adId')
    const [editableAd, setEditableAd] = useState({
      _id: '',
      category: '',
      contactNumber:0,
      description: '',
      imageUrl: '',
      itemName:'',
      postingTime:'',
      price:'',
      userEmail:''
    })

    useEffect(() => {
        axios.get(`http://localhost:4000/editPostedAdsByAnUser?userEmail=${userEmail}&_id=${adId}`)
          .then(response => {
            // console.log('Response:', response.data);
            setEditableAd(response.data.editableAd[0])
          })
          .catch(error => {
            // Handle errors here
            console.error('Error:', error.message);
          });
      }, [userEmail, adId]);
      // console.log(editableAd)

      useEffect(()=>{
        const date = new Date();
        const futureDateTime = new Date(date.getTime() + 6 * 60 * 60 * 1000);
        const nowDateTime = `${futureDateTime.getFullYear()}-${(futureDateTime.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${futureDateTime.getDate().toString().padStart(2, '0')} ${futureDateTime.getHours().toString().padStart(2, '0')}:${futureDateTime.getMinutes().toString().padStart(2, '0')}:${futureDateTime.getSeconds().toString().padStart(2, '0')}`;

        setEditableAd({
            ...editableAd,
            postingTime: nowDateTime
        })
    },[])

      const [imageUpload, setImageUpload] = useState();
      const uploadFile = () => {
        if (!imageUpload) return;
    
        const imageRef = ref(storage, `9jacoder/images/${imageUpload.name}`);
    
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);
            setEditableAd({
                ...editableAd,
                imageURL: url
            })
          });
        });
      };

      const submitUpdate= ()=>{
        axios.put(`http://localhost:4000/updateAds?adId=${adId}`, editableAd, {
            headers: {'Content-Type': 'application/json',}
            })
            .then((response) => {
                // Parse the response as JSON and handle it here
                console.log('Update successful:', response.data);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error:', error);
            });
        
        history.push('/viewPostedAds')
      }

      const handelFormInput= (e)=> {
        const {name, value}= e.target
        setEditableAd({
            ...editableAd,
            [name]: value
        })
      }
      const handleUpdate= (e)=>{
        e.preventDefault()
        submitUpdate()
      }

  return (
    <>
        <Navbar/>
        <section className="edit-ad container">
            <div className="edit-ad-form">
            <form className="d-flex flex-column align-items-center" key={editableAd._id} onSubmit={handleUpdate}>
                <div className="form-fields">
                    <p>Item name</p>
                    <input type="text" placeholder="Item name" name='itemName' value={editableAd.itemName} onChange={handelFormInput}/>
                </div>
                <div className="form-fields">
                    <p>Brand name</p>
                    <input type="text" placeholder="Brand name" name='brand' value={editableAd.brand} onChange={handelFormInput}/>
                </div>
                <div className="form-fields">
                    <p>Item Price</p>
                    <input type="number" placeholder="Price" name="price" value={editableAd.price} onChange={handelFormInput}/>
                </div>
                <div className="form-fields" onChange={handelFormInput}>
                    <p>Category</p>
                    <select name="category" id="category" style={{margin: '10px'}}>
                        <option value="" style={{display: "none"}}>Select Item Category</option>
                        <option value="Electronic">Electronic</option>
                        <option value="Vechile">Vechile</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Laptop">Laptop</option>
                    </select>
                </div>
                <div className="edit-picture w-100 d-flex align-items-center justify-content-center">
                  <img className="picture w-25" src={editableAd.imageURL} alt="Edit pic" />
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
                    <textarea name="description" placeholder="Product Description" value={editableAd.description} onChange={handelFormInput}></textarea>
                </div>
                <div className="form-fields">
                    <p>Your contact</p>
                    <input type="number" placeholder="Your Contact" name='contactNumber' value={editableAd.contactNumber} onChange={handelFormInput}/>
                </div>
                <button type="submit" className="submit-btn">Update Ad</button>
            </form>
            </div>
        </section>
        <Bottom/>
    </>
  )
}

export default EditPostedAds