/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import "./ShowAds.css";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const ShowAds = () => {
  const history = useHistory();
  const { addId } = useParams();
  const userEmail = localStorage.getItem("email");
  const [loggedIn, isLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  useEffect(() => {
    isLoggedIn(localStorage.getItem("isLoggedIn"));
  }, [loggedIn]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [showLoader, setShowLoader] = useState(true);
  const [favAddInfo, setFavAddInfo] = useState([]);
  const [adsInfo, setAdsInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    shippingAddress: "",
    phoneNumber: "",
    postCode: "",
    customerEmail: userEmail,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [specificAddResponse, favoriteAddsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/getSpecificAdd/?addId=${addId}`),
          axios.get(`${API_BASE_URL}/getFavoriteAdds?userEmail=${userEmail}`),
        ]);
        setFavAddInfo(favoriteAddsResponse.data.favoriteAdds);
        setAdsInfo([specificAddResponse.data]); // Wrap in array to keep consistent structure
        setShowLoader(false);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    if (addId) fetchData();
  }, [addId, userEmail, API_BASE_URL]);

  // console.log(adsInfo);
  // console.log(favAddInfo);

  const orderNow = (paymentMethod) => {
    const { email, ...rest } = adsInfo[0];
    const sendPaymentInfo = {
      ...paymentInfo,
      ...rest,
      paymentMethod: paymentMethod,
      sellerEmail: email,
      userName: localStorage.getItem("displayName"),
    };
    // console.log(sendPaymentInfo);

    const postAdAsync = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/placeOrder`,
          sendPaymentInfo,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        // On online payment, redirects to the sslcommerz getaway. Or to success_url if paymentMethod is cod
        window.location.replace(response.data.url);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    //prettier-ignore
    if(paymentInfo.shippingAddress && paymentInfo.phoneNumber && paymentInfo.postCode) postAdAsync();
    else alert("Please fill up all the fields.");
  };

  const handelFormInput = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const addToFavorites = async (addId) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/addToFavorites`,
        {
          addId: addId,
          email: userEmail,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      {showLoader ? (
        <div className="loader">
          <p className="text-center">Loading...</p>
        </div>
      ) : (
        adsInfo.map((thisAd) => {
          //prettier-ignore
          const { _id, brand, category, phoneNumber, description, photoURL, itemName, postingTime, price } = thisAd;

          return (
            <section className="show-ad container p-2" key={_id}>
              <p className="ad-name m-2">{itemName}</p>
              <span>Posted on {postingTime}</span>
              <br />
              {loggedIn ? (
                <>
                  {/* prettier-ignore */}
                  <button className="buy-now" data-toggle="modal" data-target="#orderTakingModal" >
                  <i className="bi bi-bag"></i> Buy Now
                </button>
                  <br />
                  {favAddInfo.includes(adsInfo[0]._id) ? (
                    //  prettier-ignore
                    <button className="btn btn-info mt-2">
                    <i className="bi bi-heart me-2"></i> Added to Favorites
                  </button>
                  ) : (
                    // prettier-ignore
                    <button className="btn btn-outline-info mt-2" onClick={()=>addToFavorites(_id)}>
                      <i className="bi bi-heart me-2"></i> Add to Favorites
                    </button>
                  )}
                </>
              ) : (
                <span
                  className="buy-now"
                  onClick={() => history.push("/login")}
                >
                  Login to order
                </span>
              )}
              {/* prettier-ignore */}
              <div className="modal"  tabIndex="-1" role="dialog" id="orderTakingModal"  >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Payment Info</h5>
                    {/* prettier-ignore */}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {/* pop up starts */}
                  <div className="modal-body">
                    <section className="d-flex flex-column align-items-center">
                      <div className="form-fields">
                        <p>Shipping Name</p>
                        {/* prettier-ignore */}
                        <input type="text" placeholder="Your Name" name="userName" value={localStorage.getItem("displayName")} />
                      </div>
                      <div className="form-fields">
                        <p>Contact Email</p>
                        {/* prettier-ignore */}
                        <input type="text" placeholder="Your Email" name="userEmail" value={localStorage.getItem("email")} />
                      </div>
                      <div className="form-fields">
                        <p>Item Price</p>
                        {/* prettier-ignore */}
                        <input type="text"  placeholder="Price" ame="price" value={price} />
                      </div>
                      <div className="form-fields">
                        <p>Address</p>
                        {/* prettier-ignore */}
                        <input type="text" placeholder="Your Shipping Address" name="shippingAddress" onChange={handelFormInput} required />
                      </div>
                      <div className="form-fields">
                        <p>Contact</p>
                        {/* prettier-ignore */}
                        <input type="text" placeholder="Your Contact"  name="phoneNumber" onChange={handelFormInput} />
                      </div>
                      <div className="form-fields">
                        <p>Post code</p>
                        {/* prettier-ignore */}
                        <input type="text" placeholder="Your Post Code" name="postCode" onChange={handelFormInput} />
                      </div>
                    </section>
                  </div>
                  {/* pop up ends */}
                  <div className="modal-footer">
                    {/* prettier-ignore */}
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" >
                      Cancel
                    </button>
                    {/* prettier-ignore */}
                    <button type="button" className="btn btn-info" onClick={()=> orderNow("cod")} >
                      Cash on Delivery
                    </button>
                    {/* prettier-ignore */}
                    <button type="button" className="btn btn-primary" onClick={()=> orderNow("online")} >
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
              <div>
                <div className="d-flex justify-content-center my-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => alert("Chat with seller is coming soon.")}
                  >
                    <i className="bi bi-chat-dots me-2"></i> Chat with Seller
                  </button>
                </div>
              </div>
            </section>
          );
        })
      )}
      <Bottom />
    </>
  );
};

export default ShowAds;
