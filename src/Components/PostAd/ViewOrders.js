import React, { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import axios from "axios";

const ViewOrders = () => {
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
        matchingItems: matchingItem || "qwerty12345",
      };
    })
    .filter((item) => item.matchingItems !== "qwerty12345");
  // console.log(orderElementsDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, adsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/ordersByAnUser?userEmail=${userEmail}`),
          axios.get(`${API_BASE_URL}/getAddsInfo`),
        ]);

        if (ordersResponse.data) setOrders(ordersResponse.data.userOrders);
        if (adsResponse.data) setAdsInfo(adsResponse.data);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (userEmail) fetchData();
  }, [userEmail, API_BASE_URL]);

  //   console.log(orders, adsInfo)

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/deleteOrder?orderId=${orderId}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
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
          <p>You have not placed any order</p>
        ) : (
          <>
            <p>Placed orders(click to cancel)</p>
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
                    onClick={() => cancelOrder(orderId)}
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

export default ViewOrders;
