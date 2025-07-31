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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-primary-900 mb-2">
              Upload Document
            </h2>
            <p className="text-primary-600">
              Upload your legal document to get a plain English analysis
            </p>
          </div>
          
          {!uploadedFile ? (
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedTypes={acceptedTypes}
              maxSize={maxSize}
            />
          ) : (
            <FilePreview
              file={uploadedFile}
              onRemove={handleRemoveFile}
            />
          )}
        </div>

        {/* Analysis Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-primary-900 mb-2">
              Document Analysis
            </h2>
            <p className="text-primary-600">
              Plain English explanation of your legal document
            </p>
          </div>
          
          <div className="min-h-[400px]">
            {loading && <Loading />}
            
            {error && !loading && (
              <Error 
                message={error}
                onRetry={handleRetry}
              />
            )}
            
            {!uploadedFile && !loading && !error && (
              <Empty 
                title="No Document Uploaded"
                description="Upload a legal document to see its plain English analysis here."
                actionLabel="Upload Document"
                onAction={() => {}}
              />
            )}
            
            {analysis && !loading && !error && (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-success-50 to-success-100 rounded-lg p-4 border border-success-200 mb-6">
                  <h3 className="text-lg font-semibold text-success-800 mb-2">
                    Analysis Complete!
                  </h3>
                  <p className="text-success-700">
                    We've broken down your document into key sections with plain English explanations.
                  </p>
                </div>
                
                {analysis.sections.map((section, index) => (
                  <AnalysisSection
                    key={index}
                    section={section}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;