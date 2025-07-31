import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FileUpload from "@/components/molecules/FileUpload";
import FilePreview from "@/components/molecules/FilePreview";
import AnalysisSection from "@/components/molecules/AnalysisSection";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { documentService } from "@/services/api/documentService";
import { toast } from "react-toastify";

const DocumentAnalyzer = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const acceptedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = async (file) => {
    if (!acceptedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setUploadedFile(file);
    setError("");
    await analyzeDocument(file);
  };

  const analyzeDocument = async (file) => {
    setLoading(true);
    setError("");
    
    try {
      const document = await documentService.uploadDocument(file);
      const analysisResult = await documentService.analyzeDocument(document.id);
      setAnalysis(analysisResult);
      toast.success("Document analyzed successfully!");
    } catch (err) {
      setError("Failed to analyze document. Please try again.");
      toast.error("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setAnalysis(null);
    setError("");
  };

  const handleRetry = () => {
    if (uploadedFile) {
      analyzeDocument(uploadedFile);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-900 mb-3">
            Document Analysis
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Upload your legal document to get a plain English analysis that breaks down complex terms and clauses
          </p>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Upload Section - Show when no file or when file is uploaded but no analysis yet */}
          {(!uploadedFile || (uploadedFile && !analysis && !loading)) && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {!uploadedFile ? (
                <div className="bg-white rounded-xl border-2 border-dashed border-primary-200 p-8">
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    acceptedTypes={acceptedTypes}
                    maxSize={maxSize}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-primary-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-primary-900">
                      Uploaded Document
                    </h3>
                  </div>
                  <FilePreview
                    file={uploadedFile}
                    onRemove={handleRemoveFile}
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div 
              className="bg-white rounded-xl border border-primary-200 p-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Analyzing Your Document
                </h3>
                <p className="text-primary-600">
                  Please wait while we break down your document into plain English...
                </p>
              </div>
              <Loading />
            </motion.div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div 
              className="bg-white rounded-xl border border-error-200 p-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Error 
                message={error}
                onRetry={handleRetry}
              />
            </motion.div>
          )}

          {/* Analysis Results */}
          {analysis && !loading && !error && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Success Header */}
              <div className="bg-gradient-to-r from-success-50 to-success-100 rounded-xl p-6 border border-success-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-success-800 mb-2">
                      Analysis Complete!
                    </h3>
                    <p className="text-success-700">
                      We've broken down your document into key sections with plain English explanations.
                    </p>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={handleRemoveFile}
                      className="text-sm text-success-700 hover:text-success-800 underline"
                    >
                      Analyze New Document
                    </button>
                  </div>
                </div>
              </div>

              {/* Analysis Sections */}
              <div className="space-y-4">
                {analysis.sections.map((section, index) => (
                  <AnalysisSection
                    key={index}
                    section={section}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;