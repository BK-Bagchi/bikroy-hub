import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const Posts = () => {
  const [postedAds, setPostedAds] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {postedAds.map((post, index) => {
                const { _id, category, itemName, price, userInfo } = post;
                const user = userInfo[0];

                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{itemName}</td>
                    <td>{user.displayName}</td>
                    <td>{category}</td>
                    <td>{price}</td>
                    <td className="d-flex justify-content-center">
                      <Button variant="info" size="sm" className="me-2 mr-1">
                        Preview
                      </Button>
                      <Button variant="danger" size="sm">
                        Reject
                      </Button>
                    </td>
                  </tr>
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
