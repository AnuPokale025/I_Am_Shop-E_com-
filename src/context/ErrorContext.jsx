import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  const addError = (error) => {
    const errorId = Date.now().toString();
    const newError = {
      id: errorId,
      message: error.message || error,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setErrors(prev => [...prev, newError]);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
      removeError(errorId);
    }, 5000);
  };

  const removeError = (id) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  };

  const clearAllErrors = () => {
    setErrors([]);
  };

  const value = {
    errors,
    addError,
    removeError,
    clearAllErrors
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};