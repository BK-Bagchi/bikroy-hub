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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
                <th>Buyer</th>
                <th>Seller</th>
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
                        {
                          // prettier-ignore
                          <span className={`badge text-white px-4 py-2 my-1 ${ paymentMethod === "online" ? "bg-success" : "bg-info"  }`} >
                            {capitalizeFirstLetter(paymentMethod)}
                          </span>
                        }
                        {" & "}
                        {/* prettier-ignore */}
                        <span className={`badge text-white px-4 py-2 ${ paymentStatus ? "bg-success" : "bg-danger" }`} >
                          {paymentStatus ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td>
                        {/* prettier-ignore */}
                        <span className={`badge px-4 py-2 ${ shipmentStatus === "pending" ? "bg-warning" : shipmentStatus === "shipped" ? "bg-info" : "bg-success" }`} >
                          {capitalizeFirstLetter(shipmentStatus)}
                        </span>
                      </td>
                      <td>
                        {/* prettier-ignore */}
                        <span className={`badge text-white px-4 py-2 ${ orderStatusByBuyer === "ordered" ? "bg-info" : "bg-danger"  }`} >
                          {capitalizeFirstLetter(orderStatusByBuyer)}
                        </span>
                      </td>
                      <td>
                        {/* prettier-ignore */}
                        <span className={`badge text-white px-4 py-2 ${ orderStatusBySeller === "accepted" ? "bg-info" : orderStatusBySeller === "cancelled" ? "bg-danger" : "bg-secondary" }`} >
                          {capitalizeFirstLetter(orderStatusBySeller)}
                        </span>
                      </td>
                      <td>
                        {/* prettier-ignore */}
                        <span className={`badge text-white px-4 py-2 ${ orderStatusByAdmin === "running" ? "bg-info" : "bg-danger"  }`} >
                          {capitalizeFirstLetter(orderStatusByAdmin)}
                        </span>
                      </td>
                      <td>
                        {/* prettier-ignore */}
                        <button className="btn btn-sm btn-info my-1" onClick={() => handleAdminStatus(orderId, "running")} >
                          Running
                        </button>
                        {/* prettier-ignore */}
                        <button className="btn btn-sm btn-danger my-1" onClick={() => handleAdminStatus(orderId, "aborted")} >
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
