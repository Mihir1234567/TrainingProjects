import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, User, MessageCircle, Download, X, Send } from "lucide-react";
import { bookmarkAPI, messageAPI, API_BASE_URL } from "../../services/api";

const BookmarkResumes = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Message Modal State
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      // In a real app, this would filter by type 'User' (Candidate) if strictly "Bookmark Resumes"
      // For now fetching all bookmarks
      try {
        const data = await bookmarkAPI.getAll();
        setBookmarks(data);
      } catch (error) {
        console.error("Failed to fetch bookmarks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  // Handle message candidate - Open modal
  const handleMessage = (candidate) => {
    setSelectedCandidate(candidate);
    setIsMessageModalOpen(true);
    setMessageContent("");
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      alert("Please enter a message");
      return;
    }

    setSendingMessage(true);
    try {
      await messageAPI.send(selectedCandidate._id, messageContent);
      alert("Message sent successfully!");
      setIsMessageModalOpen(false);
      setMessageContent("");
      setSelectedCandidate(null);
    } catch (error) {
      console.error("Failed to send message:", error);
      alert(error.message || "Failed to send message. Please try again.");
    } finally {
      setSendingMessage(false);
    }
  };

  // Handle download CV
  const handleDownloadCV = async (candidate) => {
    try {
      // First, check if candidate has a dashboard-created resume
      const response = await fetch(
        `http://localhost:5001/api/resumes?userId=${candidate._id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("torado_user") || sessionStorage.getItem("torado_user") || "{}").token}`,
          },
        },
      );

      if (response.ok) {
        const resumes = await response.json();
        if (resumes && resumes.length > 0) {
          // Navigate to resume viewer for the first resume
          window.open(`/resume-viewer/${resumes[0]._id}`, "_blank");
          return;
        }
      }
    } catch (error) {
      console.error("Error checking for dashboard resumes:", error);
    }

    if (!candidate.resumeUrl) {
      alert("This candidate hasn't uploaded a resume yet.");
      return;
    }

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = `${API_BASE_URL}${candidate.resumeUrl}`;
    link.download = `${candidate.name.replace(/\s+/g, "_")}_Resume.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold text-[#002333]">
          Bookmark Resumes
        </h2>
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
          <span className="text-[#5BBB7B]">Bookmark Resumes</span>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-6 shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 min-h-[400px]">
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <Bookmark size={40} />
            </div>
            <h3 className="text-xl font-bold text-[#002333] mb-2">
              No Bookmarks Found
            </h3>
            <p className="text-slate-500 max-w-md mx-auto text-center">
              You haven't saved any candidates yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((b) => (
              <div
                key={b._id}
                className="border border-slate-100 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    {b.targetId?.image ? (
                      <img
                        src={b.targetId.image}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={24} className="text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002333]">
                      {b.targetId?.name || "Unknown User"}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {b.targetId?.jobTitle || "Candidate"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Link
                      to={
                        b.targetModel === "Job"
                          ? `/job/${b.targetId?._id}`
                          : `/candidate-details/${b.targetId?._id}`
                      }
                      className="flex-1 bg-slate-100 text-[#002333] py-2 rounded-lg text-sm font-semibold text-center hover:bg-slate-200 transition-colors"
                    >
                      View Profile
                    </Link>
                    <button className="px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                      <Bookmark size={18} fill="currentColor" />
                    </button>
                  </div>

                  {b.targetModel === "User" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMessage(b.targetId)}
                        className="flex-1 py-2 bg-[#5BBB7B] text-white rounded-lg text-sm font-semibold hover:bg-[#4ea66c] transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={16} /> Message
                      </button>
                      <button
                        onClick={() => handleDownloadCV(b.targetId)}
                        className="px-3 py-2 bg-[#5BBB7B]/10 text-[#5BBB7B] rounded-lg hover:bg-[#5BBB7B]/20 transition-colors"
                        title="Download CV"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Modal */}
      {isMessageModalOpen && selectedCandidate && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
            onClick={() => setIsMessageModalOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-lg shadow-2xl w-full max-w-lg pointer-events-auto transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      selectedCandidate.image ||
                      "https://via.placeholder.com/150"
                    }
                    alt={selectedCandidate.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#002333]">
                      Send Message
                    </h3>
                    <p className="text-sm text-[#5E6670]">
                      To: {selectedCandidate.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMessageModalOpen(false)}
                  className="p-2 bg-slate-50 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <label className="block text-sm font-bold text-[#002333] mb-3">
                  Your Message
                </label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                  className="w-full bg-[#F9FBFC] border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#5BBB7B] transition-colors resize-none"
                  disabled={sendingMessage}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-6 border-t border-slate-100">
                <button
                  onClick={() => setIsMessageModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-200 transition-colors"
                  disabled={sendingMessage}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={sendingMessage || !messageContent.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#5BBB7B] text-white px-4 py-2.5 rounded-md text-sm font-medium transition-all relative overflow-hidden z-10 before:absolute before:inset-0 before:bg-[#002333] before:origin-center before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 before:-z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingMessage ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookmarkResumes;
