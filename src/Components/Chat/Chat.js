import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.css";

// Connect to backend Socket.IO
const socket = io(process.env.REACT_APP_API_BASE_URL);
const Chat = ({ buyerEmail, sellerEmail, user }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  //   console.log(messages);

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
    if (!currentUserEmail || !partnerEmail) return;

    socket.emit("register", {
      email: currentUserEmail,
      partnerEmail,
    });
    socket.on("loadMessages", (msgs) => {
      setMessages(msgs);
      setShowLoader(false);
    });
    socket.on("privateMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    socket.on("loadProfile", (data) => {
      setUserInfo({
        buyerInfo: data.buyerInfo || {},
        sellerInfo: data.sellerInfo || {},
      });
    });
    return () => {
      socket.off("loadMessages");
      socket.off("privateMessage");
      socket.off("loadProfile");
    };
  }, [currentUserEmail, partnerEmail, user]);

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
    socket.emit("markRead", {
      buyerEmail,
      sellerEmail,
      reader: currentUserEmail,
    });
  }, [buyerEmail, sellerEmail, currentUserEmail]);

  return showLoader ? (
    <p className="text-center">Loading...</p>
  ) : (
    <div className="chat-box-2">
      {/* Header */}
      <div className="chat-header d-flex align-items-center px-3 py-2">
        {messages.length > 0 ? (
          (() => {
            const thisUser =
              currentUserEmail === userInfo.buyerInfo?.email
                ? userInfo.sellerInfo
                : userInfo.buyerInfo;

            return (
              <>
                {/* prettier-ignore */}
                <img src={thisUser?.photoURL} alt="User"  className="user-avatar-strong rounded-circle me-2" />
                <h6 className="mb-0">
                  {thisUser?.displayName || "Unknown User"}
                </h6>
              </>
            );
          })()
        ) : (
          <p>No previous message to show. Start conversation</p>
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
          messages.map((msg, index) => {
            const isCurrentUser = currentUserEmail === msg.sender;

            const profilePic = isCurrentUser
              ? userInfo.buyerInfo?.photoURL
              : userInfo.sellerInfo?.photoURL;

            return (
              // prettier-ignore
              <div className={`message ${ isCurrentUser ? "sent" : "received" } mb-3 d-flex align-items-start`} key={index} >
                {/* prettier-ignore */}
                <img src={profilePic} alt="User"  className="user-avatar rounded-circle me-2" />
                <div>
                  <p className="mb-1 msg-text">{msg.text}</p>
                  {/* prettier-ignore */}
                  <span className="text-muted date-text" style={{ fontSize: "0.75rem" }} >
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      {/* Input */}
      <div className="chat-input d-flex p-2">
        {/* prettier-ignore */}
        <input type="text" className="form-control me-2" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn btn-primary" onClick={handleSendMsg}>
          <i className="bi bi-send"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
