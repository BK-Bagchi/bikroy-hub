import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const Disputes = () => {
  const [disputes, setDisputes] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getDisputesInfo`);
        setDisputes(response.data);
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching disputes:", error);
      }
    };
    fetchDisputes();
  }, [API_BASE_URL]);
  console.log(disputes);

  const handelDispute = (_id, reason) => {
    // console.log(_id, reason);
    alert(`${reason.toUpperCase()} Under Process`);
    window.confirm(`${reason.toUpperCase()} Under Process`);
  };

  return (
    <div>
      <h2 className="mb-4">⚠️ Handle Disputes</h2>
      {showLoader ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Report</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((disputeItems, index) => {
              // prettier-ignore
              const { _id, customerInfo, dispute, sellerInfo } = disputeItems
              const { displayName: buyerName } = customerInfo[0];
              const { displayName: sellerName } = sellerInfo[0];
              const { status, report } = dispute;
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{buyerName}</td>
                  <td>{sellerName}</td>
                  <td>
                    <table className="table table-bordered mb-0">
                      <thead>
                        <tr>
                          <th>Reported By</th>
                          <th>Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.map((r, i) => (
                          <tr key={i}>
                            <td>{r.reportedBy}</td>
                            {r.reason === "refund" ? (
                              <td>
                                <span>Refund </span>
                                {/* prettier-ignore */}
                                <Button variant="success"  size="sm" onClick={() => {
                                    handelDispute(_id, r.reason);
                                  }}
                                >
                                  Refund
                                </Button>
                              </td>
                            ) : r.reason === "claim_money" ? (
                              <td>
                                <span>Claim Money </span>
                                {/* prettier-ignore */}
                                <Button variant="warning" size="sm" onClick={() => {
                                    handelDispute(_id, r.reason);
                                  }}
                                >
                                  Claim Money
                                </Button>
                              </td>
                            ) : (
                              r.reason
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>{status}</td>
                  <td className="d-flex justify-content-center">
                    {/* prettier-ignore */}
                    <Button variant="info" size="sm" className="me-2" disabled={dispute.status === "Resolved"} >
                  Preview
                  </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Disputes;
