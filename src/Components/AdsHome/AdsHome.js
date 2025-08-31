/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "./AdsHome.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const AdsHome = () => {
  const history = useHistory();
  const [adsInfo, setAdsInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [adsToShow, setAdsToShow] = useState(
    adsInfo.length > 5 ? 5 : adsInfo.length
  );
  const showAdsHome = adsInfo.slice(-adsToShow).reverse();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchAdsInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getAddsInfo`);
        setAdsInfo(response.data);
        setShowLoader(false);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchAdsInfo();
  }, [API_BASE_URL]);

  return (
    <section className="ads-home container">
      {adsInfo.length > 0 ? (
        <p>Recently posted(click to see details)</p>
      ) : (
        <p>No adds to show</p>
      )}
      <div className="card-group d-flex justify-content-center">
        {showAdsHome.map((adsHome) => {
          const { _id, itemName, description, price, photoURL, postingTime } =
            adsHome;
          if (showLoader)
            return (
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            );
          else {
            return (
              <div
                className="card"
                key={_id}
                style={{
                  maxHeight: "440px",
                  maxWidth: "230px",
                  minHeight: "400px",
                  minWidth: "200px",
                }}
                onClick={() => {
                  localStorage.setItem("adId", _id);
                  history.push("/showAds");
                }}
              >
                <img
                  className="card-img-top"
                  src={photoURL}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{itemName}</h5>
                  <p className="card-text">{description}</p>
                  <span className="card-text price">Price: {price}</span>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Posted on {postingTime}</small>
                </div>
              </div>
            );
          }
        })}
      </div>
      {adsInfo.length > 0 &&
        (adsInfo.length > adsToShow ? (
          <p
            className="see-more-ads"
            onClick={() => setAdsToShow(adsToShow + 2)}
          >
            See more
          </p>
        ) : (
          adsInfo.length > 5 && ( // show "See less" only if ads are more than 5
            <p className="see-more-ads" onClick={() => setAdsToShow(5)}>
              See less
            </p>
          )
        ))}
    </section>
  );
};

export default AdsHome;
