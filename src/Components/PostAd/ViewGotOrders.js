import React, { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ViewGotOrders = () => {
  const history = useHistory();

  const [ordersInfo, setOrdersInfo] = useState([]);
  const userEmail = localStorage.getItem("email");
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gotOrdersResponse = await axios.get(
          `${API_BASE_URL}/postedOrGotOrdersByABuyerOrSeller?userEmail=${userEmail}&person=seller`
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

  //   console.log(orders, adsInfo)

  return (
    <>
      <Navbar />
      <section className="ads-home container">
        {showLoader ? (
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : ordersInfo.length === 0 ? (
          <p>You have not received any order yet</p>
        ) : (
          <>
            <p>Got orders (click to see details, accept or refuse)</p>
            <div className="card-group d-flex justify-content-center align-items-center">
              {[...ordersInfo].reverse().map((orderElements) => {
                // prettier-ignore
                const { orderStatusBySeller, orderStatusByBuyer, orderId, addsInfo } = orderElements;
                const { _id, itemName, price, photoURL, postingTime } =
                  addsInfo[0];
                return orderStatusByBuyer !== "cancelled" ? (
                  // prettier-ignore
                  <div className="card" key={_id} style={{ maxHeight: "440px", maxWidth: "230px" }}
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
                        Seller Status:{" "}
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
