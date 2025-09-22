import { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Chat from "../Chat/Chat";

const SellerOrderDetails = () => {
  const history = useHistory();
  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //prettier-ignore
        const orderResponse = await axios.get( `${API_BASE_URL}/order/getSpecificOrderInfo?orderId=${orderId}`);
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
        `${API_BASE_URL}/order/updateOrderStatusByPerson?orderId=${orderId}`,
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
        `${API_BASE_URL}/dispute/disputeManagement?orderId=${orderId}`,
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

  const updateShipmentStatus = async (orderId, status) => {
    !status && alert("Please Select Shipment Status");
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/order/updateShipmentStatusBySeller?orderId=${orderId}`,
        { status: `${status}` },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", response.data);
      alert(`${response.data.message} Successfully`); 
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
        const { _id, addInfo, orderCredentials, orderId, paymentMethod, customerEmail:buyerEmail, sellerEmail, shipmentStatus } = order;
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
            <select className="shipment-status" value={shipmentStatus} onChange={(e) => updateShipmentStatus(orderId, e.target.value)} >
              <option className="d-none" value={""}>Shipment Status Update</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
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
            <div className="d-flex align-items-center justify-content-center">
                <div className="d-flex justify-content-center my-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowChat(true)}
                  >
                    <i className="bi bi-chat-dots me-2"></i> Chat with Buyer
                  </button>
                </div>

                {/* Popup Modal */}
                {buyerEmail && sellerEmail && showChat && (
                  <div className="chat-modal">
                    <div className="chat-box bg-white p-4">
                      <button
                        className="chat-close btn-close float-end"
                        onClick={() => setShowChat(false)}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                      <Chat
                        buyerEmail={buyerEmail}
                        sellerEmail={sellerEmail}
                        user="seller"
                      />
                    </div>
                  </div>
                )}
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
