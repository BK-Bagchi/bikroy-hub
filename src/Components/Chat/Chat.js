import "./Chat.css";
const Chat = ({ buyerEmail, sellerEmail }) => {
  console.log(buyerEmail, sellerEmail);
  return (
    <div className="chat-box-2">
      {/* Header */}
      <div className="chat-header d-flex align-items-center px-3 py-2">
        <img
          src="https://i.pravatar.cc/40?img=5"
          alt="Seller"
          className="rounded-circle me-2"
        />
        <h6 className="mb-0">Seller Name</h6>
      </div>

      {/* Messages */}
      <div className="chat-messages p-3">
        <div className="message received mb-3">
          <p>Hello, how can I help you?</p>
          <span className="time">10:30 AM</span>
        </div>
        <div className="message sent mb-3">
          <p>Is this item still available?</p>
          <span className="time">10:31 AM</span>
        </div>
        <div className="message received mb-3">
          <p>Yes, it’s available.</p>
          <span className="time">10:32 AM</span>
        </div>
      </div>

      {/* Input */}
      <div className="chat-input d-flex p-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
        />
        <button className="btn btn-primary">
          <i className="bi bi-send"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
