import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";

const ViewOrders = () => {
  const history = useHistory();

  const userEmail = localStorage.getItem("email");
  const [ordersInfo, setOrdersInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gotOrdersResponse = await axios.get(
          `${API_BASE_URL}/order/postedOrGotOrdersByABuyerOrSeller?userEmail=${userEmail}&person=buyer`
        );
        if (gotOrdersResponse.data)
          setOrdersInfo(gotOrdersResponse.data.response);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (userEmail) fetchData();
  }, [userEmail, API_BASE_URL]);

  // console.log(gotOrdersInfo);

  return (
    <>
      <Navbar />
      <section className="ads-home container">
        {showLoader ? (
          <p className="text-center">Loading...</p>
        ) : ordersInfo.length === 0 ? (
          <p>You have not placed any order</p>
        ) : (
          <>
            <p>Placed orders (click to see details)</p>
            <div className="card-group d-flex justify-content-center align-items-center">
              {[...ordersInfo].reverse().map((orderElements) => {
                //prettier-ignore
                const { _id: id, orderId, orderStatusBySeller, orderStatusByBuyer ,addsInfo } =
                  orderElements;
                const { itemName, price, photoURL, postingTime } = addsInfo[0];
                return orderStatusBySeller !== "cancelled" &&
                  orderStatusByBuyer !== "cancelled" ? (
                  // prettier-ignore
                  <div className="card" key={id} style={{ maxHeight: "440px", maxWidth: "230px" }} onClick={() => history.push(`/buyerOrderDetails/${orderId}`)} >
                    {/* prettier-ignore */}
                    <img  className="card-img-top" src={photoURL} alt="Card img cap" style={{ height: "300px" }} />
                    <div className="card-body">
                      <h5 className="card-title">{itemName}</h5>
                      <span className="card-text price">Price: {price}</span>
                      <p>
                        Buyer Status:{" "}
                        <span className="card-text price">
                          {orderStatusByBuyer.charAt(0).toUpperCase() +
                            orderStatusByBuyer.slice(1)}
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

export default ViewOrders;
