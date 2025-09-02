import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Top.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Top = () => {
  const history = useHistory();
  const [searchItem, setSearchItem] = useState("");

  const getSearchItem = (e) => {
    setSearchItem(e.target.value);
  };
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  const setSearch = (e) => {
    e.preventDefault();
    const formattedText = capitalizeFirstLetter(searchItem); //capitalize the first letter only
    localStorage.setItem("searchItem", formattedText);
    history.push("/search?searchItem=" + formattedText);
  };
  return (
    <>
      <Navbar />
      <section className="search-box mb-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <form className="d-flex">
                {/* prettier-ignore */}
                <input type="text" id="search" name="search"  className="form-control me-2" placeholder="Search by category" value={searchItem} onChange={getSearchItem} />
                {/* prettier-ignore */}
                <button type="submit" className="btn btn-primary" onClick={setSearch} >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Top;
