import React, { useEffect, useState } from "react";
import Categories from "../Categories/Categories";
import About from "../About/About";
import Bottom from "../Bottom/Bottom";
import Navbar from "../Top/Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Search = () => {
  const history = useHistory();
  const searchItemName = localStorage.getItem("searchItem");
  const [adsInfo, setAdsInfo] = useState([]);

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
  }, [searchItemName]);

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
                  imageURL,
                  postingTime,
                } = showSearch;

                return (
                  <div
                    className="card"
                    key={_id}
                    style={{ maxHeight: "440px", maxWidth: "230px" }}
                    onClick={() => {
                      localStorage.setItem("adId", _id);
                      history.push("/showAds");
                    }}
                  >
                    <img
                      className="card-img-top"
                      src={imageURL}
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
