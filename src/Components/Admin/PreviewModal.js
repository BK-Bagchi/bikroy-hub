import { Modal, Button } from "react-bootstrap";
import "./Admin.css";

const PreviewModal = ({ show, handleClose, post, updateAddStatus }) => {
  if (!post) return null;
  //prettier-ignore
  const { _id, brand, category, description,itemName, phoneNumber, photoURL, postingTime, price, status, userInfo } = post;
  const { displayName, email, phoneNumber: userPhoneNumber } = userInfo[0];

  return (
    // prettier-ignore
    <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="modal-fit-content">
        <Modal.Header closeButton>
            <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh !important", overflowY: "auto" }}>
            <div className="container">
            {/* Product Info */}
            <div className="card mb-3 border-primary">
                <div className="card-header bg-primary text-white">
                Product Info
                </div>
                <div className="card-body">
                <div className="row mb-2">
                    <div className="col-md-6">
                    <strong>Name:</strong> {itemName}
                    </div>
                    <div className="col-md-6">
                    <strong>Brand:</strong> {brand}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                    <strong>Category:</strong> {category}
                    </div>
                    <div className="col-md-6">
                    <strong>Price:</strong> {price}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                    <strong>Status:</strong> {status.charAt(0).toUpperCase() + status.slice(1)} {/* capitalize the first letter only */}
                    </div>
                    <div className="col-md-6">
                    <strong>Phone:</strong> {phoneNumber}
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-12">
                    <strong>Photo:</strong>{" "}
                    <img
                        src={photoURL}
                        alt={itemName}
                        className="img-fluid rounded"
                        style={{ maxHeight: "100px" }}
                    />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                    <strong>Description:</strong> {description}
                    </div>
                    <div className="col-md-6">
                    <strong>Posted At:</strong>{" "}
                    {new Date(postingTime).toLocaleString()}
                    </div>
                </div>
                </div>
            </div>

            {/* Author Info */}
            {userInfo && userInfo.length > 0 && (
                <div className="card border-success">
                <div className="card-header bg-success text-white">
                    Author Info
                </div>
                <div className="card-body">
                    <div className="row mb-2">
                    <div className="col-md-6">
                        <strong>Name:</strong> {displayName}
                    </div>
                    <div className="col-md-6">
                        <strong>Email:</strong> {email}
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <strong>Phone:</strong> {userPhoneNumber}
                    </div>
                    </div>
                </div>
                </div>
            )}
            <div className="d-flex justify-content-center">
                <Button className="mx-4 my-2" variant="success" onClick={() => updateAddStatus(_id, "approved")}>
                Approve
                </Button>
                <Button className="mx-4 my-2" variant="danger" onClick={() => updateAddStatus(_id, "rejected")}>
                Reject
                </Button>
                <Button className="mx-4 my-2" variant="secondary" onClick={handleClose}>
                Close
                </Button>
            </div>
            </div>
        </Modal.Body>
        </Modal>
  );
};

export default PreviewModal;
