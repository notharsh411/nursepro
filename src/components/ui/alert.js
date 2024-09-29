import React from 'react';

export const Alert = ({ children, className }) => (
  <div className={`bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 ${className}`} role="alert">
    {children}
  </div>
);

export const AlertTitle = ({ children }) => (
  <h4 className="text-lg font-semibold mb-2">{children}</h4>
);

export const AlertDescription = ({ children }) => (
  <p>{children}</p>
);