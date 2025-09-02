import React, { useEffect, useState } from "react";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ViewPostedAds = () => {
  const history = useHistory();

  const userEmail = localStorage.getItem("email");
  const [postedAds, setPostedAds] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchPostedAds = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getPostedAddsByAnUser?userEmail=${userEmail}`
        );
        setPostedAds(response.data.userAds);
        setShowLoader(false);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    if (userEmail) fetchPostedAds();
  }, [userEmail, API_BASE_URL]);

  // console.log(postedAds)

  return (
    <>
      <Navbar />
      <section className="ads-home container">
        {showLoader ? (
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : postedAds.length === 0 ? (
          <p>You have not posted any ads</p>
        ) : (
          <>
            <p>Posted ads (click to edit or delete)</p>
            <div className="card-group d-flex justify-content-center align-items-center">
              {[...postedAds].reverse().map((postedAdsByAnUser) => {
                const {
                  _id,
                  itemName,
                  description,
                  price,
                  photoURL,
                  postingTime,
                } = postedAdsByAnUser;

                return (
                  <div
                    className="card"
                    key={_id}
                    style={{ maxHeight: "440px", maxWidth: "230px" }}
                    onClick={() => {
                      localStorage.setItem("adId", _id);
                      history.push("/editPostedAds");
                    }}
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

export default ViewPostedAds;
