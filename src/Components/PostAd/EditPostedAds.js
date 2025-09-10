/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import axios from "axios";
import "./PostAd.css";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import useAuth from "../../Hooks/JWTDecode";

const EditPostedAds = () => {
  const history = useHistory();
  const { adId } = useParams();
  const { user } = useAuth();
  const userEmail = user?.email || "";
  const [imageUpload, setImageUpload] = useState(null);
  const [editableAd, setEditableAd] = useState({
    _id: "",
    brand: "",
    category: "",
    description: "",
    email: userEmail,
    itemName: "",
    phoneNumber: "",
    photoURL: "",
    postingTime: "",
    price: "",
  });
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchEditableAd = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/editPostedAddsByAnUser?userEmail=${userEmail}&_id=${adId}`
        );
        setEditableAd(response.data.add);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    if (userEmail && adId) fetchEditableAd();
  }, [userEmail, adId, API_BASE_URL]);

  // console.log(editableAd)

  useEffect(() => {
    const date = new Date();
    const futureDateTime = new Date(date.getTime() + 6 * 60 * 60 * 1000);
    const nowDateTime = `${futureDateTime.getFullYear()}-${(
      futureDateTime.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${futureDateTime
      .getDate()
      .toString()
      .padStart(2, "0")} ${futureDateTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${futureDateTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${futureDateTime
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    setEditableAd({
      ...editableAd,
      postingTime: nowDateTime,
    });
  }, []);

  const uploadPhoto = async (imageFile) => {
    const apiKey = process.env.REACT_APP_API_KEY; // get free from imgbb.com
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.data.url; // public image URL
  };

  const updateAd = async (e) => {
    e.preventDefault();

    try {
      let photoURL = editableAd.photoURL;
      if (imageUpload) photoURL = await uploadPhoto(imageUpload);

      const dataToUpdate = {
        ...editableAd,
        photoURL: photoURL,
      };

      const response = await axios.put(
        `${API_BASE_URL}/updateAdds?adId=${adId}`,
        dataToUpdate,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response) alert("Add updated successfully.");
      history.push("/viewPostedAds");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const deleteAd = async (e, adId) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/deleteAdds?adId=${adId}`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );
      if (response) alert("Add deleted successfully.");
      history.push("/viewPostedAds");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setEditableAd({
      ...editableAd,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar />
      <section className="edit-ad container">
        <div className="edit-ad-form px-3">
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={updateAd}
          >
            <div className="form-fields w-100">
              <p>Item name</p>
              <input
                type="text"
                placeholder="Item name"
                name="itemName"
                value={editableAd.itemName}
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="form-fields w-100">
              <p>Brand name</p>
              <input
                type="text"
                placeholder="Brand name"
                name="brand"
                value={editableAd.brand}
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="form-fields w-100">
              <p>Item Price</p>
              <input
                type="text"
                placeholder="Price"
                name="price"
                value={editableAd.price}
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="form-fields w-100">
              <p>Category</p>
              <select
                name="category"
                value={editableAd.category}
                id="category"
                onChange={handleFormInput}
                required
                style={{ margin: "10px" }}
              >
                <option value="">Select Item Category</option>
                <option value="Electronic">Electronic</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
              </select>
            </div>

            <div className="edit-picture w-100 d-flex align-items-center justify-content-center">
              {(imageUpload || editableAd.photoURL) && (
                <img
                  className="picture w-25"
                  src={
                    imageUpload
                      ? URL.createObjectURL(imageUpload)
                      : editableAd.photoURL
                  }
                  alt="Preview"
                />
              )}
            </div>

            <div className="form-fields w-100 d-flex align-items-center">
              <p>Upload photo</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageUpload(e.target.files[0])}
                style={{ margin: "10px" }}
              />
            </div>

            <div className="form-fields w-100">
              <p>Item description</p>
              <textarea
                name="description"
                value={editableAd.description}
                placeholder="Product Description"
                onChange={handleFormInput}
                required
              ></textarea>
            </div>

            <div className="form-fields w-100">
              <p>Your contact</p>
              <input
                type="text"
                placeholder="Your Contact"
                name="phoneNumber"
                value={editableAd.phoneNumber}
                onChange={handleFormInput}
                required
              />
            </div>
            <div className="d-flex justify-content-around w-50">
              <button type="submit" className="submit-btn">
                Update
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                onClick={(e) => deleteAd(e, editableAd._id)}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </section>
      <Bottom />
    </>
  );
};

export default EditPostedAds;
