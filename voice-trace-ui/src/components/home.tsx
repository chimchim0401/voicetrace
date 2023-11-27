import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/check-login');
        setIsLoggedIn(response.data.isLoggedIn);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };

    checkLogin();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Page protégée</h2>
          <p>Connecté en tant que: {email}</p>
        </div>
      ) : (
        <p>Accès non autorisé. Veuillez vous connecter.</p>
      )}
    </div>
  );
};

export default ProtectedPage;