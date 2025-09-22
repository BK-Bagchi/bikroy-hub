import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import "./MyProfile.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useAuth from "../../Hooks/JWTDecode";

const MyProfile = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const [profileInfo, setProfileInfo] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  //setting profile info for temporary use
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/profileInfo/getProfileInfo`, {
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
  // console.log(profileInfo);

  const capitalizeFirstLetter = (string="") => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  };

  return (
    <>
      <Navbar />
      <section className="profile container">
        <div className="edit-profile">
          <p className="text text-right" onClick={() => {
              history.push("/editProfile");
            }} >
            Edit Profile
          </p>
          <p className="text text-right" onClick={() => {
              logout();
              history.push("/");
            }} >
            Logout
          </p>
        </div>
        <div className="profile-form">
          <form className="d-flex flex-column align-items-center">
            <div className="profile-picture">
              <img src={profileInfo?.photoURL || ""} alt="User Profile Pic" />
            </div>
            <input className="sm:w-50 w-75" type="text" value={profileInfo?.displayName || ""} name="name" readOnly />

            <input className="sm:w-50 w-75" type="text" value={profileInfo?.email || ""} name="email"  readOnly  />

            <input className="sm:w-50 w-75" type="text" value={capitalizeFirstLetter(profileInfo?.role) || ""} name="role"  readOnly  />
            
            <input className="sm:w-50 w-75" type="text" value={capitalizeFirstLetter(profileInfo?.paymentMedia?.method) || ""} name="paymentMethod" placeholder="Edit profile to enter payment method" readOnly />
            
            <input className="sm:w-50 w-75" type="text" value={profileInfo?.paymentMedia?.accountNumber || ""} name="accountNumber" placeholder="Edit profile to enter account number" readOnly />
            
            <input className="sm:w-50 w-75" type="text" value={profileInfo?.phoneNumber || ""} name="phoneNumber"  placeholder="Edit profile to enter your phone number" readOnly />
          </form>
        </div>
      </section>
      <Bottom />
    </>
  );
};

export default MyProfile;
//rafce
