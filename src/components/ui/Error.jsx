import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Analysis Failed"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-error-100 to-error-200 rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      >
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-error-600" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-primary-900 mb-2">
          {title}
        </h3>
        <p className="text-primary-600 mb-6 max-w-md">
          {message}
        </p>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            size="lg"
            className="min-w-32"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </motion.div>
      
      <motion.div
        className="mt-8 p-4 bg-error-50 rounded-lg border border-error-200 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-start space-x-2">
          <ApperIcon name="Info" className="w-4 h-4 text-error-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-error-800">
            <p className="font-medium mb-1">Troubleshooting tips:</p>
            <ul className="text-left space-y-1">
              <li>• Make sure your file is a PDF or Word document</li>
              <li>• Check that the file size is under 10MB</li>
              <li>• Ensure you have a stable internet connection</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Error;