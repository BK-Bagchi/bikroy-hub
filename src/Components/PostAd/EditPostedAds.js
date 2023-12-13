import React, { useEffect, useState } from 'react'
import Navbar from '../Top/Navbar'
import Bottom from '../Bottom/Bottom'
import axios from 'axios'
import './PostAd.css'

const EditPostedAds = () => {
    const userEmail= localStorage.getItem('email')
    const adId= localStorage.getItem('adId')
    const [editableAd, setEditableAd]= useState([])
    const [editedAd, setEditedAd] = useState({
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
            setEditableAd(response.data.editableAd)
          })
          .catch(error => {
            // Handle errors here
            console.error('Error:', error.message);
          });
      }, [userEmail]);

      // console.log(editableAd)

      const handelFormInput= ()=> {}
      const handleUpdate= ()=>{}

  return (
    <>
        <Navbar/>
        <section className="edit-ad container">
            <div className="edit-ad-form">
            {
                  editableAd.map(viewEditableAd=>{
                    const {_id, brand, contactNumber, itemName, description, price, imageURL, postingTime}= viewEditableAd

                    return(
                      <form className="d-flex flex-column align-items-center" key={_id} onSubmit={handleUpdate}>
                          <div className="form-fields">
                              <p>Item name</p>
                              <input type="text" placeholder="Item name" name='itemName' value={itemName} onBlur={handelFormInput}/>
                          </div>
                          <div className="form-fields">
                              <p>Brand name</p>
                              <input type="text" placeholder="Brand name" name='brand' value={brand} onBlur={handelFormInput}/>
                          </div>
                          <div className="form-fields">
                              <p>Item Price</p>
                              <input type="number" placeholder="Price" name="price" value={price} onBlur={handelFormInput}/>
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
                          <div className="edit-picture w-100 d-flex align-items-center justify-content-center">
                            <img className="picture w-25" src={imageURL} alt="Edit pic" />
                          </div>
                          <div className="form-fields">
                              <p>Upload photo</p>
                              {/* <input type="file" onChange={(event) => {
                                  setImageUpload(event.target.files[0])}}
                                  onBlur={() =>uploadFile()}
                              style={{margin: '10px'}}/> */}
                              {/* <button onClick={uploadFile}>Upload</button> */}
                          </div>
                          <div className="form-fields">
                              <p>Item description</p>
                              <textarea name="description" placeholder="Product Description" value={description} onBlur={handelFormInput}></textarea>
                          </div>
                          <div className="form-fields">
                              <p>Your contact</p>
                              <input type="number" placeholder="Your Contact" name='contactNumber' value={contactNumber} onBlur={handelFormInput}/>
                          </div>
                          <button type="submit" className="submit-btn">Post Ad</button>
                      </form>
                    )
                  })
                }
            </div>
        </section>
        <Bottom/>
    </>
  )
}

export default EditPostedAds