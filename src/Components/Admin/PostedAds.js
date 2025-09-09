import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import PreviewModal from "./PreviewModal";

const Posts = () => {
  const [postedAds, setPostedAds] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
  const acceptAd = async (adId) => {
    console.log("adId", adId);
    // try {
    //   const response = await axios.post(
    //     `${API_BASE_URL}/acceptAdd?adId=${adId}`,
    //     {},
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    //   if (response) alert("Add accepted successfully.");
    // } catch (error) {
    //   console.error("Error:", error.message);
    // }
  };
  const deleteAd = async (adId) => {
    console.log("adId", adId);
    // try {
    //   const response = await axios.post(
    //     `${API_BASE_URL}/deleteAdd?adId=${adId}`,
    //     {},
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    //   if (response) alert("Add deleted successfully.");
    // } catch (error) {
    //   console.error("Error:", error.message);
    // }
  };
  // console.log("postedAds:", postedAds);

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
                <th>Author</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {postedAds.map((post, index) => {
                const { _id, category, itemName, price, userInfo } = post;
                const user = userInfo[0];

                return (
                  <>
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{itemName}</td>
                      <td>{user.displayName}</td>
                      <td>{category}</td>
                      <td>{price}</td>
                      <td>Pending</td>
                      <td className="d-flex justify-content-center">
                        {/* prettier-ignore */}
                        <Button variant="info" size="sm" className="me-2 mr-1" onClick={handleShow}>
                          Preview
                        </Button>
                        <Button variant="danger" size="sm">
                          Reject
                        </Button>
                      </td>
                    </tr>
                    {/* prettier-ignore */}
                    <PreviewModal show={showModal} handleClose={handleClose} post={post} acceptAd={acceptAd} deleteAd={deleteAd} />
                  </>
                );
              })}
            </tbody>
          </>
        )}
      </Table>
    </div>
  );
};

export default Posts;
