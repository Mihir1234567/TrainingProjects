import React, { useState, useEffect, useRef } from "react";
import { resumeAPI } from "../../services/api";
import ResumePreview from "../dashboard-pages/ResumePreview";

const ResumeDownloader = ({ resumeId, onComplete }) => {
  const [resumeData, setResumeData] = useState(null);
  const previewRef = useRef();

  useEffect(() => {
    let mounted = true;

    const processDownload = async () => {
      if (!resumeId) return;

      try {
        // 1. Fetch Resume Data
        const data = await resumeAPI.getById(resumeId);

        if (mounted) {
          // If it's an uploaded file, download it directly
          if (data.type === "Upload" && data.fileUrl) {
            const link = document.createElement("a");
            link.href = data.fileUrl.startsWith("http")
              ? data.fileUrl
              : `http://localhost:5001${data.fileUrl}`;
            link.download = data.fileName || `${data.name}_Resume.pdf`;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (onComplete) onComplete();
            return;
          }

          setResumeData(data);
        }

        // 2. Wait for render (using timeout to ensure DOM is ready)
        setTimeout(async () => {
          if (previewRef.current && mounted) {
            try {
              // 3. Trigger PDF Generation
              await previewRef.current.handlePrint();
            } catch (err) {
              console.error("Print failed:", err);
            } finally {
              // 4. Cleanup
              if (mounted) {
                setResumeData(null); // Clear to remove from DOM
                if (onComplete) onComplete();
              }
            }
          }
        }, 1500); // Wait 1.5s for images/layout to stabilize
      } catch (error) {
        console.error("Failed to download resume:", error);
        alert("Failed to download resume. Please try again.");
        if (mounted && onComplete) onComplete();
      }
    };

    processDownload();

    return () => {
      mounted = false;
    };
  }, [resumeId]);

  if (!resumeData) return null;

  return (
    <div
      style={{ position: "absolute", left: "-9999px", top: 0, width: "210mm" }}
    >
      <ResumePreview
        ref={previewRef}
        formData={resumeData}
        isReadOnly={true}
        loading={false}
      />
    </div>
  );
};

export default ResumeDownloader;
