import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const FileUpload = ({ onFileSelect, acceptedTypes, maxSize, className }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    // Check file type
    if (acceptedTypes && !acceptedTypes.includes(file.type)) {
      return;
    }
    
    // Check file size
    if (maxSize && file.size > maxSize) {
      return;
    }
    
    onFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div 
      className={cn(
        "relative border-2 border-dashed border-primary-300 rounded-xl p-8 text-center transition-all duration-300",
        isDragOver ? "file-upload-hover border-accent-500 bg-accent-50" : "hover:border-primary-400 hover:bg-primary-50",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedTypes?.join(",")}
        onChange={handleFileInputChange}
      />
      
      <div className="space-y-4">
        <motion.div 
          className="mx-auto w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full flex items-center justify-center"
          animate={{ scale: isDragOver ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon 
            name="Upload" 
            className={cn(
              "w-8 h-8 transition-colors duration-200",
              isDragOver ? "text-accent-600" : "text-accent-500"
            )}
          />
        </motion.div>
        
        <div>
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            {isDragOver ? "Drop your document here" : "Upload Legal Document"}
          </h3>
          <p className="text-primary-600 mb-4">
            Drag and drop your PDF or Word document, or click to browse
          </p>
          <Button
            onClick={openFileDialog}
            variant="primary"
            size="lg"
            className="mx-auto"
          >
            <ApperIcon name="FileText" className="w-5 h-5 mr-2" />
            Choose File
          </Button>
        </div>
        
        <div className="text-sm text-primary-500 space-y-1">
          <p>Supported formats: PDF, DOC, DOCX</p>
          <p>Maximum file size: 10MB</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FileUpload;