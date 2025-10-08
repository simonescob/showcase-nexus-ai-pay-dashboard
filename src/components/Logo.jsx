import React from 'react';
import logo from '../assets/logo.png';

const Logo = ({ className = '' }) => {
  return (
    <img
      src={logo}
      alt="ProdDash Logo"
      className={`h-10 w-auto ${className}`}
    />
  );
};

export default Logo;