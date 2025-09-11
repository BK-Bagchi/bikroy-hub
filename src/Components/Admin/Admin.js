import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "../Top/Navbar";
import Bottom from "../Bottom/Bottom";
import PreviewAds from "./PreviewAds/PreviewAds";
import Disputes from "./DisputesDismiss/Disputes";
import PreviewOrders from "./PreviewOrders/PreviewOrders";
import useAuth from "../../Hooks/JWTDecode";

const Admin = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");

  const Logout = () => {
    logout();
    history.push("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <PreviewAds />;
      case "disputes":
        return <Disputes />;
      case "logout":
        return <Logout />;
      case "orders":
        return <PreviewOrders />;
      default:
        return <PreviewAds />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "80vh" }}>
          <aside className="col-md-3 col-lg-2 bg-light border-end p-3">
            <h5 className="mb-4">Admin Panel</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className={`btn w-100 text-start mb-2 ${
                    activeTab === "posts"
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => setActiveTab("posts")}
                >
                  Preview Posts
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn w-100 text-start mb-2 ${
                    activeTab === "orders" ? "btn-info" : "btn-outline-info"
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  Preview Orders
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn w-100 text-start mb-2 ${
                    activeTab === "disputes"
                      ? "btn-warning"
                      : "btn-outline-warning"
                  }`}
                  onClick={() => setActiveTab("disputes")}
                >
                  Disputes
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`btn w-100 text-start ${
                    activeTab === "logout" ? "btn-danger" : "btn-outline-danger"
                  }`}
                  onClick={() => setActiveTab("logout")}
                >
                  Logout
                </button>
              </li>
            </ul>
          </aside>
          <main className="col-md-9 col-lg-10 p-4">{renderContent()}</main>
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default Admin;
