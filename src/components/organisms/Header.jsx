import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
const Header = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Show different header based on whether user data is provided (dashboard vs marketing)
  const isDashboard = Boolean(user);

  return (
    <>
    <motion.header
      className="bg-white border-b border-gray-200 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <ApperIcon name="Scale" className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Legaleaze
              </h1>
              {!isDashboard && (
                <p className="text-sm text-gray-600 -mt-1">
                  Sign with confidence
                </p>
              )}
            </div>
          </div>

          {/* Dashboard Header - User Info */}
          {isDashboard && user && (
            <div className="flex items-center space-x-4">
              {/* Subscription Badge */}
              <div className="hidden sm:block">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {user.plan}
                </span>
              </div>

              {/* User Avatar */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {user.initials}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Marketing Header - Navigation */}
          {!isDashboard && (
            <>
{/* Desktop Navigation */}
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
              href="#pricing" 
              className="text-primary-600 hover:text-primary-900 transition-colors duration-200 font-medium"
            >
              Pricing
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
                window.location.href = '/signin';
              }}
            >
              Sign In
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <ApperIcon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              size={24} 
              className="text-primary-600"
/>
          </button>
            </>
          )}
        </div>
      </div>
    </motion.header>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />
          
          {/* Mobile Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-primary-800">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <ApperIcon name="X" size={24} className="text-primary-600" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-6">
                  <a 
                    href="#features" 
                    onClick={closeMobileMenu}
                    className="block text-lg text-primary-600 hover:text-primary-900 transition-colors duration-200 font-medium py-2"
                  >
                    Features
                  </a>
                  <a 
                    href="#about" 
                    onClick={closeMobileMenu}
                    className="block text-lg text-primary-600 hover:text-primary-900 transition-colors duration-200 font-medium py-2"
                  >
                    About
                  </a>
                  <a 
                    href="#pricing" 
                    onClick={closeMobileMenu}
                    className="block text-lg text-primary-600 hover:text-primary-900 transition-colors duration-200 font-medium py-2"
                  >
                    Pricing
                  </a>
                  <a 
                    href="#contact" 
                    onClick={closeMobileMenu}
                    className="block text-lg text-primary-600 hover:text-primary-900 transition-colors duration-200 font-medium py-2"
                  >
                    Contact
                  </a>
                </div>

                {/* Sign In Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Button 
                    variant="primary" 
                    size="md"
                    className="w-full"
                    onClick={() => {
                      window.location.href = '/signin';
                      closeMobileMenu();
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default Header;