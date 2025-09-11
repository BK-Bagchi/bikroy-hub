import React, { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const SellerOrderDetails = () => {
  const history = useHistory();
  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //prettier-ignore
        const orderResponse = await axios.get( `${API_BASE_URL}/getSpecificOrderInfo?orderId=${orderId}`);
        setOrderInfo(orderResponse.data);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (orderId) fetchData();
  }, [API_BASE_URL, orderId]);

  // console.log(orderInfo);

  const actionOnOrder = async (orderId, status) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/updateOrderStatusByPerson?orderId=${orderId}`,
        { status: `${status}`, person: "seller" },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", response.data);

      alert(`Order ${status} Successfully`);
      history.push("/viewGotOrders");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const claimMoney = async (orderId) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/disputeManagement?orderId=${orderId}`,
        { reportedBy: "seller", reason: "claim_money" },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", response.data);

      alert(`Money Claimed Successfully`);
      history.push("/viewGotOrders");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      {
        showLoader?(
          <div className="loader">
            <p className="text-center">Loading...</p>
          </div>
        ):(
        orderInfo.map((order) => {
        const { _id, addInfo, orderCredentials, orderId, paymentMethod } = order;
        const { photoURL, itemName, price, brand, category, description } =
          addInfo[0];
        const { cus_name, cus_phone, ship_add1, total_amount } =
          orderCredentials;
        return (
          <section className="show-ad container p-2" key={_id}>
            {/* prettier-ignore */}
            <button className="accept-order" onClick={() => actionOnOrder(orderId, "accepted")} >
              Accept Order
            </button>
            {/* prettier-ignore */}
            <button className="decline-order" onClick={() => actionOnOrder(orderId, "cancelled")} >
              Cancel Order
            </button>
            {/* prettier-ignore */}
            {paymentMethod === "online" ? (
              <button className="report-issue" onClick={() => claimMoney(orderId)} >
              Claim Money
            </button>
            ):(
              <></>
            )}
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
                  <h6>Payment Method</h6>
                  <p>{paymentMethod.toUpperCase()}</p>
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
      })
        )
      }
      <Bottom />
    </>
  );
};

export default SellerOrderDetails;
