import React from 'react';

interface ErrorFallbackProps {
  error: string;
  onRetry?: () => void;
  title?: string;
  message?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  onRetry, 
  title = 'Something went wrong',
  message = 'We couldn\'t load the data. Please try again.'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-[#1D1E2B] rounded-lg p-8 max-w-md w-full text-center">
        <div className="mb-4">
          <svg 
            className="w-16 h-16 mx-auto text-status-error" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        <h2 className="text-text-primary text-xl font-semibold mb-2">{title}</h2>
        <p className="text-text-secondary text-sm mb-4">{message}</p>
        {error && (
          <p className="text-status-error text-xs mb-6 font-mono bg-[#181921] p-2 rounded">
            {error}
          </p>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-brand-secondary hover:bg-brand-secondary/80 text-black font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;

