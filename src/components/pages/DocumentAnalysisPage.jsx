import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import DocumentAnalyzer from "@/components/organisms/DocumentAnalyzer";
import Header from "@/components/organisms/Header";
import Button from "@/components/atoms/Button";

const DocumentAnalysisPage = () => {
  // Redirect to dashboard - this keeps the component for compatibility
  // but users will see the new dashboard experience
  React.useEffect(() => {
    window.location.href = '/dashboard';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default DocumentAnalysisPage;