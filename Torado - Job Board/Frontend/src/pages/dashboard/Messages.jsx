import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  Phone,
  Video,
  Info,
  ChevronLeft,
  Circle,
  Clock,
  CheckCircle2,
} from "lucide-react";

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const chatEndRef = useRef(null);

  const contacts = [
    {
      id: 1,
      name: "Darlene Robertson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darlene",
      lastMessage: "Will call you later...",
      time: "35 mins",
      unread: 3,
      status: "online",
      role: "UI/UX Designer",
    },
    {
      id: 2,
      name: "Devon Lane",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Devon",
      lastMessage: "How is it going?",
      time: "1 hour",
      unread: 0,
      status: "offline",
      role: "Product Manager",
    },
    {
      id: 3,
      name: "Albert Flores",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Albert",
      lastMessage: "Hello, I am Albert Flores...",
      time: "Yesterday",
      unread: 0,
      status: "online",
      role: "Frontend Developer",
    },
    {
      id: 4,
      name: "Bessie Cooper",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bessie",
      lastMessage: "I received the files.",
      time: "2 days ago",
      unread: 0,
      status: "offline",
      role: "Backend Architect",
    },
    {
      id: 5,
      name: "Arlene McCoy",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arlene",
      lastMessage: "Let's meet at 5.",
      time: "25 Jan",
      unread: 0,
      status: "online",
      role: "Data Scientist",
    },
    {
      id: 6,
      name: "Jane Cooper",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      lastMessage: "The project is on track.",
      time: "20 Jan",
      unread: 0,
      status: "offline",
      role: "DevOps Engineer",
    },
  ];

  const initialMessages = {
    1: [
      {
        id: 1,
        text: "Hello! How have you been?",
        sender: "contact",
        time: "10:00 AM",
      },
      {
        id: 2,
        text: "I'm doing great, thanks for asking. How about you?",
        sender: "me",
        time: "10:02 AM",
      },
      {
        id: 3,
        text: "I'm good. I wanted to discuss the new design requirements.",
        sender: "contact",
        time: "10:05 AM",
      },
      {
        id: 4,
        text: "Sure, let's dive into it. What are your thoughts on the dark mode implementation?",
        sender: "me",
        time: "10:07 AM",
      },
      {
        id: 5,
        text: "I think we should prioritize high contrast ratios for accessibility.",
        sender: "contact",
        time: "10:10 AM",
      },
      {
        id: 6,
        text: "Will call you later to discuss more details!",
        sender: "contact",
        time: "10:15 AM",
      },
    ],
    3: [
      {
        id: 1,
        text: "Hello, I am Albert Flores. Interested in the job posting.",
        sender: "contact",
        time: "Yesterday",
      },
      {
        id: 2,
        text: "Hi Albert! Glad to hear. Can you share your portfolio?",
        sender: "me",
        time: "Yesterday",
      },
    ],
  };

  const [chatMessages, setChatMessages] = useState(initialMessages);

  // Default select first contact
  useEffect(() => {
    if (!selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedContact, chatMessages]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedContact) return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
    }));
    setMessageText("");
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <h2 className="text-[22px] font-bold text-[#002333]">Messages</h2>
        <div className="text-[13px] text-slate-400 font-medium">
          <Link to="/" className="hover:text-[#5BBB7B] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to="/user-dashboard"
            className="hover:text-[#5BBB7B] transition-colors"
          >
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#5BBB7B]">Messages</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 bg-white rounded-[20px] shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        {/* Contacts Sidebar */}
        <div
          className={`w-full md:w-[350px] border-r border-slate-100 flex flex-col shrink-0 ${
            selectedContact && "hidden md:flex"
          }`}
        >
          <div className="p-6 border-b border-slate-100">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-[14px] focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                  selectedContact?.id === contact.id
                    ? "bg-[#5BBB7B]/5 border-l-4 border-l-[#5BBB7B]"
                    : "hover:bg-slate-50 border-l-4 border-l-transparent"
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={contact.image}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full border border-slate-100"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      contact.status === "online"
                        ? "bg-[#5BBB7B]"
                        : "bg-slate-300"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-[15px] font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors truncate">
                      {contact.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {contact.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] text-slate-400 truncate pr-2">
                      {contact.lastMessage}
                    </p>
                    {contact.unread > 0 && (
                      <span className="bg-[#5BBB7B] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div
          className={`flex-1 flex flex-col min-w-0 ${
            !selectedContact && "hidden md:flex"
          }`}
        >
          {selectedContact ? (
            <>
              {/* Context Header */}
              <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4 min-w-0">
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="md:hidden text-slate-400 hover:text-[#002333]"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="relative">
                    <img
                      src={selectedContact.image}
                      alt={selectedContact.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-100"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 border-white ${
                        selectedContact.status === "online"
                          ? "bg-[#5BBB7B]"
                          : "bg-slate-300"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[15px] md:text-[17px] font-bold text-[#002333]">
                      {selectedContact.name}
                    </h4>
                    <p className="text-[12px] text-slate-400 font-medium flex items-center gap-1.5">
                      {selectedContact.status === "online" ? (
                        <>
                          <Circle
                            size={8}
                            fill="#5BBB7B"
                            className="text-[#5BBB7B]"
                          />
                          Online
                        </>
                      ) : (
                        "Offline"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-3">
                  <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-400 flex items-center justify-center transition-all">
                    <Phone size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-400 flex items-center justify-center transition-all">
                    <Video size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-400 flex items-center justify-center transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Chat View */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar bg-slate-50/30">
                <div className="flex justify-center">
                  <span className="px-4 py-1.5 bg-white border border-slate-100 rounded-full text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Today
                  </span>
                </div>

                <AnimatePresence>
                  {(chatMessages[selectedContact.id] || []).map((msg, idx) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex ${
                        msg.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] md:max-w-[70%] ${
                          msg.sender === "me" ? "order-1" : "order-2"
                        }`}
                      >
                        <div
                          className={`p-4 rounded-[20px] text-[14px] md:text-[15px] leading-relaxed shadow-sm ${
                            msg.sender === "me"
                              ? "bg-[#5BBB7B] text-white rounded-tr-none"
                              : "bg-white text-[#002333] border border-slate-100 rounded-tl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div
                          className={`flex items-center gap-1.5 mt-2 text-[11px] font-medium text-slate-400 ${
                            msg.sender === "me"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <Clock size={12} />
                          {msg.time}
                          {msg.sender === "me" && (
                            <CheckCircle2
                              size={12}
                              className="text-[#5BBB7B]"
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 md:p-6 border-t border-slate-100 shrink-0">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-2 md:gap-4"
                >
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="w-10 h-10 md:w-11 md:h-11 rounded-xl hover:bg-slate-50 text-slate-400 flex items-center justify-center transition-all"
                    >
                      <Paperclip size={20} />
                    </button>
                    <button
                      type="button"
                      className="hidden sm:flex w-11 h-11 rounded-xl hover:bg-slate-50 text-slate-400 items-center justify-center transition-all"
                    >
                      <Smile size={20} />
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full pl-4 pr-12 py-3 md:py-3.5 bg-slate-50 border-none rounded-2xl text-[14px] md:text-[15px] focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#5BBB7B] text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-[#5BBB7B]/30 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-[#5BBB7B] mb-6">
                <Search size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#002333]">
                Your conversations
              </h3>
              <p className="text-slate-400 mt-2 max-w-sm">
                Select a contact from the list to start chatting. Your messages
                are private and secure.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
