/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Bottom from "../Bottom/Bottom";
import Navbar from "../Top/Navbar";
import "./PostAd.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PostAd = () => {
  const history = useHistory();
  const [imageUpload, setImageUpload] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    category: "",
    phoneNumber: "",
    description: "",
    photoURL: "",
    itemName: "",
    postingTime: "",
    price: "",
    email: localStorage.getItem("email"),
  });

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

    setFormData((prevData) => ({
      ...prevData,
      postingTime: nowDateTime,
    }));
  }, []);

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadPhoto = async (imageFile) => {
    const apiKey = "a6609c70246923f822d6ce28a766ead7"; // get free from imgbb.com
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.data.url; // public image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const photoURL = await uploadPhoto(imageUpload);
      const dataToSend = {
        ...formData,
        photoURL: photoURL || "",
      };

      await axios.post(
        "https://bikroydotcom-server.onrender.com/postAdds",
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      history.push("/viewPostedAds");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="post-ad container">
        <div className="post-ad-form">
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={handleSubmit}
          >
            <div className="form-fields">
              <p>Item name</p>
              <input
                type="text"
                placeholder="Item name"
                name="itemName"
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="form-fields">
              <p>Brand name</p>
              <input
                type="text"
                placeholder="Brand name"
                name="brand"
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="form-fields">
              <p>Item Price</p>
              <input
                type="text"
                placeholder="Price"
                name="price"
                onChange={handleFormInput}
                required
              />
            </div>

            <div className="form-fields">
              <p>Category</p>
              <select
                name="category"
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
              {imageUpload && (
                <img
                  className="picture w-25"
                  src={URL.createObjectURL(imageUpload)}
                  alt="Preview"
                />
              )}
            </div>

            <div className="form-fields d-flex align-items-center">
              <p>Upload photo</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageUpload(e.target.files[0])}
                style={{ margin: "10px" }}
                required
              />
            </div>

            <div className="form-fields">
              <p>Item description</p>
              <textarea
                name="description"
                placeholder="Product Description"
                onChange={handleFormInput}
                required
              ></textarea>
            </div>

            <div className="form-fields">
              <p>Your contact</p>
              <input
                type="text"
                placeholder="Your Contact"
                name="phoneNumber"
                onChange={handleFormInput}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Post Ad
            </button>
          </form>
        </div>
      </section>
      <Bottom />
    </>
  );
};

export default PostAd;
