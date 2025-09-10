import React, { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ViewGotOrders = () => {
  const history = useHistory();

  const userEmail = localStorage.getItem("email");
  const [orders, setOrders] = useState([]);
  const [adsInfo, setAdsInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const orderElementsDetails = orders
    .map((order) => {
      const matchingItem = adsInfo.find((ad) => ad._id === order.productId);
      return {
        orderId: order.orderId || "qwerty12345",
        productId: order.productId || "qwerty12345",
        orderCredentials: order.orderCredentials,
        matchingItems: matchingItem || "qwerty12345",
      };
    })
    .filter((item) => item.matchingItems !== "qwerty12345");
  // console.log(orderElementsDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adsResponse, ordersResponse] = await Promise.all([
          axios.get(
            `${API_BASE_URL}/getPostedAddsByAnUser?userEmail=${userEmail}`
          ),
          axios.get(`${API_BASE_URL}/getOrdersInfo`),
        ]);

        if (adsResponse.data) setAdsInfo(adsResponse.data.userAds);
        if (ordersResponse.data) setOrders(ordersResponse.data);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (userEmail) fetchData();
  }, [userEmail, API_BASE_URL]);

  //   console.log(orders, adsInfo)

  const viewOrderDetails = (orderId) => {
    history.push(`/orderDetails/${orderId}`);
  };

  return (
    <>
      <Navbar />
      <section className="ads-home container">
        {showLoader ? (
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : orderElementsDetails.length === 0 ? (
          <p>You have not recieved any order yet</p>
        ) : (
          <>
            <p>Got orders (click to see details, accept or refuse)</p>
            <div className="card-group d-flex justify-content-center align-items-center">
              {[...orderElementsDetails].reverse().map((orderElements) => {
                const { orderId, matchingItems } = orderElements;
                const { itemName, description, price, photoURL, postingTime } =
                  matchingItems;
                return (
                  <div
                    className="card"
                    key={orderId}
                    style={{ maxHeight: "440px", maxWidth: "230px" }}
                    onClick={() => viewOrderDetails(orderId)}
                  >
                    <img
                      className="card-img-top"
                      src={photoURL}
                      alt="Card img cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{itemName}</h5>
                      <p className="card-text">{description}</p>
                      <span className="card-text price">Price: {price}</span>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        Posted on {postingTime}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
      <Bottom />
    </>
  );
};

export default ViewGotOrders;
