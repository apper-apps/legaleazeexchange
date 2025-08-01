import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { documentService } from "@/services/api/documentService";
import DocumentAnalyzer from "@/components/organisms/DocumentAnalyzer";
import Header from "@/components/organisms/Header";
import ConversationList from "@/components/organisms/ConversationList";

const DashboardPage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: 'New Legal Discussion',
      lastMessage: '',
      timestamp: new Date(),
      type: 'general'
    };
    
setConversations(prev => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
    toast.success('New conversation started');
  };

  const handleConversationSelect = (conversation) => {
    setCurrentConversation(conversation);
  };
return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Conversations */}
          <div className="lg:col-span-1">
            <ConversationList 
              conversations={conversations}
              currentConversation={currentConversation}
              onConversationSelect={handleConversationSelect}
              onNewConversation={handleNewConversation}
              isLoading={isLoading}
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <DocumentAnalyzer 
              currentConversation={currentConversation}
              onConversationUpdate={(updatedConversation) => {
                setConversations(prev => 
                  prev.map(conv => 
                    conv.id === updatedConversation.id 
                      ? updatedConversation 
                      : conv
                  )
                );
                setCurrentConversation(updatedConversation);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;