import React, { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ViewOrders = () => {
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
        orderStatus: order.orderStatusByBuyer || "ordered",
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

  // console.log(orders, adsInfo);

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
            <p>Placed orders (click to see details)</p>
            <div className="card-group d-flex justify-content-center align-items-center">
              {[...orderElementsDetails].reverse().map((orderElements) => {
                const { matchingItems, orderStatus } = orderElements;
                //prettier-ignore
                const { _id: id, itemName, description, price, photoURL, postingTime } =
                  matchingItems;
                return (
                  <div
                    className="card"
                    key={id}
                    style={{ maxHeight: "440px", maxWidth: "230px" }}
                    onClick={() => history.push(`/buyerOrderDetails/${id}`)}
                  >
                    <img
                      className="card-img-top"
                      src={photoURL}
                      alt="Card img cap"
                      style={{ height: "300px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{itemName}</h5>
                      <p className="card-text">{description}</p>
                      <span className="card-text price">Price: {price}</span>
                      <p>
                        Order Status:{" "}
                        <span className="card-text price">
                          {orderStatus.charAt(0).toUpperCase() +
                            orderStatus.slice(1)}
                        </span>
                      </p>
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
