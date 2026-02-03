import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, User } from "lucide-react";
import { bookmarkAPI } from "../../services/api";

const BookmarkResumes = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

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
                <div className="flex gap-2">
                  <Link
                    to={
                      b.targetModel === "Job"
                        ? `/job/${b.targetId?._id}`
                        : `/candidates/${b.targetId?._id}`
                    }
                    className="flex-1 bg-[#5BBB7B] text-white py-2 rounded-lg text-sm font-semibold text-center hover:bg-torado-green-600 transition-colors"
                  >
                    View Profile
                  </Link>
                  <button className="px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                    <Bookmark size={18} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkResumes;
