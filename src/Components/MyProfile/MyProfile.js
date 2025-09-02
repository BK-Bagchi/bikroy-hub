import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import "./MyProfile.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useAuth from "../../Hooks/JWTDecode";

const MyProfile = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const [profileInfo, setProfileInfo] = useState({
    _id: 13,
    displayName: "myName",
    email: "myEmail",
    photoURL: "myProfilePicture",
    businessName: "",
    phoneNumber: "",
    aboutYourBusiness: "",
  });
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  //setting profile info for temporary use
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getProfileInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.length > 0)
          setProfileInfo(response.data[0]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    if (token) fetchProfileInfo();
  }, [token, API_BASE_URL]);

  return (
    <>
      <Navbar />
      <section className="profile container">
        <div className="edit-profile">
          <p
            className="text text-right"
            onClick={() => {
              history.push("/editProfile");
            }}
          >
            Edit Profile
          </p>
          <p
            className="text text-right"
            onClick={() => {
              logout();
              history.push("/");
            }}
          >
            Logout
          </p>
        </div>
        <div className="profile-form">
          <form className="d-flex flex-column align-items-center">
            <div className="profile-picture">
              <img src={profileInfo.photoURL} alt="User Profile Pic" />
            </div>
            <input
              type="text"
              value={profileInfo.displayName}
              name="name"
              readOnly
            />
            <input
              type="text"
              value={profileInfo.email}
              name="email"
              readOnly
            />
            <input
              type="text"
              value={profileInfo.businessName || ""}
              name="businessName"
              placeholder="Edit profile to enter your business name"
              readOnly
            />
            <input
              type="text"
              value={profileInfo.phoneNumber || ""}
              name="phoneNumber"
              placeholder="Edit profile to enter your phone number"
              readOnly
            />
            <div className="about-user">
              <p>About business</p>
              <textarea
                name="aboutYourBusiness"
                value={profileInfo.aboutBusiness}
                placeholder="Edit profile to enter your business"
                readOnly
              ></textarea>
            </div>
          </form>
        </div>
      </section>
      <Bottom />
    </>
  );
};

export default MyProfile;
//rafce
