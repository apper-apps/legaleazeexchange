import mockDocuments from "@/services/mockData/documents.json";
import mockAnalyses from "@/services/mockData/analyses.json";

class DocumentService {
  constructor() {
    this.documents = [...mockDocuments];
    this.analyses = [...mockAnalyses];
    this.nextId = Math.max(...this.documents.map(d => d.Id), 0) + 1;
    this.walletConnected = false;
    this.currentAccount = null;
    this.initializeApperSDK();
  }

  // Initialize Apper SDK for blockchain integration
  async initializeApperSDK() {
    try {
      // Check if Apper SDK is loaded
      if (typeof window !== 'undefined' && window.ApperSDK) {
        this.apperSDK = new window.ApperSDK({
          projectId: import.meta.env.VITE_APPER_PROJECT_ID,
          publicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
        });
      }
    } catch (error) {
      console.warn('Apper SDK not available:', error);
    }
  }

  // Connect to MetaMask wallet
  async connectMetaMask() {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask and try again.');
      }

      this.currentAccount = accounts[0];
      this.walletConnected = true;

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          this.disconnectWallet();
        } else {
          this.currentAccount = accounts[0];
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      return {
        success: true,
        account: this.currentAccount,
        message: 'Successfully connected to MetaMask'
      };

    } catch (error) {
      this.walletConnected = false;
      this.currentAccount = null;
      
      // Handle specific MetaMask errors
      if (error.code === 4001) {
        throw new Error('Connection rejected. Please accept the connection request in MetaMask.');
      } else if (error.code === -32002) {
        throw new Error('Connection request already pending in MetaMask. Please check your MetaMask extension.');
      } else {
        throw new Error(`Failed to connect to MetaMask: ${error.message}`);
      }
    }
  }

  // Disconnect wallet
  disconnectWallet() {
    this.walletConnected = false;
    this.currentAccount = null;
  }

  // Check wallet connection status
  isWalletConnected() {
    return this.walletConnected && this.currentAccount;
  }

  // Get current account
  getCurrentAccount() {
    return this.currentAccount;
  }

  // Simulate network delay
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async uploadDocument(file) {
    await this.delay(800);
    
    const document = {
      Id: this.nextId++,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: "uploaded",
      walletAddress: this.currentAccount || null
    };
    
    this.documents.push({ ...document });
    return { ...document };
  }

  async analyzeDocument(documentId) {
    await this.delay(2000);
    
    const document = this.documents.find(d => d.Id === documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    
    // Get mock analysis data
    const mockAnalysis = this.analyses[0];
    
    const analysis = {
      documentId: documentId,
      sections: mockAnalysis.sections,
      plainEnglish: mockAnalysis.plainEnglish,
      keyTerms: mockAnalysis.keyTerms,
      timestamp: new Date().toISOString(),
      analyzedBy: this.currentAccount || 'anonymous'
    };
    
    return { ...analysis };
  }

  async getDocument(id) {
    await this.delay(200);
    const document = this.documents.find(d => d.Id === id);
    return document ? { ...document } : null;
  }

  async deleteDocument(id) {
    await this.delay(300);
    const index = this.documents.findIndex(d => d.Id === id);
    if (index !== -1) {
      const deleted = this.documents.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  }
}

export const documentService = new DocumentService();