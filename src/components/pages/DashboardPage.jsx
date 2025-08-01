import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Header from "@/components/organisms/Header";
import ConversationList from "@/components/organisms/ConversationList";
import ChatArea from "@/components/organisms/ChatArea";
import { documentService } from "@/services/api/documentService";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  // Mock user data - in real app this would come from auth context
  const user = {
    name: "John Smith",
    email: "john@example.com",
    initials: "JS",
    plan: "Personal Plan"
  };

  // Mock conversations data - in real app this would come from API
  const mockConversations = [
    {
      Id: 1,
      title: "Apartment Lease Agreement",
      preview: "Found 3 red flags including hidden fees and early termination penalties",
      timestamp: "2 hours ago",
      documentType: "Rental Agreement",
      status: "analyzed",
      riskLevel: "high",
      messages: [
        {
          id: 1,
          type: "system",
          content: "Document uploaded and analyzed successfully",
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          id: 2,
          type: "ai",
          content: "I've analyzed your apartment lease agreement. I found several important issues you should be aware of:\n\n**Red Flags Detected:**\n1. **Hidden Pet Fee**: There's a $300 non-refundable pet deposit that's not clearly disclosed upfront\n2. **Early Termination Penalty**: You'll pay 2 months rent if you break the lease early\n3. **Automatic Rent Increases**: Rent can increase by up to 5% annually without additional notice\n\nWould you like me to explain any of these in more detail?",
          timestamp: new Date(Date.now() - 7000000)
        }
      ]
    },
    {
      Id: 2,
      title: "Employment Contract Review",
      preview: "Non-compete clause may be too restrictive for your industry",
      timestamp: "Yesterday",
      documentType: "Employment Contract",
      status: "analyzed",
      riskLevel: "medium",
      messages: [
        {
          id: 1,
          type: "system",
          content: "Document uploaded and analyzed successfully",
          timestamp: new Date(Date.now() - 86400000)
        },
        {
          id: 2,
          type: "ai",
          content: "I've reviewed your employment contract. Overall it's fairly standard, but there are a few areas of concern:\n\n**Key Findings:**\n1. **Non-compete clause** restricts you from working in similar roles for 18 months\n2. **Intellectual property** clause is broader than typical\n3. **Termination notice** period is 30 days (standard)\n\nThe non-compete duration seems excessive for your industry. Would you like suggestions on how to negotiate this?",
          timestamp: new Date(Date.now() - 86000000)
        }
      ]
    },
    {
      Id: 3,
      title: "Divorce Settlement Draft",
      preview: "Asset division appears fair, but child support calculation needs review",
      timestamp: "3 days ago",
      documentType: "Divorce Document",
      status: "analyzed",
      riskLevel: "medium",
      messages: [
        {
          id: 1,
          type: "system",
          content: "Document uploaded and analyzed successfully",
          timestamp: new Date(Date.now() - 259200000)
        },
        {
          id: 2,
          type: "ai",
          content: "I've carefully reviewed your divorce settlement agreement. Here's what I found:\n\n**Asset Division**: Fair 50/50 split of marital assets\n**Child Support**: Current calculation may be below state guidelines\n**Custody Schedule**: Standard alternating weekends with holiday provisions\n\nI recommend having the child support calculation verified as it appears to be about $200/month below the typical amount for your income level.",
          timestamp: new Date(Date.now() - 258000000)
        }
      ]
    }
  ];

  useEffect(() => {
    setConversations(mockConversations);
    // Set first conversation as active by default
    if (mockConversations.length > 0) {
      setActiveConversation(mockConversations[0]);
    }
  }, []);

  const handleNewDocumentAnalysis = () => {
    // Create new conversation for document upload
    setActiveConversation(null);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleSendMessage = async (message, file = null) => {
    if (!activeConversation && !file) {
      toast.error("Please upload a document or select a conversation first");
      return;
    }

    // Handle file upload and create new conversation
    if (file) {
      setLoading(true);
      try {
        // Upload document
        const document = await documentService.uploadDocument(file);
        
        // Create new conversation
        const newConversation = {
          Id: Date.now(),
          title: file.name,
          preview: "Analyzing document...",
          timestamp: "Just now",
          documentType: "Document",
          status: "analyzing",
          riskLevel: "unknown",
          messages: [
            {
              id: 1,
              type: "system",
              content: `Document "${file.name}" uploaded successfully`,
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
              content: "I'm analyzing your document now. This should take just a moment...",
              timestamp: new Date(),
              isTyping: true
            }
          ]
        };

        // Add to conversations and set as active
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversation(newConversation);

        // Simulate analysis
        setTimeout(async () => {
          try {
            const analysis = await documentService.analyzeDocument(document.Id);
            
            // Update conversation with analysis results
            const analysisMessage = {
              id: 4,
              type: "ai",
              content: `I've completed the analysis of your document. Here are the key findings:\n\n${analysis.sections.map(section => 
                `**${section.title}**: ${section.explanation}`
              ).join('\n\n')}\n\nWould you like me to explain any of these sections in more detail?`,
              timestamp: new Date(),
              isTyping: false
            };

            setConversations(prev => prev.map(conv => 
              conv.Id === newConversation.Id 
                ? {
                    ...conv,
                    status: "analyzed",
                    riskLevel: analysis.sections.some(s => s.importance === "high") ? "high" : "medium",
                    preview: analysis.plainEnglish.substring(0, 80) + "...",
                    messages: [...conv.messages.slice(0, -1), analysisMessage]
                  }
                : conv
            ));

            setActiveConversation(prev => prev ? {
              ...prev,
              status: "analyzed",
              riskLevel: analysis.sections.some(s => s.importance === "high") ? "high" : "medium",
              preview: analysis.plainEnglish.substring(0, 80) + "...",
              messages: [...prev.messages.slice(0, -1), analysisMessage]
            } : null);

            toast.success("Document analyzed successfully!");
          } catch (error) {
            console.error("Analysis failed:", error);
            toast.error("Failed to analyze document");
          }
        }, 3000);

      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload document");
      } finally {
        setLoading(false);
      }
    } else if (activeConversation) {
      // Add user message to existing conversation
      const userMessage = {
        id: Date.now(),
        type: "user",
        content: message,
        timestamp: new Date()
      };

      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        content: "I'm processing your question. Let me review the document details...",
        timestamp: new Date(),
        isTyping: true
      };

      // Update active conversation
      const updatedConversation = {
        ...activeConversation,
        messages: [...activeConversation.messages, userMessage, aiResponse]
      };

      setActiveConversation(updatedConversation);
      setConversations(prev => prev.map(conv => 
        conv.Id === activeConversation.Id ? updatedConversation : conv
      ));

      // Simulate AI response
      setTimeout(() => {
        const finalResponse = {
          ...aiResponse,
          content: "Based on your document, here's what I can tell you: " + message.toLowerCase().includes('explain') 
            ? "Let me break down that section in simpler terms. This clause means that you are responsible for any damages that occur, but only up to the amount you've paid under this contract. It's a way to limit how much you could owe if something goes wrong."
            : "That's a great question. From what I can see in your document, this appears to be a standard clause that protects both parties involved. Would you like me to explain any specific part in more detail?",
          isTyping: false
        };

        setActiveConversation(prev => prev ? {
          ...prev,
          messages: prev.messages.map(msg => msg.id === aiResponse.id ? finalResponse : msg)
        } : null);

        setConversations(prev => prev.map(conv => 
          conv.Id === activeConversation.Id 
            ? {
                ...conv,
                messages: conv.messages.map(msg => msg.id === aiResponse.id ? finalResponse : msg)
              }
            : conv
        ));
      }, 2000);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header user={user} />
      
      {/* Main Dashboard Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar - Conversation History */}
        <motion.aside
          initial={{ x: -320 }}
          animate={{ x: sidebarOpen ? 0 : -320 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed lg:relative z-50 lg:z-0 w-80 h-full bg-white border-r border-gray-200 lg:translate-x-0"
        >
          <ConversationList
            conversations={conversations}
            activeConversation={activeConversation}
            onConversationSelect={handleConversationSelect}
            onNewDocumentAnalysis={handleNewDocumentAnalysis}
          />
        </motion.aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 mr-3"
            >
              <ApperIcon name="Menu" size={20} className="text-gray-600" />
            </button>
            <h1 className="font-semibold text-gray-900">
              {activeConversation ? activeConversation.title : "New Document Analysis"}
            </h1>
          </div>

          <ChatArea
            conversation={activeConversation}
            onSendMessage={handleSendMessage}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;