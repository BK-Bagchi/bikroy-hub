import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import PreviewModal from "./Modal";

const PreviewAds = () => {
  const [postedAds, setPostedAds] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const handleShow = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };
  const handleClose = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchPostedAds = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getAddsInfo`);
        setPostedAds(response.data);
        setShowLoader(false);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchPostedAds();
  }, [API_BASE_URL]);
  const updateAddStatus = async (adId, status) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateAddStatus`,
        { adId, status: `${status}` },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) alert(`Ad ${status} successfully.`);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  // console.log("postedAds:", postedAds);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <h2 className="mb-4">📑 Manage Posts</h2>
      <Table striped bordered hover responsive>
        {showLoader ? (
          <div>Loading...</div>
        ) : (
          <>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Seller</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {postedAds.map((post, index) => {
                // prettier-ignore
                const { _id, category, itemName, price, status, userInfo } = post;
                const { displayName } = userInfo[0];

                return (
                  <>
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{itemName}</td>
                      <td>{displayName}</td>
                      <td>{category}</td>
                      <td>{price}</td>
                      <td>
                        <span
                          className={`badge px-4 py-2 text-white ${
                            status === "approved"
                              ? "bg-success"
                              : status === "rejected"
                              ? "bg-danger"
                              : "bg-info"
                          }`}
                        >
                          {capitalizeFirstLetter(status)}
                        </span>
                      </td>
                      <td className="d-flex justify-content-center">
                        {/* prettier-ignore */}
                        <Button variant="info" size="sm" className="me-2 mr-1" onClick={() => handleShow(post)}>
                          Preview
                        </Button>
                        {/* prettier-ignore */}
                        <Button variant="danger" size="sm" onClick={() => updateAddStatus(_id, "rejected")}>
                          Reject
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
            {/* prettier-ignore */}
            <PreviewModal show={showModal} handleClose={handleClose} post={selectedPost} updateAddStatus={updateAddStatus} />
          </>
        )}
      </Table>
    </div>
  );
};

export default PreviewAds;
