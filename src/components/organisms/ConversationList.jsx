import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const ConversationList = ({ 
  conversations, 
  activeConversation, 
  onConversationSelect, 
  onNewDocumentAnalysis 
}) => {
  const getDocumentTypeColor = (type) => {
    const typeColors = {
      "Rental Agreement": "bg-blue-100 text-blue-800",
      "Employment Contract": "bg-green-100 text-green-800", 
      "Divorce Document": "bg-purple-100 text-purple-800",
      "Document": "bg-gray-100 text-gray-800"
    };
    return typeColors[type] || typeColors["Document"];
  };

  const getRiskBadge = (riskLevel) => {
    const riskConfig = {
      high: { variant: "error", label: "High Risk" },
      medium: { variant: "warning", label: "Medium Risk" },
      low: { variant: "success", label: "Low Risk" },
      unknown: { variant: "info", label: "Analyzing..." }
    };
    return riskConfig[riskLevel] || riskConfig.unknown;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="Scale" size={18} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Legaleaze</h2>
            <p className="text-xs text-gray-500">Your Legal Assistant</p>
          </div>
        </div>

        {/* New Document Analysis Button */}
        <Button
          onClick={onNewDocumentAnalysis}
          variant="primary"
          className="w-full"
          size="md"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          New Document Analysis
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="FileText" size={20} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No conversations yet</p>
            <p className="text-xs text-gray-400 mt-1">Upload a document to get started</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {conversations.map((conversation, index) => {
              const isActive = activeConversation?.Id === conversation.Id;
              const riskBadge = getRiskBadge(conversation.riskLevel);
              
              return (
                <motion.button
                  key={conversation.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => onConversationSelect(conversation)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-all duration-200 group hover:bg-gray-50",
                    isActive && "bg-blue-50 border-l-4 border-blue-500"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={cn(
                      "font-medium text-sm line-clamp-1",
                      isActive ? "text-blue-900" : "text-gray-900 group-hover:text-gray-900"
                    )}>
                      {conversation.title}
                    </h3>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                      {conversation.timestamp}
                    </span>
                  </div>

                  <p className={cn(
                    "text-xs line-clamp-2 mb-2",
                    isActive ? "text-blue-700" : "text-gray-600"
                  )}>
                    {conversation.preview}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                      getDocumentTypeColor(conversation.documentType)
                    )}>
                      {conversation.documentType}
                    </span>

                    {conversation.status === "analyzed" && (
                      <Badge 
                        variant={riskBadge.variant} 
                        size="sm"
                        className="text-xs"
                      >
                        {riskBadge.label}
                      </Badge>
                    )}

                    {conversation.status === "analyzing" && (
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Secure & Private Analysis
          </p>
          <div className="flex items-center justify-center space-x-1 mt-1">
            <ApperIcon name="Shield" size={12} className="text-green-500" />
            <span className="text-xs text-green-600 font-medium">Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;