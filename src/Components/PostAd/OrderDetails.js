import React, { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const OrderDetails = () => {
  const history = useHistory();

  const userEmail = localStorage.getItem("email");
  const [orders, setOrders] = useState([]);
  const [adsInfo, setAdsInfo] = useState([]);
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
      if (!userEmail) return;

      try {
        const [adsResponse, ordersResponse] = await Promise.all([
          axios.get(
            `${API_BASE_URL}/getPostedAddsByAnUser?userEmail=${userEmail}`
          ),
          axios.get(`${API_BASE_URL}/getOrdersInfo`),
        ]);

        setAdsInfo(adsResponse.data.userAds);
        setOrders(ordersResponse.data);
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
        `${API_BASE_URL}/deleteOrder?orderId= ${orderId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", response.data);
      window.location.reload();
      history.push("/viewGotOrders");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      {orderElementsDetails.map((orderElement) => {
        const { orderCredentials, matchingItems, orderId } = orderElement;
        const { cus_name, cus_phone, ship_add1, total_amount } =
          orderCredentials;
        const { _id, brand, category, description, photoURL, itemName, price } =
          matchingItems;
        return (
          <section className="show-ad container p-2" key={_id}>
            <button
              className="accept-order"
              onClick={() => history.push("/viewGotOrders")}
            >
              Accept Order
            </button>
            <button
              className="decline-order"
              onClick={() => cancelOrder(orderId)}
            >
              Decline Order
            </button>
            <button
              className="report-issue"
              onClick={() => alert("Dispute Management Under Processing")}
            >
              Report Issue
            </button>
            <div className="ad-picture w-100 d-flex align-items-center justify-content-center">
              <img className="picture w-25" src={photoURL} alt="Product pic" />
            </div>
            <div className="description d-flex flex-column align-items-center justify-content-center my-3">
              <p className="ad-name m-2">{itemName}</p>
              <div className="product-price">
                <p className="price">Tk. {price}</p>
              </div>
              <div className="details d-flex flex-wrap">
                <div>
                  <h6>Brand Name</h6>
                  <p>{brand}</p>
                </div>
                <div>
                  <h6>Model</h6>
                  <p>{itemName}</p>
                </div>
                <div>
                  <h6>Category</h6>
                  <p>{category}</p>
                </div>
                <div>
                  <h6>Customer Name</h6>
                  <p>{cus_name}</p>
                </div>
                <div>
                  <h6>Customer Phone</h6>
                  <p>{cus_phone}</p>
                </div>
                <div>
                  <h6>Shipping Address</h6>
                  <p>{ship_add1}</p>
                </div>
                <div>
                  <h6>Total paid amount</h6>
                  <p>Tk. {total_amount}</p>
                </div>
              </div>
              <div className="description">
                <h6 className="text-center">Product Description</h6>
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

export default OrderDetails;
