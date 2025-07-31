import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/atoms/Card';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { userService } from '@/services/api/userService';

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    telephone: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (isSignUp) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.telephone) {
        newErrors.telephone = 'Telephone is required';
      } else if (!/^\+?[\d\s\-()]+$/.test(formData.telephone)) {
        newErrors.telephone = 'Invalid telephone format';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setLoading(true);
    
    try {
      if (isSignUp) {
        const user = await userService.signUp(formData);
        toast.success(`Welcome ${user.firstName}! Account created successfully.`);
      } else {
        const user = await userService.signIn(formData.email, formData.password);
        toast.success(`Welcome back, ${user.firstName}!`);
      }
      
      // Navigate back to main page after successful auth
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: formData.email,
      password: '',
      firstName: '',
      lastName: '',
      telephone: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-primary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center"
            >
              <ApperIcon name="User" size={24} className="text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-primary-900 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-primary-600 text-sm">
              {isSignUp 
                ? 'Join us and start analyzing your documents' 
                : 'Sign in to continue to your account'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    className="h-11"
                  />
                  {errors.firstName && (
                    <p className="text-error-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    className="h-11"
                  />
                  {errors.lastName && (
                    <p className="text-error-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </motion.div>
            )}

            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Telephone
                </label>
                <Input
                  name="telephone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  error={errors.telephone}
                  className="h-11"
                />
                {errors.telephone && (
                  <p className="text-error-500 text-xs mt-1">{errors.telephone}</p>
                )}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                className="h-11"
              />
              {errors.email && (
                <p className="text-error-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Password
              </label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                className="h-11"
              />
              {errors.password && (
                <p className="text-error-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full h-12 mt-6"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </div>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-primary-600 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-1 text-accent-600 hover:text-accent-700 font-medium transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-primary-500 hover:text-primary-700 text-sm font-medium transition-colors flex items-center gap-1 mx-auto"
            >
              <ApperIcon name="ArrowLeft" size={16} />
              Back to Home
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignInPage;