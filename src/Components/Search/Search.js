import React, { useEffect, useState } from "react";
import Categories from "../Categories/Categories";
import About from "../About/About";
import Bottom from "../Bottom/Bottom";
import Navbar from "../Top/Navbar";
import axios from "axios";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchItemName = queryParams.get("searchItem");
  const [adsInfo, setAdsInfo] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchAddsInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getAddsInfo`);
        setAdsInfo(response.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    if (searchItemName) fetchAddsInfo();
  }, [searchItemName, API_BASE_URL]);

  const searchItemDetails = adsInfo.filter(
    (add) => add.category === searchItemName
  );

  return (
    <>
      <Navbar />
      <section className="ads-home container">
        <p>Showing results of category: "{searchItemName}"</p>
        {searchItemDetails && searchItemDetails.length > 0 ? (
          <>
            <div className="card-group d-flex justify-content-center">
              {searchItemDetails.map((showSearch) => {
                const {
                  _id,
                  itemName,
                  description,
                  price,
                  photoURL,
                  postingTime,
                } = showSearch;

                return (
                  <div
                    className="card"
                    key={_id}
                    style={{ maxHeight: "440px", maxWidth: "230px" }}
                    onClick={() => {
                      history.push(`/showAds/${_id}`);
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
        ) : (
          <p>No data found for the category of: "{searchItemName}"</p>
        )}
      </section>
      ;
      <Categories />
      <About />
      <Bottom />
    </>
  );
};

export default Search;
