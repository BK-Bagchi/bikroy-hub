/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import "./AdsHome.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import useAuth from "../../Hooks/JWTDecode";

const AdsHome = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [adsInfo, setAdsInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const showAdsOnLoad = 5;
  const [adsToShow, setAdsToShow] = useState(showAdsOnLoad); //at start show how many ads
  const filterAccordingUser = user
    ? adsInfo.filter((ad) => ad.email !== user.email)
    : adsInfo;
  const filterAccordingAdminPreview = filterAccordingUser.filter(
    (ad) => ad.status === "approved"
  );
  const showAdsHome = filterAccordingAdminPreview.slice(-adsToShow).reverse();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchAdsInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/adds/getAddsInfo`);
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
      {showLoader ? (
        <p className="text-center">Loading...</p>
      ) : adsInfo.length > 0 ? (
        <p>Recently posted(click to see details)</p>
      ) : (
        <p>No ads to show</p>
      )}
      <div className="card-group d-flex justify-content-center">
        {showAdsHome.map((adsHome) => {
          const { _id, itemName, description, price, photoURL, postingTime } =
            adsHome;
          return (
            <div
              className="card mx-auto"
              key={_id}
              style={{
                maxHeight: "440px",
                maxWidth: "230px",
                minHeight: "400px",
                minWidth: "200px",
              }}
              onClick={() => {
                history.push(`/showAds/${_id}`);
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
      <div className="d-flex justify-content-center mt-3">
        {adsInfo.length > adsToShow && (
          <p
            className="see-more-ads mx-2"
            onClick={() => setAdsToShow(adsToShow + 2)}
          >
            See more
          </p>
        )}
      </div>
    </section>
  );
};

export default AdsHome;
