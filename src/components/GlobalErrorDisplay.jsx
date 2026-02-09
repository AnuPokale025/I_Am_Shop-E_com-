import React from 'react';
import { useError } from '../context/ErrorContext';
import { X, AlertTriangle } from 'lucide-react';

const GlobalErrorDisplay = () => {
  const { errors, removeError } = useError();

  if (errors.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {errors.map((error) => (
        <div
          key={error.id}
          className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-sm animate-fade-in"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-1 text-sm text-red-700">
                <p>{error.message}</p>
                <p className="text-xs text-red-500 mt-1">{error.timestamp}</p>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => removeError(error.id)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GlobalErrorDisplay;