import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Send, ArrowLeft, User, Reply, Copy, X, Trash2 } from "lucide-react";
import { messageAPI, userAPI } from "../../services/api";

const Chat = ({ userId: propUserId, className = "" }) => {
  const { userId: paramUserId } = useParams();
  const userId = propUserId || paramUserId;

  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [chatPartner, setChatPartner] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper function for smart date formatting
  const formatMessageDate = (date) => {
    const msgDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time to compare dates only
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    msgDate.setHours(0, 0, 0, 0);

    if (msgDate.getTime() === today.getTime()) {
      return "Today";
    } else if (msgDate.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      return msgDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return; // Wait for ID

        const [profile, partner, conversation] = await Promise.all([
          userAPI.getProfile(),
          userAPI.getById(userId),
          messageAPI.getConversation(userId),
        ]);
        setCurrentUser(profile);
        setChatPartner(partner);
        setMessages(conversation || []);
      } catch (error) {
        console.error("Failed to load chat:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Optimistic update (optional, but good for UX)
      // For now, let's just wait for server response to keep it simple and consistent
      const sentMessage = await messageAPI.send(
        userId,
        newMessage,
        replyingTo?._id,
      );
      setMessages([...messages, sentMessage]);
      setNewMessage("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message");
    }
  };

  // Create a ref for the input element
  const inputRef = useRef(null);

  const handleReply = (msg) => {
    setReplyingTo(msg);
    inputRef.current?.focus();
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    setShowCopiedToast(true);
    setTimeout(() => setShowCopiedToast(false), 2000);
  };

  const handleScrollToMessage = (messageId) => {
    const element = document.getElementById(`message-${messageId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedMessageId(messageId);
      // Remove highlight after 2 seconds
      setTimeout(() => setHighlightedMessageId(null), 2000);
    }
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      await messageAPI.delete(messageId);
      // Remove message from local state
      setMessages(messages.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error("Failed to delete message:", error);
      alert("Failed to delete message");
    }
  };

  if (loading) return <div className="p-12 text-center">Loading chat...</div>;

  return (
    <>
      {/* Toast Notification */}
      {showCopiedToast && (
        <div className="fixed top-4 right-4 bg-[#5BBB7B] text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          ✓ Copied to clipboard!
        </div>
      )}

      <div
        className={`flex flex-col h-[calc(100vh-140px)] bg-white rounded-[20px] shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden ${className}`}
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
          <Link
            to="/user-dashboard/messages"
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
            {chatPartner?.image ? (
              <img
                src={
                  chatPartner.image.startsWith("http")
                    ? chatPartner.image
                    : `http://localhost:5001${chatPartner.image}`
                }
                alt={chatPartner.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={20} className="text-slate-400" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-[#002333]">
              {chatPartner?.name || "User"}
            </h3>
            <p className="text-xs text-slate-500">
              {chatPartner?.role === "employer"
                ? "Employer"
                : chatPartner?.role === "candidate"
                  ? "Candidate"
                  : chatPartner?.jobTitle || "User"}
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.length === 0 ? (
            <div className="text-center text-slate-400 mt-10">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMe = msg.senderId === currentUser?._id;
              return (
                <div
                  id={`message-${msg._id}`}
                  key={msg._id || index}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"} group mb-1 transition-all duration-300 ${highlightedMessageId === msg._id ? "scale-105" : ""}`}
                >
                  <div
                    className={`flex items-end gap-2 max-w-[85%] ${isMe ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Message Bubble */}
                    <div
                      className={`relative p-3 rounded-2xl text-sm transition-all duration-300 ${
                        highlightedMessageId === msg._id
                          ? isMe
                            ? "bg-[#4ea86b] text-white rounded-tr-none border-2 border-[#5BBB7B]"
                            : "bg-green-50 text-slate-600 shadow-lg rounded-tl-none border-2 border-[#5BBB7B]"
                          : isMe
                            ? "bg-[#5BBB7B] text-white rounded-tr-none"
                            : "bg-white text-slate-600 shadow-sm rounded-tl-none border border-slate-100"
                      }`}
                    >
                      {/* Quoted Reply */}
                      {msg.replyTo && msg.replyTo.content && (
                        <div
                          onClick={() => handleScrollToMessage(msg.replyTo._id)}
                          className={`mb-2 p-2 rounded-lg text-xs cursor-pointer hover:opacity-80 transition-opacity ${isMe ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}
                          title="Click to view original message"
                        >
                          <p className="font-bold mb-0.5">
                            {msg.replyTo.senderId === currentUser?._id
                              ? "You"
                              : chatPartner?.name}
                          </p>
                          <p className="truncate line-clamp-1">
                            {msg.replyTo.content}
                          </p>
                        </div>
                      )}

                      <p>{msg.content}</p>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span
                          className={`text-[10px] ${
                            isMe ? "text-green-100" : "text-slate-400"
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span
                          className={`text-[9px] ${
                            isMe ? "text-green-200" : "text-slate-300"
                          }`}
                        >
                          {formatMessageDate(msg.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Actions (Hidden by default, shown on hover) */}
                    <div
                      className={`flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div className="relative group/btn">
                        <button
                          onClick={() => handleReply(msg)}
                          className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-[#5BBB7B]"
                        >
                          <Reply size={14} />
                        </button>
                        <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          Reply
                        </span>
                      </div>

                      <div className="relative group/btn">
                        <button
                          onClick={() => handleCopy(msg.content)}
                          className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-[#5BBB7B]"
                        >
                          <Copy size={14} />
                        </button>
                        <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          Copy
                        </span>
                      </div>

                      {/* Delete button - only for own messages */}
                      {isMe && (
                        <div className="relative group/btn">
                          <button
                            onClick={() => handleDelete(msg._id)}
                            className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Delete
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-100 bg-white">
          {replyingTo && (
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <Reply size={14} className="text-[#5BBB7B] shrink-0" />
                <div className="text-xs text-slate-600 truncate">
                  <span className="font-bold text-[#5BBB7B]">
                    Replying to{" "}
                    {replyingTo.senderId === currentUser?._id
                      ? "yourself"
                      : chatPartner?.name}
                    :
                  </span>{" "}
                  {replyingTo.content}
                </div>
              </div>
              <button
                onClick={() => setReplyingTo(null)}
                className="p-1 hover:bg-slate-200 rounded-full"
              >
                <X size={14} className="text-slate-500" />
              </button>
            </div>
          )}
          <form onSubmit={handleSend} className="p-4">
            <div className="flex gap-4">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-3 bg-[#5BBB7B] text-white rounded-xl hover:bg-[#4ea86b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
