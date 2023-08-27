import React from 'react';

const Layout = ({ children, className = "" }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <div className="mx-auto">{children}</div>
    </div>
  );
}

export default Layout;
