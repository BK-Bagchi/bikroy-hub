import React, { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";

const Categories = () => {
  const [adsInfo, setAdsInfo] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchAddsInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getAddsInfo`);
        setAdsInfo(response.data);
        setShowLoader(false);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchAddsInfo();
  }, [API_BASE_URL]);

  // console.log(adsInfo)

  const countAdByCategory = adsInfo.reduce((acc, ad) => {
    const category = ad.category || "";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="container categories">
      <p className="text-center mt-2 mb-2 font-weight-bold">
        See items by Categories
      </p>
      <div className="row">
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <img
                className="card-icon"
                src={require(`../../Resources/images/mobile-icon.png`)}
                alt="mobile-icon"
              />
              <h5 className="card-title">Mobile</h5>
              <p className="card-text">
                {showLoader ? (
                  <div class="spinner-grow text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    Total Ads:{" "}
                    {countAdByCategory.Mobile ? (
                      <b>{countAdByCategory.Mobile}</b>
                    ) : (
                      <b>0</b>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <img
                className="card-icon"
                src={require(`../../Resources/images/electronics-icon.png`)}
                alt="electronics-icon"
              />
              <h5 className="card-title">Electronics</h5>
              <p className="card-text">
                {showLoader ? (
                  <div class="spinner-grow text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    Total Ads:{" "}
                    {countAdByCategory.Electronic ? (
                      <b>{countAdByCategory.Electronic}</b>
                    ) : (
                      <b>0</b>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <img
                className="card-icon"
                src={require(`../../Resources/images/vehicle-icon.jpeg`)}
                alt="vehicle-icon"
              />
              <h5 className="card-title">Vehicle</h5>
              <p className="card-text">
                {showLoader ? (
                  <div class="spinner-grow text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    Total Ads:{" "}
                    {countAdByCategory.Vehicle ? (
                      <b>{countAdByCategory.Vehicle}</b>
                    ) : (
                      <b>0</b>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body">
              <img
                className="card-icon"
                src={require(`../../Resources/images/laptop-icon.png`)}
                alt="laptop-icon"
              />
              <h5 className="card-title">Laptop</h5>
              <p className="card-text">
                {showLoader ? (
                  <div class="spinner-grow text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    Total Ads:{" "}
                    {countAdByCategory.Laptop ? (
                      <b>{countAdByCategory.Laptop}</b>
                    ) : (
                      <b>0</b>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
