import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Bottom from "../Bottom/Bottom";
import Navbar from "../Top/Navbar";
import Chat from "../Chat/Chat";

const BuyerOrderDetails = () => {
  const { orderId } = useParams();
  const history = useHistory();
  const [orderInfo, setOrderInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //prettier-ignore
        const response = await axios.get(`${API_BASE_URL}/order/getSpecificOrderInfo?orderId=${orderId}`);
        setOrderInfo(response.data);
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
        { status: `${status}`, person: "buyer" },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", response.data);
      if (status === "cancelled") {
        const dispute = await axios.patch(
          `${API_BASE_URL}/dispute/disputeManagement?orderId=${orderId}`,
          { reportedBy: "buyer", reason: "refund" },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Response:", dispute.data);
        alert("Order Cancelled and Refund Process Initiated Successfully");
        history.push("/viewMyOrders");
      } else if (status === "accepted") alert(`Order ${status} Successfully`);
      history.push("/viewMyOrders");
    } catch (error) {
      console.error("Error:", error);
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
        orderInfo.map((order) => {
          //prettier-ignore
          const { orderId, customerEmail:buyerEmail, sellerEmail, addInfo } = order;
          // prettier-ignore
          const { _id, photoURL, itemName, price, brand, category, description,  } = addInfo[0];
          return (
            <section className="show-ad container p-2" key={_id}>
              {/* <button
              className="accept-order"
              onClick={() => actionOnOrder(orderId, "ordered")}
            >
              Accept Order
            </button> */}
              {/* prettier-ignore */}
              <button className="decline-order" onClick={() => actionOnOrder(orderId, "cancelled")} >
                Cancel Order
              </button>
              {/* prettier-ignore */}
              <button  className="report-issue"  onClick={() => alert("Dispute Management Under Processing")} >
                Report Issue
              </button>
              <div className="ad-picture w-100 d-flex align-items-center justify-content-center">
                {/* prettier-ignore */}
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
                    <i className="bi bi-chat-dots me-2"></i> Chat with Seller
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
                        user="buyer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })
      )}
      <Bottom />
    </>
  );
};

export default BuyerOrderDetails;
