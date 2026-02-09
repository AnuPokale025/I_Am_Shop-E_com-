import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (key, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: isLoading
    }));
  };

  const isLoading = (key) => {
    return loadingStates[key] || false;
  };

  const anyLoading = () => {
    return Object.values(loadingStates).some(state => state);
  };

  const value = {
    setLoading,
    isLoading,
    anyLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};