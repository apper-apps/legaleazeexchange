import { toast } from 'react-toastify';
import mockAnalyses from "@/services/mockData/analyses.json";

class DocumentService {
  constructor() {
    this.initializeApperClient();
    this.walletConnected = false;
    this.currentAccount = null;
  }

  // Initialize ApperClient
  initializeApperClient() {
    try {
      if (typeof window !== 'undefined' && window.ApperSDK) {
        const { ApperClient } = window.ApperSDK;
        this.apperClient = new ApperClient({
          apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
          apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
        });
      }
    } catch (error) {
      console.warn('ApperClient initialization failed:', error);
    }
  }

  // Get all documents
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "size" } },
          { field: { Name: "type" } },
          { field: { Name: "uploadDate" } },
          { field: { Name: "status" } },
          { field: { Name: "walletAddress" } }
        ],
        orderBy: [
          {
            fieldName: "uploadDate",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords('document', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching documents:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  // Get document by ID
  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "size" } },
          { field: { Name: "type" } },
          { field: { Name: "uploadDate" } },
          { field: { Name: "status" } },
          { field: { Name: "walletAddress" } }
        ]
      };

      const response = await this.apperClient.getRecordById('document', id, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching document with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Create/Upload document
  async uploadDocument(file) {
    try {
      const documentData = {
        Name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        status: "uploaded",
        walletAddress: this.currentAccount || null
      };

      const params = {
        records: [documentData]
      };

      const response = await this.apperClient.createRecord('document', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create document ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error uploading document:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Analyze document
  async analyzeDocument(documentId) {
    try {
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get mock analysis data for now (later this would be actual AI analysis)
      const mockAnalysis = mockAnalyses[0];
      
      const analysis = {
        documentId: documentId,
        sections: JSON.stringify(mockAnalysis.sections),
        plainEnglish: mockAnalysis.plainEnglish,
        keyTerms: JSON.stringify(mockAnalysis.keyTerms),
        timestamp: new Date().toISOString(),
        analyzedBy: this.currentAccount || 'system'
      };

      // Save analysis to database
      const analysisService = await import('./analysisService.js');
      const savedAnalysis = await analysisService.default.create(analysis);

      // Update document status
      await this.updateDocument(documentId, { status: "analyzed" });

      return {
        documentId: documentId,
        sections: mockAnalysis.sections,
        plainEnglish: mockAnalysis.plainEnglish,
        keyTerms: mockAnalysis.keyTerms,
        timestamp: new Date().toISOString(),
        analyzedBy: this.currentAccount || 'system'
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error analyzing document:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  // Update document
  async updateDocument(id, data) {
    try {
      const params = {
        records: [
          {
            Id: id,
            ...data
          }
        ]
      };

      const response = await this.apperClient.updateRecord('document', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update document ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating document:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Delete document
  async deleteDocument(id) {
    try {
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord('document', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete document ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting document:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }

  // MetaMask wallet functions (preserved for compatibility)
  async connectMetaMask() {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask and try again.');
      }

      this.currentAccount = accounts[0];
      this.walletConnected = true;

      return {
        success: true,
        account: this.currentAccount,
        message: 'Successfully connected to MetaMask'
      };
    } catch (error) {
      this.walletConnected = false;
      this.currentAccount = null;
      throw error;
    }
  }

  disconnectWallet() {
    this.walletConnected = false;
    this.currentAccount = null;
  }

  isWalletConnected() {
    return this.walletConnected && this.currentAccount;
  }

  getCurrentAccount() {
    return this.currentAccount;
}
}

export const documentService = new DocumentService();