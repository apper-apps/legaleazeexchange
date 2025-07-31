import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No Data Available",
  description = "There's nothing to show here yet.",
  actionLabel,
  onAction,
  icon = "FileText"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      >
        <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="max-w-md"
      >
        <h3 className="text-xl font-semibold text-primary-900 mb-3">
          {title}
        </h3>
        <p className="text-primary-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            variant="primary"
            size="lg"
          >
            {actionLabel}
          </Button>
        )}
      </motion.div>
      
      <motion.div
        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-lg border border-accent-200">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mb-2">
            <span className="text-lg">📄</span>
          </div>
          <p className="text-xs text-primary-600 text-center">
            Upload PDF or Word documents
          </p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-lg border border-success-200">
          <div className="w-8 h-8 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center mb-2">
            <span className="text-lg">⚡</span>
          </div>
          <p className="text-xs text-primary-600 text-center">
            Get instant analysis
          </p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-2">
            <span className="text-lg">💡</span>
          </div>
          <p className="text-xs text-primary-600 text-center">
            Understand in plain English
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Empty;