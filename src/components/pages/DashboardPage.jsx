import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { documentService } from "@/services/api/documentService";
import ChatArea from "@/components/organisms/ChatArea";
import DocumentAnalyzer from "@/components/organisms/DocumentAnalyzer";
import Header from "@/components/organisms/Header";
import ConversationList from "@/components/organisms/ConversationList";

const DashboardPage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock user data
  const mockUser = {
    name: "Rajesh Berry",
    initials: "RB",
    plan: "Pro plan"
  };

  useEffect(() => {
    // Simulate loading conversations
    const loadConversations = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockConversations = [
          {
            id: '1',
            title: 'Contract Review Discussion',
            lastMessage: 'Please review the employment contract clauses...',
            timestamp: new Date('2024-01-15T10:30:00'),
            type: 'contract'
          },
          {
            id: '2', 
            title: 'Legal Consultation',
            lastMessage: 'I need advice on intellectual property rights...',
            timestamp: new Date('2024-01-14T15:45:00'),
            type: 'consultation'
          }
        ];
        
        setConversations(mockConversations);
        toast.success('Conversations loaded successfully');
      } catch (error) {
        console.error('Error loading conversations:', error);
        toast.error('Failed to load conversations');
      } finally {
        setIsLoading(false);
      }
};

    loadConversations();
  }, []);

  const handleConversationSelect = (conversation) => {
    setCurrentConversation(conversation);
  };

  const handleNewDocumentAnalysis = () => {
    // Create new document analysis conversation
    const newConversation = {
      id: Date.now().toString(),
      title: 'New Document Analysis',
      lastMessage: 'Starting document analysis...',
      timestamp: new Date(),
      type: 'document-analysis'
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
  };

  const handleSendMessage = async (message) => {
    if (!currentConversation) return;

    try {
      // Update conversation with new message
      const updatedConversation = {
        ...currentConversation,
        lastMessage: message,
        timestamp: new Date()
      };

      setConversations(prev => 
        prev.map(conv => 
          conv.id === updatedConversation.id 
            ? updatedConversation 
            : conv
        )
      );
      setCurrentConversation(updatedConversation);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="legaleaze-dashboard">
      {/* Sidebar */}
      <div className="legaleaze-sidebar">
        <ConversationList
          conversations={conversations}
          activeConversation={currentConversation}
          onConversationSelect={handleConversationSelect}
          onNewDocumentAnalysis={handleNewDocumentAnalysis}
          user={mockUser}
        />
      </div>

      {/* Main Content */}
      <div className="legaleaze-main-content">
        <ChatArea
          conversation={currentConversation}
          onSendMessage={handleSendMessage}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default DashboardPage;