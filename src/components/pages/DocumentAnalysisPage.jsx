import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
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

        {/* How It Works Section */}
        <section className="py-16 bg-gradient-to-br from-accent-50 to-primary-50 border-b border-accent-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-primary-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Get clarity on any legal document in three simple steps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-accent-200 hover:shadow-xl transition-all duration-300 text-center section-card"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="FileText" size={28} className="text-white" />
                </div>
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-accent-100 text-accent-600 font-bold rounded-full text-sm mb-4">
                    1
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">Upload Your Document</h3>
                <p className="text-primary-600 leading-relaxed">
                  Drag and drop any PDF, photo, or Word document. Our secure platform supports all common file formats and keeps your documents private.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-accent-200 hover:shadow-xl transition-all duration-300 text-center section-card"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="Brain" size={28} className="text-white" />
                </div>
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-success-100 text-success-600 font-bold rounded-full text-sm mb-4">
                    2
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">Get Instant Analysis</h3>
                <p className="text-primary-600 leading-relaxed">
                  Our AI instantly breaks down complex legal language into plain English, highlighting key terms, risks, and important clauses you need to know.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-accent-200 hover:shadow-xl transition-all duration-300 text-center section-card"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="CheckCircle" size={28} className="text-white" />
                </div>
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-600 font-bold rounded-full text-sm mb-4">
                    3
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">Make Informed Decisions</h3>
                <p className="text-primary-600 leading-relaxed">
                  See exactly what you're agreeing to with clear summaries, potential risks, and actionable insights to help you make confident decisions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-16 bg-gradient-to-br from-error-50 to-warning-50 border-b border-error-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                The Problem
              </h2>
              <p className="text-xl text-primary-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Every day, millions of people sign legal documents they don't fully understand
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-error-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-error-500 to-error-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-primary-900 mb-3 text-center">Hidden Lease Fees</h3>
                <p className="text-primary-600 text-sm text-center">
                  People sign rental agreements without understanding hidden fees, pet deposits, or early termination penalties
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-warning-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="font-semibold text-primary-900 mb-3 text-center">Employment Confusion</h3>
                <p className="text-primary-600 text-sm text-center">
                  Workers agree to employment terms that weren't what they thought, losing benefits or flexibility
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-error-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="font-semibold text-primary-900 mb-3 text-center">Divorce Overwhelm</h3>
                <p className="text-primary-600 text-sm text-center">
                  People feel overwhelmed by divorce paperwork, missing important rights or obligations
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-warning-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold text-primary-900 mb-3 text-center">Expensive Explanations</h3>
                <p className="text-primary-600 text-sm text-center">
                  People pay lawyers hundreds of dollars just to explain what a document means
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-12"
            >
              <p className="text-lg text-primary-700 font-medium">
                You worry you've missed something important, but hiring a lawyer feels too expensive for every document.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The Solution Section */}
        <section className="py-16 bg-gradient-to-br from-success-50 to-accent-50 border-b border-success-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                The Solution
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-success-200 max-w-4xl mx-auto mb-8">
                <p className="text-2xl font-bold text-primary-900 mb-4">
                  Legaleaze is like Google Translate, but for legal documents
                </p>
                <p className="text-lg text-primary-600 leading-relaxed">
                  We instantly transform complex legal jargon into plain English that anyone can understand, 
                  helping you make informed decisions with confidence.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-success-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3 text-center">Instant Plain English</h3>
                <p className="text-primary-600 text-center">
                  Complex legal language translated into clear, simple terms you can actually understand
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-error-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-error-500 to-error-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚨</span>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3 text-center">Red Flag Warnings</h3>
                <p className="text-primary-600 text-center">
                  Automatic alerts for unfavorable terms, hidden fees, and clauses that could hurt you
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-accent-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3 text-center">Key Dates</h3>
                <p className="text-primary-600 text-center">
                  Important deadlines, cancellation periods, and renewal dates highlighted so you never miss them
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-warning-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💵</span>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3 text-center">Financial Breakdown</h3>
                <p className="text-primary-600 text-center">
                  Clear summary of all costs, fees, penalties, and financial obligations in simple terms
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-primary-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
<h3 className="text-lg font-semibold text-primary-900 mb-3 text-center">Your Rights Explained</h3>
                <p className="text-primary-600 text-center">
                  Clear explanations of your rights, protections, and what you can and cannot do
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-success-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3 text-center">Confidence to Sign</h3>
                <p className="text-primary-600 text-center">
                  Make informed decisions with complete understanding, no more signing blindly
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-primary-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                Choose Your Plan
              </h2>
              <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                Start free and upgrade as your needs grow. No hidden fees. Cancel anytime. We practice what we preach.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Forever Plan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-primary-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Free Forever</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary-900">$0</span>
                    <span className="text-primary-600 ml-2">forever</span>
                  </div>
                  <p className="text-primary-600">Perfect for trying us out</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">2 documents per month</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Basic translation</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Red flag detection</span>
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = '/signin'}
                >
                  Get Started Free
                </Button>
              </motion.div>

              {/* Personal Plan - Most Popular */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-8 shadow-xl border-2 border-accent-500 hover:shadow-2xl transition-all duration-300 relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Personal</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary-900">$24.99</span>
                    <span className="text-primary-600 ml-2">/month</span>
                  </div>
                  <p className="text-primary-600">Everything you need for personal use</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Unlimited documents</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Advanced risk analysis</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Deadline tracking</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">All Free features</span>
                  </li>
                </ul>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => window.location.href = '/signin'}
                >
                  Start Personal Plan
                </Button>
              </motion.div>

              {/* Family Plan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-primary-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Family</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary-900">$39.99</span>
                    <span className="text-primary-600 ml-2">/month</span>
                  </div>
                  <p className="text-primary-600">Complete family legal protection</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Everything in Personal</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Divorce/custody features</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Child support calculator</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Custody calendar</span>
                  </li>
                  <li className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success-500 mr-3 flex-shrink-0" />
                    <span className="text-primary-700">Family document sharing</span>
                  </li>
                </ul>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = '/signin'}
                >
                  Start Family Plan
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-primary-600 font-medium">
                No hidden fees. Cancel anytime. We practice what we preach.
              </p>
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
                Powerful Legal Document Analysis
              </h2>
              <p className="text-primary-600 max-w-2xl mx-auto">
                Advanced AI capabilities to help you understand, analyze, and manage your legal documents with confidence.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <ApperIcon name="FileText" className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Document Type Support
                </h3>
                <p className="text-primary-600 text-sm">
                  Analyze rental agreements, employment contracts, divorce documents, NDAs, and more with specialized recognition.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-warning-50 to-warning-100 border border-warning-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <ApperIcon name="AlertTriangle" className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Smart Risk Detection
                </h3>
                <p className="text-primary-600 text-sm">
                  Automatic identification of red flags, hidden fees, unfavorable terms, and potential legal risks in your documents.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-success-50 to-success-100 border border-success-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <ApperIcon name="Calendar" className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Deadline Management
                </h3>
                <p className="text-primary-600 text-sm">
                  Extract important dates, deadlines, and milestones with automatic reminders to keep you on track.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <ApperIcon name="Calculator" className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Financial Analysis
                </h3>
                <p className="text-primary-600 text-sm">
                  Automatic cost calculations, payment schedules, interest rates, and financial obligation breakdowns.
                </p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary-50 to-secondary-100 border border-secondary-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <ApperIcon name="GitCompare" className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Document Comparison
                </h3>
                <p className="text-primary-600 text-sm">
                  Side-by-side comparison of contract versions, highlighting changes, additions, and key differences.
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