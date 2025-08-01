import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ChatMessage from "@/components/molecules/ChatMessage";
import ChatInput from "@/components/molecules/ChatInput"; 
import Empty from "@/components/ui/Empty";

const ChatArea = ({ conversation, onSendMessage, loading }) => {
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  useEffect(() => {
    if (conversation?.messages) {
      const hasTypingMessage = conversation.messages.some(msg => msg.isTyping);
      setIsTyping(hasTypingMessage);
    }
  }, [conversation?.messages]);

  const handleSendMessage = (message, file) => {
    onSendMessage(message, file);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-semibold text-gray-900">Upload a Legal Document</h1>
            <p className="text-sm text-gray-600 mt-1">
              Start a new conversation by uploading a document for analysis
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Empty
            icon="Upload"
            title="Upload a Legal Document"
            description="Drag and drop or click the attachment button to upload any legal document for analysis. I'll break it down into plain English and highlight important terms you need to know."
            actionLabel="Upload Document"
            onAction={() => {
              // Trigger file input in ChatInput
              document.getElementById('file-input')?.click();
            }}
          />
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={loading}
              placeholder="Upload a document or ask me anything about legal documents..."
              showFileUpload={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
              <ApperIcon name="FileText" size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-900">
                {conversation.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Uploaded {conversation.timestamp}</span>
                <span>•</span>
                <span>{conversation.documentType}</span>
                {conversation.status === "analyzed" && (
                  <>
                    <span>•</span>
                    <span className={
                      conversation.riskLevel === "high" 
                        ? "text-red-600 font-medium" 
                        : conversation.riskLevel === "medium"
                        ? "text-yellow-600 font-medium"
                        : "text-green-600 font-medium"
                    }>
                      {conversation.riskLevel === "high" && "High risk factors detected"}
                      {conversation.riskLevel === "medium" && "Medium risk detected"}
                      {conversation.riskLevel === "low" && "Low risk document"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto py-6 px-4">
          <AnimatePresence>
            {conversation.messages?.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                index={index}
              />
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <ApperIcon name="Bot" size={16} className="text-white" />
              </div>
              <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={loading}
            placeholder="Ask about your document, upload a new one, or request clarification..."
            showFileUpload={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;