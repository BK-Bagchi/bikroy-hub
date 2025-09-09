import { Table, Button } from "react-bootstrap";

const Disputes = () => {
  // Dummy disputes data
  const disputes = [
    { id: 1, user: "Alice", reason: "Payment issue", status: "Open" },
    { id: 2, user: "Bob", reason: "Product not delivered", status: "Resolved" },
    {
      id: 3,
      user: "Charlie",
      reason: "Fraudulent activity",
      status: "Pending",
    },
  ];

  return (
    <div>
      <h2 className="mb-4">⚠️ Handle Disputes</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Reported By</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((dispute, index) => (
            <tr key={dispute.id}>
              <td>{index + 1}</td>
              <td>{dispute.user}</td>
              <td>{dispute.user}</td>
              <td>{dispute.user}</td>
              <td>{dispute.reason}</td>
              <td>{dispute.status}</td>
              <td className="d-flex justify-content-center">
                {/* prettier-ignore */}
                <Button variant="info" size="sm" className="me-2" disabled={dispute.status === "Resolved"} >
                  Preview
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Disputes;
