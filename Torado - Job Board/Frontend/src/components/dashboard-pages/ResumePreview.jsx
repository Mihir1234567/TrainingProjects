import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { Download, Edit3, Save, Loader } from "lucide-react";
import html2pdf from "html2pdf.js";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Linkedin,
  Github,
  Calendar,
} from "lucide-react";

const ResumePreview = forwardRef(
  (
    {
      formData,
      onEdit,
      onSave,
      loading,
      isReadOnly = false,
      onDownload, // New prop to handle download with save
    },
    ref,
  ) => {
    const componentRef = useRef();

    useImperativeHandle(ref, () => ({
      handlePrint,
    }));

    const handlePrint = async () => {
      // If onDownload is provided (fetching/saving logic), wait for it
      if (onDownload) {
        try {
          await onDownload();
        } catch (error) {
          console.error("Pre-download action failed:", error);
          return; // Stop if save failed
        }
      }

      try {
        console.log("Starting PDF generation...");
        const element = componentRef.current;
        const opt = {
          margin: [10, 15],
          filename: `${formData.name.replace(/\s+/g, "_")}_Resume.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollY: 0,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        const worker =
          typeof html2pdf === "function" ? html2pdf() : html2pdf.default();

        worker
          .set(opt)
          .from(element)
          .save()
          .then(() => {
            console.log("PDF generated successfully");
          })
          .catch((err) => {
            console.error("PDF generation error:", err);
            alert(
              "Failed to generate PDF: " + (err.message || JSON.stringify(err)),
            );
          });
      } catch (err) {
        console.error("Critical PDF error:", err);
        alert("Error initializing PDF generator: " + err.message);
      }
    };

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 print:hidden sticky top-4 z-50">
          <h2 className="text-xl font-bold text-slate-800">Resume Preview</h2>
          <div className="flex gap-3">
            {!isReadOnly && (
              <button
                type="button"
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-semibold"
              >
                <Edit3 size={18} /> Edit
              </button>
            )}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold"
            >
              <Download size={18} /> Download PDF
            </button>
            {!isReadOnly && (
              <button
                type="button"
                onClick={onSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-[#5BBB7B] text-white rounded-lg hover:bg-[#4ea86b] transition-colors font-bold shadow-lg shadow-[#5BBB7B]/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                Save & Create
              </button>
            )}
          </div>
        </div>

        {/* Simplified A4 Layout Container */}
        <div className="w-full overflow-auto bg-slate-100/50 p-4 md:p-8 rounded-xl border border-slate-200">
          <div className="mx-auto bg-white shadow-2xl print:shadow-none min-h-[297mm] w-[210mm] min-w-[210mm] border border-slate-200 text-slate-800 box-border">
            {/* VISUAL PADDING CONTAINER (Screen Only) */}
            <div className="p-[15mm] bg-white h-full box-border">
              {/* CAPTURE TARGET (Content Only) - Margins applied by PDF Generator */}
              <div
                ref={componentRef}
                id="resume-preview-content"
                className="bg-white"
                style={{ width: "100%" }}
              >
                {/* Header */}
                <div style={{ marginBottom: "30px" }}>
                  <h1
                    className="text-4xl font-bold text-slate-900 uppercase tracking-widest"
                    style={{ marginBottom: "10px", lineHeight: "1.2" }}
                  >
                    {formData?.name || "Your Name"}
                  </h1>
                  <h2
                    className="text-lg font-semibold text-slate-500 uppercase tracking-widest"
                    style={{ marginBottom: "20px" }}
                  >
                    {formData?.professionalTitle || "Professional Title"}
                  </h2>

                  {/* Contact Info (Table Layout) */}
                  <div style={{ marginBottom: "25px" }}>
                    <table
                      style={{ borderCollapse: "collapse", width: "100%" }}
                    >
                      <tbody>
                        {formData?.email && (
                          <tr>
                            <td
                              style={{
                                width: "24px",
                                verticalAlign: "middle",
                                paddingBottom: "8px",
                              }}
                            >
                              <Mail size={16} />
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                paddingBottom: "8px",
                                color: "#475569",
                                fontSize: "14px",
                              }}
                            >
                              {formData.email}
                            </td>
                          </tr>
                        )}
                        {formData?.jobCategory && (
                          <tr>
                            <td
                              style={{ width: "24px", verticalAlign: "middle" }}
                            >
                              <Globe size={16} />
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                color: "#475569",
                                fontSize: "14px",
                              }}
                            >
                              {formData.jobCategory}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div
                    style={{
                      height: "2px",
                      backgroundColor: "#1e293b",
                      width: "100%",
                      marginBottom: "30px",
                    }}
                  ></div>
                </div>

                {/* Summary */}
                {formData?.resumeContent && (
                  <div
                    className="break-inside-avoid"
                    style={{ marginBottom: "35px" }}
                  >
                    <h3
                      className="text-lg font-bold text-slate-900 uppercase"
                      style={{ marginBottom: "10px" }}
                    >
                      Professional Summary
                    </h3>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "#cbd5e1",
                        width: "100%",
                        marginBottom: "15px",
                      }}
                    ></div>
                    <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                      {formData.resumeContent}
                    </p>
                  </div>
                )}

                {/* Skills */}
                {formData?.skills?.length > 0 && (
                  <div
                    className="break-inside-avoid"
                    style={{ marginBottom: "35px" }}
                  >
                    <h3
                      className="text-lg font-bold text-slate-900 uppercase"
                      style={{ marginBottom: "10px" }}
                    >
                      Skills
                    </h3>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "#cbd5e1",
                        width: "100%",
                        marginBottom: "15px",
                      }}
                    ></div>
                    <div>
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          style={{
                            display: "inline-block",
                            color: "#334155",
                            fontSize: "13px",
                            fontWeight: "600",
                            marginRight: "15px",
                            marginBottom: "8px",
                            lineHeight: "1.5",
                            verticalAlign: "middle",
                          }}
                        >
                          {skill.name}{" "}
                          {skill.percentage ? `(${skill.percentage}%)` : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {formData?.experience?.length > 0 && (
                  <div style={{ marginBottom: "35px" }}>
                    <h3
                      className="text-lg font-bold text-slate-900 uppercase"
                      style={{ marginBottom: "10px" }}
                    >
                      Work Experience
                    </h3>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "#cbd5e1",
                        width: "100%",
                        marginBottom: "20px",
                      }}
                    ></div>
                    <div>
                      {formData.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="break-inside-avoid"
                          style={{ marginBottom: "25px" }}
                        >
                          {/* Float layout for robust PDF generation */}
                          <div style={{ marginBottom: "5px", width: "100%" }}>
                            <div style={{ float: "left", maxWidth: "75%" }}>
                              <h4
                                className="text-lg font-bold text-slate-800"
                                style={{ margin: 0, lineHeight: "1.4" }}
                              >
                                {exp.jobTitle}
                              </h4>
                            </div>
                            <div
                              style={{
                                float: "right",
                                textAlign: "right",
                                maxWidth: "25%",
                              }}
                            >
                              <span className="text-sm font-medium text-slate-500">
                                {exp.startDate
                                  ? `${exp.startDate} - ${
                                      exp.endDate || "Present"
                                    }`
                                  : exp.endDate || "Present"}
                              </span>
                            </div>
                            <div style={{ clear: "both" }}></div>
                          </div>
                          <div
                            className="text-base font-semibold text-slate-700"
                            style={{ marginBottom: "10px" }}
                          >
                            {exp.employer}
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {exp.notes}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {formData?.education?.length > 0 && (
                  <div>
                    <h3
                      className="text-lg font-bold text-slate-900 uppercase"
                      style={{ marginBottom: "10px" }}
                    >
                      Education
                    </h3>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "#cbd5e1",
                        width: "100%",
                        marginBottom: "20px",
                      }}
                    ></div>
                    <div>
                      {formData.education.map((edu, index) => (
                        <div
                          key={index}
                          className="break-inside-avoid"
                          style={{ marginBottom: "25px" }}
                        >
                          {/* Float layout for robust PDF generation */}
                          <div style={{ marginBottom: "5px", width: "100%" }}>
                            <div style={{ float: "left", maxWidth: "75%" }}>
                              <h4
                                className="text-lg font-bold text-slate-800"
                                style={{ margin: 0, lineHeight: "1.4" }}
                              >
                                {edu.school}
                              </h4>
                            </div>
                            <div
                              style={{
                                float: "right",
                                textAlign: "right",
                                maxWidth: "25%",
                              }}
                            >
                              <span className="text-sm font-medium text-slate-500">
                                {edu.startDate
                                  ? `${edu.startDate} - ${
                                      edu.endDate || "Present"
                                    }`
                                  : edu.endDate || "Present"}
                              </span>
                            </div>
                            <div style={{ clear: "both" }}></div>
                          </div>
                          <div
                            className="text-base text-slate-700 font-medium"
                            style={{ marginBottom: "10px" }}
                          >
                            {edu.qualification}
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {edu.notes}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <style>{`
        @media print {
          @page { margin: 0; size: a4; }
          body { background: white; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
      </div>
    );
  },
);

export default ResumePreview;
