import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { toast } from "react-toastify";

const AnalysisSection = ({ section, index, className }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Explanation copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const getImportanceBadge = (importance) => {
    const importanceConfig = {
      high: { variant: "error", label: "High Priority" },
      medium: { variant: "warning", label: "Medium Priority" },
      low: { variant: "info", label: "Low Priority" },
    };
    
    return importanceConfig[importance] || importanceConfig.medium;
  };

  const importanceBadge = getImportanceBadge(section.importance);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={className}
    >
      <Card className="section-card overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left hover:bg-primary-50 transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center">
                <ApperIcon 
                  name="FileText" 
                  className="w-4 h-4 text-accent-600" 
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-primary-900">
                  {section.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge 
                    variant={importanceBadge.variant} 
                    size="sm"
                  >
                    {importanceBadge.label}
                  </Badge>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ApperIcon 
                name="ChevronDown" 
                className="w-5 h-5 text-primary-400" 
              />
            </motion.div>
          </div>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-primary-100"
            >
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-primary-700 mb-2">
                    Original Legal Text:
                  </h4>
                  <div className="bg-primary-50 rounded-lg p-3 border border-primary-200">
                    <p className="text-sm text-primary-800 italic leading-relaxed">
                      "{section.originalText}"
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-primary-700">
                      Plain English Explanation:
                    </h4>
                    <Button
                      onClick={() => copyToClipboard(section.explanation)}
                      variant="ghost"
                      size="sm"
                      className="text-accent-600 hover:bg-accent-50"
                    >
                      <ApperIcon name="Copy" className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-lg p-4 border border-success-200">
                    <p className="text-sm text-primary-800 leading-relaxed">
                      {section.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default AnalysisSection;