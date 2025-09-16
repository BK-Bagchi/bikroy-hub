import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./Navbar";
import "./Top.css";
import Categories from "../Database/Categories";

const Top = () => {
  const history = useHistory();
  const [searchItem, setSearchItem] = useState("");

  const setSearch = (e) => {
    e.preventDefault();
    history.push(`/search?searchItem=${searchItem}`);
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
                {/* <input type="text" id="search" name="search"  className="form-control me-2" placeholder="Search by category" value={searchItem} onChange={getSearchItem} /> */}
                {/* prettier-ignore */}
                <select name="search" id="search" className="form-control me-2" onChange={(e)=> setSearchItem(e.target.value)} >
                  <option className="d-none">Search By Category</option>
                  {Categories.map((category) => (
                    <option key={category.id} value={category.type}>
                      {category.type}
                    </option>
                  ))}
                </select>
                {/* prettier-ignore */}
                <button type="submit" className="btn btn-primary" onClick={setSearch} >
                  <i className="bi bi-search"></i> Search
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
