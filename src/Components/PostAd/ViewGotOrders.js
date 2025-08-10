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

  const orderElementsDetails = orders
    .map((order) => {
      const matchingItem = adsInfo.find((ad) => ad._id === order.productId);
      return {
        orderId: order.orderId || "qwerty12345",
        productId: order.productId || "qwerty12345",
        customerCredentials: order.customerCredentials,
        matchingItems: matchingItem || "qwerty12345",
      };
    })
    .filter((item) => item.matchingItems !== "qwerty12345");
  // console.log(orderElementsDetails);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/getPostedAddsByAnUser?userEmail=${userEmail}`)
      .then((response) => {
        // console.log('Response:', response.data);
        setAdsInfo(response.data.userAds);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error.message);
      });

    axios
      .get("http://localhost:4000/getOrdersInfo")
      .then((response) => {
        // console.log('Response:', response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error.message);
      });
  }, [userEmail]);
  //   console.log(orders, adsInfo)

  const viewOrderDetails = (orderId) => {
    history.push("/orderDetails");
  };

  return (
    <>
      <Navbar />
      <section className="ads-home container">
        {orderElementsDetails.length === 0 ? (
          <p>You have not get any order</p>
        ) : (
          <>
            <p>Got orders (click to see details, accept or refuse)</p>
            <div className="card-group d-flex justify-content-center">
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
