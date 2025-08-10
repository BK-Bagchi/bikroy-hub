/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "./AdsHome.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const AdsHome = () => {
  const history = useHistory();
  const [adsInfo, setAdsInfo] = useState([]);
  const [adsToShow, setAdsToShow] = useState(5);
  const showAdsHome = adsInfo.slice(-adsToShow).reverse();

  useEffect(() => {
    axios
      .get("https://bikroydotcom-server.onrender.com/getAddsInfo")
      .then((response) => {
        // console.log('Response:', response.data);
        setAdsInfo(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error.message);
      });
  }, []);
  // console.log(adsInfo)

  return (
    <section className="ads-home container">
      <p>Recently posted(click to see details)</p>
      <div className="card-group d-flex justify-content-center">
        {showAdsHome.map((adsHome) => {
          const { _id, itemName, description, price, photoURL, postingTime } =
            adsHome;

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
        })}
      </div>
      {adsInfo.length > adsToShow ? (
        <p className="see-more-ads" onClick={() => setAdsToShow(adsToShow + 2)}>
          See more
        </p>
      ) : (
        <p className="see-more-ads" onClick={() => setAdsToShow(5)}>
          See less
        </p>
      )}
    </section>
  );
};

export default AdsHome;
