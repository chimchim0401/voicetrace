import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [codeG, setCodeG] = useState('');
  const [email, setEmail] = useState('');

  return (
    <AuthContext.Provider value={{ codeG, setCodeG, email, setEmail}}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};