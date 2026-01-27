import {
  Search,
  Trash2,
  Send,
  Frown,
  ChevronLeft,
  Copy,
  RotateCcw,
  CornerUpLeft,
  MoreVertical,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { USER_PROFILE } from "../../constants/userProfile";
import React, { useRef, useState, useLayoutEffect } from "react";

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isMobileChatActive, setIsMobileChatActive] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const highlightTimeoutRef = useRef(null);
  const startTimeoutRef = useRef(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Sheila Wolf",
      time: "30 min ago",
      preview:
        "Hello, Contrary to popular belief, Lorem Ipsum is not simply random text dolore...",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      messages: [
        {
          id: 1,
          sender: "them",
          avatar: "https://randomuser.me/api/portraits/women/45.jpg",
          text: "Hello, Contrary to popular belief, Lorem Ipsum is not simply belief random text. It has roots in a piece of.",
          time: "10:00 AM",
          date: "Today",
        },
        {
          id: 2,
          sender: "me",
          avatar: USER_PROFILE.avatar,
          text: "Hello! I received your message. How can I help you today?",
          time: "10:05 AM",
          date: "Today",
        },
      ],
    },
    {
      id: 2,
      name: "Rafael Jerde",
      time: "01.01.2025",
      preview:
        "Hello, Contrary to popular belief, Lorem Ipsum is not simply belief random text.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      messages: [
        {
          id: 1,
          sender: "them",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          text: "Hello, Contrary to popular belief, Lorem Ipsum is not simply belief random text. It has roots in a piece of.",
          time: "09:00 AM",
          date: "Jan 1, 2025",
        },
        {
          id: 2,
          sender: "me",
          avatar: USER_PROFILE.avatar,
          text: "Hello Rafael, thanks for reaching out. I'll get back to you soon.",
          time: "09:30 AM",
          date: "Jan 1, 2025",
        },
      ],
    },
    {
      id: 3,
      name: "Gavin Kutch",
      time: "Yesterday",
      preview: "I have some questions about the recent job posting...",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      messages: [
        {
          id: 1,
          sender: "them",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
          text: "Hi, I saw the Technical Architect position. Is it still open?",
          time: "02:15 PM",
          date: "Yesterday",
        },
        {
          id: 2,
          sender: "me",
          avatar: USER_PROFILE.avatar,
          text: "Hi Gavin, yes it is. Feel free to apply through the dashboard.",
          time: "02:30 PM",
          date: "Yesterday",
        },
      ],
    },
    {
      id: 4,
      name: "Aylin Kovacek",
      time: "Today",
      preview: "Thank you for the opportunity!",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      messages: [
        {
          id: 1,
          sender: "them",
          avatar: "https://randomuser.me/api/portraits/women/68.jpg",
          text: "I've just submitted my application for the UX Designer role.",
        },
        {
          id: 2,
          sender: "me",
          avatar: USER_PROFILE.avatar,
          text: "Great! Our team will review it and get back to you shortly.",
        },
      ],
    },
    {
      id: 5,
      name: "Rosetta Funk",
      time: "04.01.2025",
      preview: "Can we schedule a call for tomorrow?",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      messages: [
        {
          id: 1,
          sender: "them",
          avatar: "https://randomuser.me/api/portraits/women/12.jpg",
          text: "Hello, I'd like to discuss the project details in a quick call.",
        },
      ],
    },
  ];

  const [convoList, setConvoList] = useState(conversations);

  const currentChat =
    convoList.find((c) => c.id === activeConversation) || convoList[0];

  const filteredConversations = convoList.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedConvoList = convoList.map((conv) => {
      if (conv.id === activeConversation) {
        const newMessageObj = {
          id: Date.now(),
          sender: "me",
          avatar: USER_PROFILE.avatar,
          text: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: "Today",
        };

        if (replyTo) {
          newMessageObj.replyTo = {
            id: replyTo.id,
            sender: replyTo.sender,
            text: replyTo.text,
          };
        }

        return {
          ...conv,
          preview: newMessage,
          messages: [...conv.messages, newMessageObj],
        };
      }
      return conv;
    });

    setConvoList(updatedConvoList);
    setNewMessage("");
    setReplyTo(null);
  };

  const handleSelectConversation = (id) => {
    setActiveConversation(id);
    setIsMobileChatActive(true);
  };

  const handleDeleteConversation = () => {
    if (!currentChat) return;
    if (
      window.confirm(
        `Are you sure you want to delete the conversation with ${currentChat.name}?`
      )
    ) {
      const updatedList = convoList.filter((c) => c.id !== activeConversation);
      setConvoList(updatedList);
      if (updatedList.length > 0) {
        setActiveConversation(updatedList[0].id);
      } else {
        setActiveConversation(null);
      }
    }
  };

  const handleCopyMessage = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleJumpToMessage = (messageId) => {
    const element = document.getElementById(`msg-${messageId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
      }

      setHighlightedId(null);
      startTimeoutRef.current = setTimeout(() => {
        setHighlightedId(messageId);
        highlightTimeoutRef.current = setTimeout(() => {
          setHighlightedId(null);
        }, 2000);
      }, 50);
    }
  };

  const handleDeleteMessage = (messageId) => {
    const updatedConvoList = convoList.map((conv) => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          messages: conv.messages.filter((msg) => msg.id !== messageId),
        };
      }
      return conv;
    });
    setConvoList(updatedConvoList);
    setOpenMenuId(null);
  };

  const startEditing = (msg) => {
    setEditingId(msg.id);
    setEditValue(msg.text);
    setOpenMenuId(null);
  };

  const saveEdit = (messageId) => {
    if (!editValue.trim()) return;

    const updatedConvoList = convoList.map((conv) => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          messages: conv.messages.map((msg) =>
            msg.id === messageId ? { ...msg, text: editValue } : msg
          ),
        };
      }
      return conv;
    });
    setConvoList(updatedConvoList);
    setEditingId(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useLayoutEffect(() => {
    if (activeConversation) {
      scrollToBottom();
    }
  }, [currentChat?.messages, activeConversation]);

  // Auto-resize textarea
  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [newMessage]);

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-[22px] font-bold text-[#002333]">Message</h2>
          <span className="text-slate-200 hidden md:block">|</span>
          <div className="text-[14px] text-slate-400 font-medium flex items-center gap-2">
            <Link to="/" className="hover:text-[#5BBB7B] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/user-dashboard"
              className="hover:text-[#5BBB7B] transition-colors"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#5BBB7B]">Message</span>
          </div>
        </div>
      </div>

      {/* Main Messaging Container */}
      <div className="bg-white rounded-2xl border border-slate-100 flex overflow-hidden shadow-sm h-[850px] min-h-[600px]">
        {/* Left Column: Conversation List */}
        <div
          className={`${
            isMobileChatActive ? "hidden" : "flex"
          } lg:flex w-full lg:w-[40%] flex-col border-r border-slate-50 shrink-0 relative z-20 bg-white shadow-xl lg:shadow-none`}
        >
          {/* Search Header */}
          <div className="p-6 xl:p-8 border-b border-slate-50">
            <h4 className="text-[17px] font-bold text-[#002333] mb-6">
              Messages
            </h4>
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#5BBB7B] transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-xl text-[14px] font-medium focus:outline-none focus:bg-white focus:border-[#5BBB7B]/30 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredConversations.length > 0 ? (
              <AnimatePresence>
                {filteredConversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => handleSelectConversation(conv.id)}
                    className={`flex items-start gap-3 xl:gap-4 p-5 xl:p-6 border-b border-slate-50 cursor-pointer transition-all duration-300 hover:bg-slate-50/50 ${
                      activeConversation === conv.id ? "bg-slate-50/80" : ""
                    }`}
                  >
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-10 h-10 xl:w-11 xl:h-11 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5 xl:mb-1">
                        <h5 className="text-[14px] xl:text-[15px] font-bold text-[#002333] truncate">
                          {conv.name}
                        </h5>
                        <span className="text-[11px] xl:text-[12px] text-slate-400 font-medium shrink-0">
                          {conv.time}
                        </span>
                      </div>
                      <p className="text-[12px] xl:text-[13px] text-slate-500 font-medium truncate leading-tight">
                        {conv.preview}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="p-8 text-center">
                <p className="text-slate-400 text-[14px] font-medium">
                  No conversations found
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div
          className={`${
            isMobileChatActive ? "flex" : "hidden"
          } lg:flex w-full lg:w-[60%] flex-col min-w-0 relative z-10 bg-white overflow-hidden`}
        >
          {activeConversation ? (
            <>
              <div className="px-6 xl:px-8 py-4 xl:py-6 border-b border-slate-50 flex items-center justify-between min-h-[75px] xl:min-h-[85px]">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileChatActive(false);
                    }}
                    className="lg:hidden p-1.5 -ml-1.5 text-slate-400 hover:text-[#002333] transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div className="relative shrink-0">
                    <img
                      src={currentChat?.avatar}
                      alt={currentChat?.name}
                      className="w-8 h-8 xl:w-10 xl:h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[16px] xl:text-[17px] font-bold text-[#002333] truncate">
                      {currentChat?.name}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-3 xl:gap-5">
                  <button
                    onClick={handleDeleteConversation}
                    className="hidden sm:flex items-center gap-1.5 xl:gap-2 text-[#64748b] hover:text-red-500 transition-colors group shrink-0 whitespace-nowrap"
                  >
                    <Frown size={18} className="shrink-0" />
                    <span className="text-[12px] xl:text-[13px] font-bold">
                      Delete Conversation
                    </span>
                  </button>
                </div>
              </div>

              {/* Chat Messages History */}
              <div
                ref={chatContainerRef}
                className="flex-1 p-5 xl:p-8 overflow-y-auto custom-scrollbar bg-slate-50/20 flex flex-col"
              >
                <div className="mt-auto space-y-4 xl:space-y-6">
                  <AnimatePresence mode="popLayout">
                    {currentChat?.messages.map((msg, index) => {
                      // Date Separator Logic
                      const prevMsg = currentChat.messages[index - 1];
                      const nextMsg = currentChat.messages[index + 1];
                      const showDate = !prevMsg || prevMsg.date !== msg.date;

                      // Grouping Logic
                      const isNextMsgSameSender =
                        nextMsg && nextMsg.sender === msg.sender;
                      const isPrevMsgSameSender =
                        prevMsg && prevMsg.sender === msg.sender;

                      // Avatar: Show only if it's the last message of the group (or single message)
                      const showAvatar = !isNextMsgSameSender;

                      return (
                        <motion.div
                          key={msg.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className={`flex flex-col gap-1 ${
                            isNextMsgSameSender ? "mb-1" : "mb-4"
                          }`}
                        >
                          {showDate && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex justify-center my-6"
                            >
                              <span className="px-4 py-1.5 bg-white border border-slate-100 text-[#002333] text-[10px] xl:text-[11px] font-bold rounded-full uppercase tracking-[1px] shadow-sm">
                                {msg.date ===
                                new Date().toLocaleDateString("en-US", {
                                  weekday: "long",
                                })
                                  ? "Today"
                                  : msg.date}
                              </span>
                            </motion.div>
                          )}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              y: 0,
                            }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={`flex items-end gap-2 xl:gap-3 group/msg ${
                              msg.sender === "me"
                                ? "flex-row-reverse"
                                : "flex-row"
                            }`}
                          >
                            {/* Avatar Placeholder / Image */}
                            <div className="w-7 h-7 xl:w-9 xl:h-9 shrink-0 flex items-end">
                              {showAvatar ? (
                                <img
                                  src={msg.avatar}
                                  alt="avatar"
                                  className="w-full h-full rounded-full object-cover shadow-sm bg-white"
                                />
                              ) : (
                                <div className="w-full h-full" /> // Spacer
                              )}
                            </div>

                            <div
                              className={`flex flex-col gap-1.5 max-w-[85%] sm:max-w-[75%] relative ${
                                msg.sender === "me"
                                  ? "items-end"
                                  : "items-start"
                              }`}
                            >
                              <div
                                id={`msg-${msg.id}`}
                                className={`p-3.5 xl:p-4 rounded-2xl text-[13px] xl:text-[14px] leading-relaxed font-medium relative transition-all duration-300 shadow-sm ${
                                  highlightedId === msg.id
                                    ? "z-30 ring-4 ring-offset-4 ring-[#5BBB7B] shadow-[0_0_50px_rgba(91,187,123,0.3)] scale-[1.03] brightness-[1.02] bg-white !text-slate-600"
                                    : ""
                                } ${
                                  msg.sender === "me"
                                    ? `bg-[#5BBB7B] text-white shadow-[#5BBB7B]/10 ${
                                        isNextMsgSameSender
                                          ? "rounded-br-md"
                                          : "rounded-br-none"
                                      } ${
                                        isPrevMsgSameSender
                                          ? "rounded-tr-md"
                                          : ""
                                      }`
                                    : `bg-white border border-slate-100 text-slate-600 ${
                                        isNextMsgSameSender
                                          ? "rounded-bl-md"
                                          : "rounded-bl-none"
                                      } ${
                                        isPrevMsgSameSender
                                          ? "rounded-tl-md"
                                          : ""
                                      }`
                                }`}
                              >
                                {msg.replyTo && (
                                  <div
                                    onClick={() =>
                                      handleJumpToMessage(msg.replyTo.id)
                                    }
                                    className={`mb-3 p-3 rounded-xl text-[12px] border-l-4 leading-normal cursor-pointer hover:opacity-80 transition-opacity group/reply ${
                                      msg.sender === "me" &&
                                      highlightedId !== msg.id
                                        ? "bg-white/10 border-white/30 text-white/90"
                                        : "bg-slate-50 border-[#5BBB7B]/30 text-slate-500"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="font-bold opacity-80 uppercase text-[10px] tracking-wider">
                                        {msg.replyTo.sender === "me"
                                          ? "You"
                                          : currentChat?.name}
                                      </div>
                                      <CornerUpLeft
                                        size={12}
                                        className="opacity-40 group-hover/reply:opacity-100 transition-opacity"
                                      />
                                    </div>
                                    <div className="italic leading-relaxed">
                                      "{msg.replyTo.text}"
                                    </div>
                                  </div>
                                )}
                                {editingId === msg.id ? (
                                  <div className="flex flex-col gap-2 min-w-[200px]">
                                    <textarea
                                      value={editValue}
                                      onChange={(e) =>
                                        setEditValue(e.target.value)
                                      }
                                      className={`w-full p-0 text-[13px] xl:text-[14px] leading-relaxed font-medium focus:outline-none bg-transparent resize-none overflow-hidden ${
                                        msg.sender === "me"
                                          ? "text-white placeholder:text-white/70"
                                          : "text-slate-600 placeholder:text-slate-400"
                                      }`}
                                      rows={Math.max(
                                        2,
                                        Math.ceil(editValue.length / 40)
                                      )}
                                      autoFocus
                                    />
                                    <div className="flex items-center gap-2 justify-end">
                                      <button
                                        onClick={cancelEdit}
                                        className={`p-1 rounded-md transition-colors ${
                                          msg.sender === "me"
                                            ? "text-white/70 hover:text-white hover:bg-white/20"
                                            : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                                        }`}
                                      >
                                        <X size={14} />
                                      </button>
                                      <button
                                        onClick={() => saveEdit(msg.id)}
                                        className={`p-1 rounded-md transition-colors ${
                                          msg.sender === "me"
                                            ? "text-white hover:bg-white/20"
                                            : "text-[#5BBB7B] hover:bg-green-50"
                                        }`}
                                      >
                                        <Check size={14} />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  msg.text
                                )}

                                {/* Floating Hover Actions - Menu Trigger */}
                                <div
                                  className={`absolute top-1 opacity-0 group-hover/msg:opacity-100 transition-all duration-200 z-20 ${
                                    msg.sender === "me"
                                      ? "right-[calc(100%+8px)]"
                                      : "left-[calc(100%+8px)]"
                                  }`}
                                >
                                  <div className="relative">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuId(
                                          openMenuId === msg.id ? null : msg.id
                                        );
                                      }}
                                      className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#5BBB7B] hover:border-[#5BBB7B]/20 transition-all"
                                    >
                                      <MoreVertical size={14} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                      {openMenuId === msg.id && (
                                        <motion.div
                                          initial={{
                                            opacity: 0,
                                            scale: 0.95,
                                            y: 10,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                          }}
                                          exit={{
                                            opacity: 0,
                                            scale: 0.95,
                                            y: 10,
                                          }}
                                          className={`absolute bottom-full mb-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 min-w-[140px] z-50 ${
                                            msg.sender === "me"
                                              ? "right-0 origin-bottom-right"
                                              : "left-0 origin-bottom-left"
                                          }`}
                                        >
                                          <button
                                            onClick={() => {
                                              handleCopyMessage(
                                                msg.id,
                                                msg.text
                                              );
                                              setOpenMenuId(null);
                                            }}
                                            className="w-full px-3 py-2 text-left text-[13px] font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                          >
                                            <Copy size={13} /> Copy
                                          </button>
                                          <button
                                            onClick={() => {
                                              setReplyTo(msg);
                                              inputRef.current?.focus();
                                              setOpenMenuId(null);
                                            }}
                                            className="w-full px-3 py-2 text-left text-[13px] font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                          >
                                            <RotateCcw size={13} /> Reply
                                          </button>
                                          {msg.sender === "me" && (
                                            <>
                                              <div className="h-px bg-slate-50 my-1"></div>
                                              <button
                                                onClick={() =>
                                                  startEditing(msg)
                                                }
                                                className="w-full px-3 py-2 text-left text-[13px] font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                              >
                                                <Edit2 size={13} /> Edit
                                              </button>
                                              <button
                                                onClick={() =>
                                                  handleDeleteMessage(msg.id)
                                                }
                                                className="w-full px-3 py-2 text-left text-[13px] font-medium text-red-500 hover:bg-red-50 flex items-center gap-2"
                                              >
                                                <Trash2 size={13} /> Delete
                                              </button>
                                            </>
                                          )}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`text-[10px] xl:text-[11px] font-bold uppercase tracking-wider ${
                                    msg.sender === "me"
                                      ? "text-slate-400"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {msg.time}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Message Input Area */}
              <div className="p-0 border-t border-slate-50 flex flex-col relative bg-white">
                <AnimatePresence>
                  {replyTo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden bg-slate-50/80 border-b border-slate-100"
                    >
                      <div className="px-5 xl:px-8 py-4 flex items-start gap-4">
                        <div className="w-1.5 self-stretch bg-[#5BBB7B] rounded-full shrink-0 shadow-sm shadow-[#5BBB7B]/20"></div>
                        <div className="flex-1 min-w-0 py-1">
                          <div className="text-[11px] font-black text-[#5BBB7B] uppercase tracking-[1.5px] mb-1.5 flex items-center gap-2">
                            <RotateCcw size={12} />
                            Replying into context
                          </div>
                          <div className="text-[13px] text-slate-600 italic font-bold leading-relaxed">
                            "{replyTo.text}"
                          </div>
                        </div>
                        <button
                          onClick={() => setReplyTo(null)}
                          className="mt-1 p-2 text-slate-400 hover:text-red-500 hover:bg-white transition-all rounded-xl shadow-sm border border-transparent hover:border-red-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="p-5 xl:p-8 flex flex-col gap-4">
                  <textarea
                    ref={inputRef}
                    placeholder="Your Message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="w-full min-h-[60px] max-h-[200px] overflow-y-auto p-4 xl:p-6 bg-slate-50 border border-transparent rounded-xl text-[13px] xl:text-[14px] font-medium focus:outline-none focus:bg-white focus:border-[#5BBB7B]/30 transition-all resize-none placeholder:text-slate-400 custom-scrollbar"
                  ></textarea>
                  <div className="flex justify-start">
                    <button
                      onClick={handleSendMessage}
                      className="bg-[#5BBB7B] text-white px-6 xl:px-8 py-3 xl:py-3.5 rounded-lg font-bold text-[14px] xl:text-[15px] hover:bg-[#4a9d65] transition-all duration-300 w-full sm:w-fit flex items-center justify-center gap-2 shadow-lg shadow-[#5BBB7B]/20 overflow-hidden relative group"
                    >
                      <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
                      <span className="relative z-10 flex items-center gap-2">
                        Send Message <Send size={16} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/30">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200/50 mb-4">
                <Trash2 size={24} className="text-slate-300" />
              </div>
              <h4 className="text-[17px] font-bold text-[#002333] mb-2">
                No active conversation
              </h4>
              <p className="text-slate-400 text-[14px] font-medium max-w-[280px]">
                Select a contact from the list on the left to start messaging.
              </p>
            </div>
          )}
        </div>

        {/* Third Column: Removed as per user request */}
      </div>
    </div>
  );
};

export default Messages;
