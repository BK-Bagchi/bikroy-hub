import axios from "axios";
import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PreviewOrders = () => {
  //   const history = useHistory();
  const [orderInfo, setOrderInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //prettier-ignore
        const orderResponse = await axios.get( `${API_BASE_URL}/getOrdersInfo`);
        setOrderInfo(orderResponse.data);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [API_BASE_URL]);
  //   console.log(orderInfo);

  const handleAdminStatus = async (orderId, status) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/updateOrderStatusByPerson?orderId=${orderId}`,
        { status: `${status}`, person: "admin" },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", response.data);
      alert(`Order ${status} Successfully`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">📦 All Orders</h3>
      <div className="table-responsive">
        {showLoader ? (
          <p className="text-center">Loading...</p>
        ) : (
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>BuyerName</th>
                <th>Seller Name</th>
                <th>Payment Method & Status</th>
                <th>Shipment Status</th>
                <th>Buyer Status</th>
                <th>Seller Status</th>
                <th>Admin Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderInfo.length > 0 ? (
                orderInfo.map((order, index) => {
                  //prettier-ignore
                  const {_id, orderId, customerInfo, sellerInfo, orderStatusByBuyer, orderStatusBySeller, orderStatusByAdmin, paymentStatus, paymentMethod, shipmentStatus}= order
                  const { displayName: buyerName } = customerInfo[0];
                  const { displayName: sellerName } = sellerInfo[0];

                  return (
                    <tr key={_id}>
                      <td>{buyerName}</td>
                      <td>{sellerName}</td>
                      <td>
                        {paymentMethod}
                        {" & "}
                        <span
                          className={`badge px-4 py-2 ${
                            paymentStatus ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {paymentStatus ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge px-4 py-2 ${
                            shipmentStatus === "pending"
                              ? "bg-warning"
                              : shipmentStatus === "shipped"
                              ? "bg-info"
                              : "bg-success"
                          }`}
                        >
                          {shipmentStatus}
                        </span>
                      </td>
                      <td>{orderStatusByBuyer}</td>
                      <td>{orderStatusBySeller}</td>
                      <td>{orderStatusByAdmin}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info my-1"
                          onClick={() => handleAdminStatus(orderId, "running")}
                        >
                          Running
                        </button>
                        <button
                          className="btn btn-sm btn-danger my-1"
                          onClick={() => handleAdminStatus(orderId, "aborted")}
                        >
                          Abort
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No orders to show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PreviewOrders;
