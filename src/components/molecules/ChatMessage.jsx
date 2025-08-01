import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ChatMessage = ({ message, index }) => {
  const isUser = message.type === "user";
  const isSystem = message.type === "system";
  const isAI = message.type === "ai";

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="flex justify-center mb-4"
      >
        <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full flex items-center space-x-1">
          <ApperIcon name="Info" size={12} />
          <span>{message.content}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "flex mb-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex max-w-[80%] space-x-3",
        isUser && "flex-row-reverse space-x-reverse"
      )}>
        {/* Avatar */}
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isUser 
            ? "bg-gradient-to-br from-blue-500 to-blue-600" 
            : "bg-gradient-to-br from-gray-100 to-gray-200"
        )}>
          {isUser ? (
            <ApperIcon name="User" size={16} className="text-white" />
          ) : (
            <ApperIcon name="Bot" size={16} className="text-gray-600" />
          )}
        </div>

        {/* Message Content */}
        <div className={cn(
          "flex flex-col",
          isUser ? "items-end" : "items-start"
        )}>
          <div className={cn(
            "rounded-2xl px-4 py-3 max-w-full",
            isUser 
              ? "bg-blue-500 text-white" 
              : "bg-white text-gray-900 shadow-sm border border-gray-200"
          )}>
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
          
          {/* Timestamp */}
          <div className={cn(
            "text-xs text-gray-400 mt-1 px-1",
            isUser ? "text-right" : "text-left"
          )}>
            {formatTimestamp(message.timestamp)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;