import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.css";

// Connect to backend Socket.IO
const socket = io(process.env.REACT_APP_API_BASE_URL);
const Chat = ({ buyerEmail, sellerEmail, user }) => {
  //   console.log(process.env.REACT_APP_API_BASE_URL);
  //   console.log(buyerEmail, sellerEmail, user);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (user === "buyer") {
      setCurrentUserEmail(buyerEmail);
      setPartnerEmail(sellerEmail);
    } else if (user === "seller") {
      setCurrentUserEmail(sellerEmail);
      setPartnerEmail(buyerEmail);
    }
  }, [buyerEmail, sellerEmail, user]);

  // On load: register user and load chat
  useEffect(() => {
    socket.emit("register", { email: currentUserEmail, partnerEmail });
    socket.on("loadMessages", (msgs) => {
      setMessages(msgs);
    });
    socket.on("privateMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("loadMessages");
      socket.off("privateMessage");
    };
  }, [currentUserEmail, partnerEmail]);

  // Send a new message
  const handleSendMsg = () => {
    if (!text.trim()) return;
    if (user === "buyer") {
      const sentMsg = {
        buyerEmail: currentUserEmail,
        sellerEmail: partnerEmail,
        sender: currentUserEmail,
        text,
      };
      socket.emit("privateMessage", sentMsg);
    } else if (user === "seller") {
      const sentMsg = {
        buyerEmail: partnerEmail,
        sellerEmail: currentUserEmail,
        sender: currentUserEmail,
        text,
      };
      socket.emit("privateMessage", sentMsg);
    }

    setText("");
  };

  // Mark messages as read when opening chat
  useEffect(() => {
    if (user === "buyer") {
      socket.emit("markRead", {
        buyerEmail: currentUserEmail,
        sellerEmail: partnerEmail,
        reader: currentUserEmail,
      });
    } else if (user === "seller") {
      socket.emit("markRead", {
        buyerEmail: partnerEmail,
        sellerEmail: currentUserEmail,
        reader: currentUserEmail,
      });
    }
  }, [currentUserEmail, partnerEmail, user]);

  return (
    <div className="chat-box-2">
      {/* Header */}
      <div className="chat-header d-flex align-items-center px-3 py-2">
        {messages.length > 0 ? (
          <>
            <img
              src="https://i.pravatar.cc/40?img=5"
              alt="Seller"
              className="rounded-circle me-2"
            />
            <h6 className="mb-0">Seller Name</h6>{" "}
          </>
        ) : (
          <p>No previous message to show. Start conversion</p>
        )}
      </div>

      {/* Messages */}
      <div className="chat-messages p-3">
        {/* <div className="message received mb-3">
          <p>Hello, how can I help you?</p>
          <span className="time">10:30 AM</span>
        </div>
        <div className="message sent mb-3">
          <p>Is this item still available?</p>
          <span className="time">10:31 AM</span>
        </div> */}
        {messages &&
          messages.map((msg, index) =>
            currentUserEmail === msg.sender ? (
              <div className="message sent mb-3" key={index}>
                <p>{msg.text}</p>
                <span>{new Date(msg.createdAt).toLocaleString()}</span>
              </div>
            ) : (
              <div className="message received mb-3" key={index}>
                <p>{msg.text}</p>
                <span>{new Date(msg.createdAt).toLocaleString()}</span>
              </div>
            )
          )}
      </div>

      {/* Input */}
      <div className="chat-input d-flex p-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSendMsg}>
          <i className="bi bi-send"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
