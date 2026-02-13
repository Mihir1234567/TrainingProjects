const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");
const Message = require("../models/Message");
const Bookmark = require("../models/Bookmark");

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let stats = {};

    if (user.role === "employer") {
      // 1. Posted Jobs Count
      const postedJobsCount = await Job.countDocuments({
        recruiterId: req.user.id,
      });

      // 2. Total Applications Received (across all jobs posted by this recruiter)
      // First find all job IDs by this recruiter
      const jobs = await Job.find({ recruiterId: req.user.id }).select("_id");
      const jobIds = jobs.map((job) => job._id);

      const totalApplicationsCount = await Application.countDocuments({
        jobId: { $in: jobIds },
      });

      // 3. Shortlisted (Bookmarked Candidates)
      const shortlistedCount = await Bookmark.countDocuments({
        userId: req.user.id,
        targetModel: "User",
      });

      // 4. Chat Count (Unique Conversations)
      const sent = await Message.find({ senderId: req.user.id }).distinct(
        "receiverId",
      );
      const received = await Message.find({ receiverId: req.user.id }).distinct(
        "senderId",
      );
      const chatPartners = new Set([
        ...sent.map((id) => id.toString()),
        ...received.map((id) => id.toString()),
      ]);
      const chatCount = chatPartners.size;

      // 5. Recent Activity (Recent Applications)
      const recentActivity = await Application.find({
        jobId: { $in: jobIds },
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("jobId", "title")
        .populate("candidateId", "name");

      stats = {
        postedJobs: postedJobsCount,
        applications: totalApplicationsCount,
        messages: chatCount,
        shortlisted: shortlistedCount,
        recentActivity: recentActivity.map((app) => ({
          id: app._id,
          title: app.candidateId?.name || "Candidate",
          subtitle: `Applied for ${app.jobId?.title || "Job"}`,
          time: new Date(app.createdAt).toLocaleDateString(),
          type: "application",
          status: app.status,
        })),
      };
    } else {
      // CANDIDATE STATS
      // 1. Applied Jobs Count
      const appliedJobsCount = await Application.countDocuments({
        candidateId: req.user.id,
      });

      // 2. Interviews (Status = Interview)
      const interviewsCount = await Application.countDocuments({
        candidateId: req.user.id,
        status: "Interview",
      });

      // 3. Chat Count (Unique Conversations)
      const sent = await Message.find({ senderId: req.user.id }).distinct(
        "receiverId",
      );
      const received = await Message.find({ receiverId: req.user.id }).distinct(
        "senderId",
      );
      const chatPartners = new Set([
        ...sent.map((id) => id.toString()),
        ...received.map((id) => id.toString()),
      ]);
      const chatCount = chatPartners.size;

      // 4. Saved Jobs (Bookmarks)
      const savedJobsCount = await Bookmark.countDocuments({
        userId: req.user.id,
        targetModel: "Job",
      });

      // 5. Recent Activity (My Recent Applications)
      const recentActivity = await Application.find({
        candidateId: req.user.id,
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate({
          path: "jobId",
          select: "title",
          populate: { path: "companyId", select: "name" },
        });

      stats = {
        appliedJobs: appliedJobsCount,
        interviews: interviewsCount,
        messages: chatCount,
        savedJobs: savedJobsCount,
        recentActivity: recentActivity.map((app) => ({
          id: app._id,
          title: app.jobId?.title || "Job",
          subtitle: app.jobId?.companyId?.name || "Company",
          time: new Date(app.createdAt).toLocaleDateString(),
          type: "application",
          status: app.status,
        })),
      };
    }

    res.status(200).json(stats);
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server Error fetching stats" });
  }
};

const getPublicStats = async (req, res) => {
  try {
    const jobsCount = await Job.countDocuments({ status: "Active" });
    const applicationsCount = await Application.countDocuments();
    const candidatesCount = await User.countDocuments({ role: "candidate" });
    const employersCount = await User.countDocuments({ role: "employer" });

    res.status(200).json({
      liveJobs: jobsCount,
      applications: applicationsCount,
      candidates: candidatesCount,
      employers: employersCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getDashboardStats,
  getPublicStats,
};
