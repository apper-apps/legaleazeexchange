import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";

const FilePreview = ({ file, onRemove, className }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.includes("pdf")) return "FileText";
    if (type.includes("word") || type.includes("document")) return "FileText";
    return "File";
  };

  const getFileTypeLabel = (type) => {
    if (type.includes("pdf")) return "PDF";
    if (type.includes("word") || type.includes("document")) return "Word Document";
    return "Document";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Card className="p-4 analysis-card">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <ApperIcon 
                name={getFileIcon(file.type)} 
                className="w-5 h-5 text-accent-600" 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-primary-900 truncate">
                {file.name}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="info" size="sm">
                  {getFileTypeLabel(file.type)}
                </Badge>
                <span className="text-xs text-primary-500">
                  {formatFileSize(file.size)}
                </span>
              </div>
              <p className="text-xs text-primary-600 mt-1">
                Uploaded {new Date().toLocaleString()}
              </p>
            </div>
          </div>
          
          <Button
            onClick={onRemove}
            variant="ghost"
            size="sm"
            className="ml-2 text-primary-400 hover:text-error-600 hover:bg-error-50"
          >
            <ApperIcon name="X" className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default FilePreview;