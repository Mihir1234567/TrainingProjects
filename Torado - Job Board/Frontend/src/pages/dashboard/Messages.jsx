import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, User } from "lucide-react";
import { messageAPI } from "../../services/api";

const Messages = () => {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const data = await messageAPI.getInbox();
        setInbox(data);
      } catch (error) {
        console.error("Failed to fetch inbox", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInbox();
  }, []);

  if (loading) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

      <div className="bg-white rounded-[20px] p-6 shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 min-h-[400px]">
        {inbox.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <MessageCircle size={40} />
            </div>
            <h3 className="text-xl font-bold text-[#002333] mb-2">
              No Messages
            </h3>
            <p className="text-slate-500 max-w-md mx-auto text-center">
              You haven't started any conversations yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {inbox.map((user) => (
              <div
                key={user._id}
                className="py-4 flex items-center gap-4 hover:bg-slate-50 px-4 rounded-lg cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                  {user.image ? (
                    <img
                      src={user.image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={24} className="text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#002333]">{user.name}</h4>
                  <p className="text-sm text-slate-500">
                    {user.jobTitle || "User"}
                  </p>
                </div>
                <Link
                  to={`/messages/${user._id}`}
                  className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-[#5BBB7B] hover:text-white transition-colors"
                >
                  View Chat
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
