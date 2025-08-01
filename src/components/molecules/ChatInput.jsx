import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";

const ChatInput = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Type your message...",
  showFileUpload = true 
}) => {
  const [message, setMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const acceptedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;

    onSendMessage(message.trim());
    setMessage("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const handleFileSelect = (file) => {
    // Validate file type
    if (acceptedTypes && !acceptedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }
    
    // Validate file size
    if (maxSize && file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return;
    }

    // Send message with file
    onSendMessage(message.trim() || "Please analyze this document", file);
    setMessage("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* File Upload Input */}
      <input
        id="file-input"
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedTypes?.join(",")}
        onChange={handleFileInputChange}
      />

      {/* Drag Overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <ApperIcon name="Upload" size={32} className="text-blue-500 mx-auto mb-2" />
            <p className="text-blue-600 font-medium">Drop your document here</p>
          </div>
        </div>
      )}

      {/* Chat Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div 
          className={cn(
            "bg-gray-100 rounded-xl border transition-all duration-200",
            isDragOver ? "border-blue-300 bg-blue-50" : "border-gray-300 focus-within:border-blue-500",
            disabled && "opacity-50"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex items-end space-x-2 p-3">
            {/* File Upload Button */}
            {showFileUpload && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2"
              >
                <ApperIcon name="Paperclip" size={20} />
              </Button>
            )}

            {/* Text Input */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className={cn(
                "flex-1 bg-transparent border-0 resize-none outline-none placeholder-gray-500 text-gray-900",
                "min-h-[24px] max-h-[120px] py-1",
                disabled && "cursor-not-allowed"
              )}
              style={{ height: 'auto' }}
            />

            {/* Send Button */}
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!message.trim() || disabled}
              className="p-2 min-w-0"
            >
              {disabled ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ApperIcon name="Send" size={18} />
              )}
            </Button>
          </div>
        </div>

        {/* Helper Text */}
        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </p>
          {showFileUpload && (
            <p className="text-xs text-gray-400">
              Support: PDF, DOC, DOCX (max 10MB)
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ChatInput;