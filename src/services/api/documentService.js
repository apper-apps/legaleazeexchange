import mockDocuments from "@/services/mockData/documents.json";
import mockAnalyses from "@/services/mockData/analyses.json";

class DocumentService {
  constructor() {
    this.documents = [...mockDocuments];
    this.analyses = [...mockAnalyses];
    this.nextId = Math.max(...this.documents.map(d => d.Id), 0) + 1;
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
      status: "uploaded"
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
      timestamp: new Date().toISOString()
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