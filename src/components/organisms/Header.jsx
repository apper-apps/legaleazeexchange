import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = () => {
  return (
    <motion.header 
      className="bg-white border-b border-primary-200 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <ApperIcon name="Scale" className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-900 to-primary-700 bg-clip-text text-transparent">
                Legaleaze
              </h1>
              <p className="text-sm text-primary-600 -mt-1">
                Legal documents in plain English
              </p>
            </div>
          </div>
          
<nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-primary-600 hover:text-primary-900 transition-colors duration-200 font-medium"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-primary-600 hover:text-primary-900 transition-colors duration-200 font-medium"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-primary-600 hover:text-primary-900 transition-colors duration-200 font-medium"
            >
              Contact
            </a>
            <Button 
              variant="primary" 
              size="sm"
              className="ml-4"
              onClick={() => {
                // TODO: Implement sign in functionality
                console.log('Sign in clicked');
              }}
            >
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;