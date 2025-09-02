import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import "./MyProfile.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MyProfile = () => {
  const history = useHistory();
  const myName = localStorage.getItem("displayName");
  const myEmail = localStorage.getItem("email");
  const myProfilePicture = localStorage.getItem("photoURL");
  const [formData, setFromData] = useState({
    displayName: myName,
    email: myEmail,
    photoURL: myProfilePicture,
    businessName: "",
    phoneNumber: "",
    aboutBusiness: "",
  });
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getProfileInfo?userEmail=${myEmail}`
        );
        setFromData(response.data[0]);
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };

    if (myEmail) fetchProfileInfo();
  }, [myEmail, API_BASE_URL]);

  const handelFormInput = (e) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    await postProfileInfo();
    history.push("/myProfile");
  };

  const postProfileInfo = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/postProfileInfo`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response) return alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="profile container">
        <div className="edit-profile">
          <p
            className="text text-right"
            onClick={() => {
              history.push("/myProfile");
            }}
          >
            My Profile
          </p>
        </div>
        <div className="profile-form">
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={handleSubmit}
          >
            <div className="profile-picture">
              <img src={myProfilePicture} alt="User Profile Pic" />
            </div>
            <input
              className="sm:w-50 w-75"
              type="text"
              value={myName}
              readOnly
            />
            <input
              className="sm:w-50 w-75"
              type="text"
              placeholder="Enter Your Business name"
              name="businessName"
              value={formData.businessName}
              onChange={handelFormInput}
            />
            <input
              className="sm:w-50 w-75"
              type="text"
              placeholder="Enter Your Contact"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handelFormInput}
            />
            <div className="about-user sm:w-50 w-75">
              <p>
                Write something about your business so that others can connect
                to you.
              </p>
              <textarea
                className="w-100"
                placeholder="About your business..."
                name="aboutBusiness"
                value={formData.aboutBusiness}
                onChange={handelFormInput}
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Update Profile
            </button>
          </form>
        </div>
      </section>
      <Bottom />
    </>
  );
};

export default MyProfile;
//rafce
