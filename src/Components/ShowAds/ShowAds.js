/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import "./ShowAds.css";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ShowAds = () => {
  const history = useHistory();
  const userEmail = localStorage.getItem("email");
  const [loggedIn, isLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  useEffect(() => {
    isLoggedIn(localStorage.getItem("isLoggedIn"));
  }, [loggedIn]);

  const addId = localStorage.getItem("adId");
  const [adsInfo, setAdsInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    shippingAddress: "",
    phoneNumber: "",
    postCode: "",
    customerEmail: userEmail,
  });

  useEffect(() => {
    axios
      .get(
        `https://bikroydotcom-server.onrender.com/getSpecificAdd/?addId=${addId}`
      )
      .then((response) => {
        // console.log("Response:", response.data);
        setAdsInfo([response.data]);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error.message);
      });
  }, [addId]);
  // console.log(adsInfo);

  const orderNow = () => {
    const { email, ...rest } = adsInfo[0];
    const sendPaymentInfo = {
      ...paymentInfo,
      ...rest,
      sellerEmail: email,
      userName: localStorage.getItem("displayName"),
    };
    console.log(sendPaymentInfo);

    axios
      .post(
        "https://bikroydotcom-server.onrender.com/placeOrder",
        sendPaymentInfo,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        // Parse the response as JSON and handle it here
        console.log("this is axios post method", response.data);
        //redirects to the payment page of sslcommerz
        window.location.replace(response.data.url);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  };

  const handelFormInput = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  return (
    <>
      <Navbar />
      {adsInfo.map((thisAd) => {
        const {
          _id,
          brand,
          category,
          phoneNumber,
          description,
          photoURL,
          itemName,
          postingTime,
          price,
        } = thisAd;

        return (
          <section className="show-ad container p-2" key={_id}>
            <p className="ad-name m-2">{itemName}</p>
            <span>Posted on {postingTime}</span>
            <br />
            {loggedIn ? (
              <button
                className="buy-now"
                data-toggle="modal"
                data-target="#orderTakingModal"
              >
                Buy Now
              </button>
            ) : (
              <span className="buy-now" onClick={() => history.push("/login")}>
                Login to order
              </span>
            )}
            <div
              className="modal"
              tabIndex="-1"
              role="dialog"
              id="orderTakingModal"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Payment Info</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {/* pop up starts */}
                  <div className="modal-body">
                    <section className="d-flex flex-column align-items-center">
                      <div className="form-fields">
                        <p>Shipping Name</p>
                        <input
                          type="text"
                          placeholder="Your Name"
                          name="userName"
                          value={localStorage.getItem("displayName")}
                        />
                      </div>
                      <div className="form-fields">
                        <p>Contact Email</p>
                        <input
                          type="text"
                          placeholder="Your Email"
                          name="userEmail"
                          value={localStorage.getItem("email")}
                        />
                      </div>
                      <div className="form-fields">
                        <p>Item Price</p>
                        <input
                          type="text"
                          placeholder="Price"
                          name="price"
                          value={price}
                        />
                      </div>
                      <div className="form-fields">
                        <p>Address</p>
                        <input
                          type="text"
                          placeholder="Your Shipping Address"
                          name="shippingAddress"
                          onChange={handelFormInput}
                        />
                      </div>
                      <div className="form-fields">
                        <p>Contact</p>
                        <input
                          type="text"
                          placeholder="Your Contact"
                          name="phoneNumber"
                          onChange={handelFormInput}
                        />
                      </div>
                      <div className="form-fields">
                        <p>Post code</p>
                        <input
                          type="text"
                          placeholder="Your Post Code"
                          name="postCode"
                          onChange={handelFormInput}
                        />
                      </div>
                    </section>
                  </div>
                  {/* pop up ends */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={orderNow}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="ad-picture w-100 d-flex align-items-center justify-content-center">
              <img className="picture w-25" src={photoURL} alt="picture" />
            </div>
            <div className="description d-flex flex-column align-items-center justify-content-center my-3">
              <div className="product-price">
                <p className="price">Tk. {price}</p>
              </div>
              <div className="details d-flex flex-wrap">
                {/* dynamically data will come from db at this place */}
                <div>
                  <h6>Brand Name</h6>
                  <p>{brand}</p>
                </div>
                <div>
                  <h6>Model</h6>
                  <p>{itemName}</p>
                </div>
                <div>
                  <h6>Contact Now</h6>
                  <p>{phoneNumber}</p>
                </div>
                <div>
                  <h6>Category</h6>
                  <p>{category}</p>
                </div>
              </div>
              <div className="description">
                <p>{description}</p>
              </div>
            </div>
          </section>
        );
      })}
      <Bottom />
    </>
  );
};

export default ShowAds;
