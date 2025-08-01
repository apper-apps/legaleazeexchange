import { toast } from 'react-toastify';

class AnalysisService {
  constructor() {
    this.initializeApperClient();
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

  // Get all analyses
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "documentId" } },
          { field: { Name: "sections" } },
          { field: { Name: "plainEnglish" } },
          { field: { Name: "keyTerms" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "analyzedBy" } }
        ],
        orderBy: [
          {
            fieldName: "timestamp",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords('analysis', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching analyses:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  // Get analysis by ID
  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "documentId" } },
          { field: { Name: "sections" } },
          { field: { Name: "plainEnglish" } },
          { field: { Name: "keyTerms" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "analyzedBy" } }
        ]
      };

      const response = await this.apperClient.getRecordById('analysis', id, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching analysis with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Get analyses by document ID
  async getByDocumentId(documentId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "documentId" } },
          { field: { Name: "sections" } },
          { field: { Name: "plainEnglish" } },
          { field: { Name: "keyTerms" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "analyzedBy" } }
        ],
        where: [
          {
            FieldName: "documentId",
            Operator: "EqualTo",
            Values: [documentId]
          }
        ],
        orderBy: [
          {
            fieldName: "timestamp",
            sorttype: "DESC"
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('analysis', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching analyses by document ID:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  // Create analysis
  async create(analysisData) {
    try {
      const params = {
        records: [
          {
            Name: analysisData.Name || `Analysis-${Date.now()}`,
            documentId: parseInt(analysisData.documentId),
            sections: analysisData.sections,
            plainEnglish: analysisData.plainEnglish,
            keyTerms: analysisData.keyTerms,
            timestamp: analysisData.timestamp,
            analyzedBy: analysisData.analyzedBy
          }
        ]
      };

      const response = await this.apperClient.createRecord('analysis', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create analysis ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating analysis:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Update analysis
  async update(id, data) {
    try {
      const params = {
        records: [
          {
            Id: id,
            ...data
          }
        ]
      };

      const response = await this.apperClient.updateRecord('analysis', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update analysis ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
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
        console.error("Error updating analysis:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Delete analysis
  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord('analysis', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete analysis ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting analysis:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
}

export default new AnalysisService();