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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    postProfileInfo();
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
      console.log("this is axios post method", response.data);
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
            <input type="text" value={myName} readOnly />
            <input
              type="text"
              placeholder="Enter Your Business name"
              name="businessName"
              value={formData.businessName}
              onChange={handelFormInput}
            />
            <input
              type="text"
              placeholder="Enter Your Contact"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handelFormInput}
            />
            <div className="about-user">
              <p>
                Write something about your business so that others can connect
                to you.
              </p>
              <textarea
                placeholder="About your business..."
                name="aboutBusiness"
                value={formData.aboutBusiness}
                onChange={handelFormInput}
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit
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
