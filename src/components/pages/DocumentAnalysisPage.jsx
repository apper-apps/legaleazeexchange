import { motion } from "framer-motion";
import React from "react";
import DocumentAnalyzer from "@/components/organisms/DocumentAnalyzer";
import Header from "@/components/organisms/Header";
import Button from "@/components/atoms/Button";

const DocumentAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pb-12"
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white via-primary-50 to-accent-50 border-b border-primary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
<h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6 leading-tight">
                Never Sign Another Contract
                <span className="block bg-gradient-to-r from-accent-600 to-accent-500 bg-clip-text text-transparent">
                  You Don't Understand
                </span>
              </h1>
              <p className="text-xl text-primary-600 mb-4 leading-relaxed font-medium">
                Stop getting trapped by legal jargon. Legaleaze translates any legal document into plain English in seconds.
              </p>
              <p className="text-lg text-primary-500 mb-8 leading-relaxed">
                From rental agreements to divorce papers - understand exactly what you're signing before it's too late.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span>Instant Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span>Plain English</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span>Secure & Private</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

{/* Call to Action Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                Ready to Understand Your Legal Documents?
              </h2>
              <p className="text-lg text-primary-600 mb-8 max-w-2xl mx-auto">
                Join thousands who've already avoided legal pitfalls by understanding their contracts before signing.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    // Scroll to upload section or navigate to analyzer
                    const element = document.getElementById('features');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get Started Free
                </Button>
              </motion.div>
              <p className="text-sm text-primary-400 mt-4">
                No credit card required • Secure & Private • Instant Results
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-16 border-t border-primary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary-900 mb-4">
                Why Choose Legaleaze?
              </h2>
              <p className="text-primary-600 max-w-2xl mx-auto">
                We make legal documents accessible to everyone with advanced AI analysis 
                and clear explanations.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <span className="text-2xl">🚀</span>
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Instant Analysis
                </h3>
                <p className="text-primary-600">
                  Get your document analyzed in seconds, not hours. Upload and receive 
                  immediate insights.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-success-50 to-success-100 border border-success-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <span className="text-2xl">💡</span>
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Plain English
                </h3>
                <p className="text-primary-600">
                  Complex legal jargon translated into clear, understandable language 
                  anyone can follow.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <span className="text-2xl">🔒</span>
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Secure & Private
                </h3>
                <p className="text-primary-600">
                  Your documents are processed securely and never stored. Complete 
                  privacy guaranteed.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
};

export default DocumentAnalysisPage;