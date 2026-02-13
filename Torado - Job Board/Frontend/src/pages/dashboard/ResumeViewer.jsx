import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { resumeAPI } from "../../services/api";
import ResumePreview from "../../components/dashboard-pages/ResumePreview";

const ResumeViewer = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const resumePreviewRef = useRef();
  const autoPrintTriggered = useRef(false);

  const shouldAutoDownload = searchParams.get("download") === "true";

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await resumeAPI.getById(id);
        setResumeData(data);
      } catch (err) {
        console.error("Failed to fetch resume:", err);
        setError("Resume not found or access denied.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResume();
    }
  }, [id]);

  useEffect(() => {
    // Trigger download once data is loaded and if requested
    if (
      !loading &&
      resumeData &&
      shouldAutoDownload &&
      !autoPrintTriggered.current &&
      resumePreviewRef.current
    ) {
      autoPrintTriggered.current = true;
      // Small timeout to ensure rendering is complete
      setTimeout(() => {
        resumePreviewRef.current.handlePrint();
      }, 1000);
    }
  }, [loading, resumeData, shouldAutoDownload]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5BBB7B]"></div>
        <span className="ml-3 text-slate-500">Loading Resume...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Error</h2>
          <p className="text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-[230mm] mx-auto">
        <ResumePreview
          ref={resumePreviewRef}
          formData={resumeData}
          isReadOnly={true}
          loading={false}
        />
      </div>
    </div>
  );
};

export default ResumeViewer;
