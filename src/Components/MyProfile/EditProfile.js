import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import "./MyProfile.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MyProfile = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [formData, setFromData] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/profileInfo/getProfileInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFromData(response.data[0]);
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };

    if (token) fetchProfileInfo();
  }, [token, API_BASE_URL]);
  // console.log(formData);

  const handelFormInput = (e) => {
    const { name, value } = e.target;
    if (name === "method" || name === "accountNumber") {
      setFromData({
      ...formData,
      paymentMedia:{
        ...formData.paymentMedia,
        [name]: value
      }
    });
    }
    else {
      setFromData({
      ...formData,
      [name]: value,
    })
  }
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
        `${API_BASE_URL}/profileInfo/postProfileInfo`,
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
            className="d-flex flex-column align-items-center" onSubmit={handleSubmit} >
            <div className="profile-picture">
              <img src={formData?.photoURL} alt="User Profile Pic" />
            </div>
            <input className="sm:w-50 w-75" type="text" name="displayName" value={formData?.displayName} readOnly />
            <select name="method" className="sm:w-50 w-75" value={formData?.paymentMedia?.method} onChange={handelFormInput} >
              <option value="" className="d-none">Select Payment Method</option>
              <option value="bank">Bank</option>
              <option value="bkash">Bkash</option>
              <option value="rocket">Rocket</option>
              <option value="nagad">Nagad</option>
            </select>
            <input className="sm:w-50 w-75" type="text" placeholder="Enter Your account number" name="accountNumber" value={formData?.paymentMedia?.accountNumber} onChange={handelFormInput} />
            <input className="sm:w-50 w-75" type="text" placeholder="Enter Your Contact" name="phoneNumber" value={formData?.phoneNumber} onChange={handelFormInput} />
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
