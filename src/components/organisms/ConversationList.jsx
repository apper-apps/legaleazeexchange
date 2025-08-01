import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const ConversationList = ({ 
  conversations, 
  activeConversation, 
  onConversationSelect, 
  onNewDocumentAnalysis,
  user,
  onLogout
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
<div className="legaleaze-sidebar">
      {/* Header */}
      <div className="legaleaze-sidebar-header">
        <div className="legaleaze-logo">
          <div className="legaleaze-logo-icon"></div>
          Legaleaze
        </div>
      </div>

      {/* New Chat Button */}
      <button className="legaleaze-new-chat-btn" onClick={onNewDocumentAnalysis}>
        + New chat
      </button>

      {/* Navigation */}
      <nav className="legaleaze-nav-section">
        <a href="#" className="legaleaze-nav-item active">
          <div className="legaleaze-nav-icon"></div>
          Chats
        </a>
      </nav>

      {/* Recents */}
      <div className="legaleaze-recents">
        <div className="legaleaze-recents-header">Recents</div>
        {conversations.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500">No conversations yet</p>
            <p className="text-xs text-gray-400 mt-1">Upload a document to get started</p>
          </div>
        ) : (
          conversations.map((conversation, index) => {
            const isActive = activeConversation?.Id === conversation.Id;
            return (
              <motion.button
                key={conversation.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => onConversationSelect(conversation)}
                className={cn(
                  "legaleaze-recent-item",
                  isActive && "legaleaze-recent-item active"
                )}
              >
                {conversation.title}
              </motion.button>
            );
          })
        )}
      </div>

{/* User Section */}
      <div className="legaleaze-user-section">
        <div className="legaleaze-user-avatar">{user?.initials || "U"}</div>
        <div className="legaleaze-user-info">
          <div className="legaleaze-user-name">{user?.name || "User"}</div>
          <div className="legaleaze-user-plan">{user?.plan || "Free plan"}</div>
        </div>
        {onLogout && (
          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="ml-2 text-gray-500 hover:text-gray-700"
            title="Logout"
          >
            <ApperIcon name="LogOut" className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConversationList;