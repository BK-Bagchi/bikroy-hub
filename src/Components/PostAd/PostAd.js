/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Bottom from "../Bottom/Bottom";
import Navbar from "../Top/Navbar";
import "./PostAd.css";
import Categories from "../Database/Categories";

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
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const photoURL = await uploadPhoto(imageUpload);
      const dataToSend = {
        ...formData,
        photoURL: photoURL || "",
      };

      const response = await axios.post(
        `${API_BASE_URL}/adds/postAdds`,
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) alert("Add posted successfully.");
      history.push("/viewPostedAds");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="post-ad container">
        <div className="post-ad-form px-3">
          <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit} >
            <div className="form-fields w-100">
              <p>Item name</p>
              <input className="sm:w-50 w-75" type="text" placeholder="Item name"  name="itemName" onChange={handleFormInput} required />
            </div>
            <div className="form-fields w-100">
              <p>Brand name</p>
              <input className="sm:w-50 w-75"  type="text" placeholder="Brand name" name="brand" onChange={handleFormInput} required />
            </div>
            <div className="form-fields w-100">
              <p>Item Price</p>
              <input className="sm:w-50 w-75" type="text" placeholder="Price" name="price" onChange={handleFormInput} required/>
            </div>
            <div className="form-fields w-100">
              <p>Category</p>
              <select name="category" id="category" onChange={handleFormInput} required style={{ margin: "10px" }} >
                <option className="d-none" value="">
                  Select Item Category
                </option>
                {Categories.map((category) => (
                  <option key={category.id} value={category.type}>
                    {category.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="edit-picture w-100 d-flex align-items-center justify-content-center">
              {imageUpload && 
              <img className="picture w-25" src={URL.createObjectURL(imageUpload)}  alt="Preview" />}
            </div>
            <div className="form-fields w-100 d-flex align-items-center">
              <p>Upload photo</p>
              <input className="sm:w-50 w-75" type="file" accept="image/*" onChange={(e) => setImageUpload(e.target.files[0])} style={{ margin: "10px" }} required />
            </div>
            <div className="form-fields w-100">
              <p>Item description</p>
              <textarea name="description" placeholder="Product Description" onChange={handleFormInput}  required  ></textarea>
            </div>
            <div className="form-fields w-100">
              <p>Your contact</p>
              <input className="sm:w-50 w-75" type="text" placeholder="Your Contact"  name="phoneNumber" onChange={handleFormInput} required />
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
