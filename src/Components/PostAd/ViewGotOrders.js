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
        order,
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

  return (
    <>
      <Navbar />
      <section className="ads-home container">
        {showLoader ? (
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : orderElementsDetails.length === 0 ? (
          <p>You have not received any order yet</p>
        ) : (
          <>
            <p>Got orders (click to see details, accept or refuse)</p>
            <div className="card-group d-flex justify-content-center align-items-center">
              {[...orderElementsDetails].reverse().map((orderElements) => {
                const { order, matchingItems } = orderElements;
                const { itemName, price, photoURL, postingTime } =
                  matchingItems;
                const { orderId, orderStatusByBuyer, orderStatusBySeller } =
                  order;
                return orderStatusByBuyer !== "cancelled" ? (
                  // prettier-ignore
                  <div className="card" key={orderId} style={{ maxHeight: "440px", maxWidth: "230px" }}
                    onClick={() =>
                      history.push(`/sellerOrderDetails/${orderId}`)
                    }
                  >
                    {/* prettier-ignore */}
                    <img className="card-img-top " src={photoURL} alt="Card img cap" style={{ height: "300px" }} />
                    <div className="card-body">
                      <h5 className="card-title">{itemName}</h5>
                      <span className="card-text price">Price: {price}</span>
                      <p>
                        Order Status:{" "}
                        <span className="card-text price">
                          {orderStatusBySeller.charAt(0).toUpperCase() +
                            orderStatusBySeller.slice(1)}
                        </span>
                      </p>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        Posted on {postingTime}
                      </small>
                    </div>
                  </div>
                ) : (
                  <></>
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
