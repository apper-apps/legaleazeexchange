import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { documentService } from "@/services/api/documentService";
import Sidebar from "@/components/Sidebar";

const DashboardPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useState({ name: "Ricky" });

  const handleNewDocumentAnalysis = () => {
    setActiveConversation(null);
    setChatInput("");
    toast.info("Ready for new document upload");
  };

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleSendMessage = async (message, file = null) => {
    if (!message.trim() && !file) return;

    setLoading(true);
    try {
      if (file) {
        // Handle file upload and create new conversation
        const document = await documentService.uploadDocument(file);
        
        const newConversation = {
          Id: Date.now(),
          title: document.name || "New Document",
          preview: "Analyzing document...",
          timestamp: "Just now",
          documentType: "Document",
          status: "analyzing",
          riskLevel: "unknown",
          messages: [
            {
              id: 1,
              type: "system",
              content: `Document "${document.name}" uploaded successfully`,
              timestamp: new Date()
            },
            {
              id: 2,
              type: "user", 
              content: message || "Please analyze this document",
              timestamp: new Date()
            },
            {
              id: 3,
              type: "ai",
              content: "I'm analyzing your document now. This may take a few moments...",
              timestamp: new Date(),
              isTyping: true
            }
          ]
        };

        setConversations(prev => [newConversation, ...prev]);
        setActiveConversation(newConversation);

        // Simulate analysis
        setTimeout(async () => {
          try {
            const analysis = await documentService.analyzeDocument(document.id);
            
            const analysisMessage = {
              id: 4,
              type: "ai",
              content: `Analysis complete! Here's what I found:\n\n**Document Type**: ${analysis.type}\n**Risk Level**: ${analysis.riskLevel}\n**Key Issues**: ${analysis.summary}\n\nWould you like me to explain any of these findings in detail?`,
              timestamp: new Date(),
              isTyping: false
            };

            setConversations(prev => 
              prev.map(conv => 
                conv.Id === newConversation.Id 
                  ? {
                      ...conv,
                      status: "analyzed",
                      riskLevel: analysis.riskLevel,
                      preview: analysis.summary,
                      messages: [...conv.messages.slice(0, -1), analysisMessage]
                    }
                  : conv
              )
            );
          } catch (error) {
            toast.error("Analysis failed. Please try again.");
          }
        }, 3000);

      } else if (activeConversation) {
        // Add message to existing conversation
        const userMessage = {
          id: Date.now(),
          type: "user",
          content: message,
          timestamp: new Date()
        };

        const aiResponse = {
          id: Date.now() + 1,
          type: "ai", 
          content: "I'm processing your question...",
          timestamp: new Date(),
          isTyping: true
        };

        const updatedConversation = {
          ...activeConversation,
          messages: [...activeConversation.messages, userMessage, aiResponse]
        };

        setConversations(prev => 
          prev.map(conv => conv.Id === activeConversation.Id ? updatedConversation : conv)
        );
        setActiveConversation(updatedConversation);

        // Simulate AI response
        setTimeout(() => {
          const finalResponse = {
            ...aiResponse,
            content: file ? 
              "I've analyzed your new document. Here are the key findings..." :
              "Based on your question about the document, here's what I can tell you...",
            isTyping: false
          };

          const finalConversation = {
            ...updatedConversation,
            messages: [...updatedConversation.messages.slice(0, -1), finalResponse]
          };

          setConversations(prev => 
            prev.map(conv => conv.Id === activeConversation.Id ? finalConversation : conv)
          );
          setActiveConversation(finalConversation);
        }, 2000);
      }

      setChatInput("");
      toast.success(file ? "Document uploaded successfully" : "Message sent");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setChatInput(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  return (
    <div className="legaleaze-dashboard">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversation={activeConversation}
        onConversationSelect={handleConversationSelect}
        onNewChat={handleNewDocumentAnalysis}
        user={user}
      />
      
      {/* Main Content */}
      <main className="legaleaze-main-content">
        {/* Model Selector */}
        <div className="legaleaze-model-selector">
          Legaleaze AI ▼
        </div>
        
        {/* Main Header */}
        <div className="legaleaze-main-header">
          <h1 className="legaleaze-greeting">
            <span className="legaleaze-greeting-icon">✨</span>
            Evening, Ricky
          </h1>
        </div>
        
        {/* Chat Container */}
        <div className="legaleaze-chat-container">
          <div className="legaleaze-input-container">
            <textarea
              className="legaleaze-chat-input"
              placeholder="How can I help you today?"
              rows="1"
              value={chatInput}
              onChange={handleInputChange}
              disabled={loading}
            />
            <div className="legaleaze-input-actions">
              <button 
                className="legaleaze-action-btn"
                onClick={() => document.getElementById('file-input')?.click()}
                title="Upload document"
              >
                +
              </button>
              <button 
                className="legaleaze-action-btn"
                onClick={() => handleSendMessage(chatInput)}
                disabled={!chatInput.trim() || loading}
                title="Send message"
              >
                ⚡
              </button>
              <button 
                className="legaleaze-action-btn"
                title="Search"
              >
                🔍
              </button>
            </div>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleSendMessage("Please analyze this document", file);
                }
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;