import React from 'react';
import Login from '../components/Login';

const LoginPage = (props) => {
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 to-pink-200">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-pink-500">Recipe Roulette</h1>
        <Login {...props} />
      </div>
    

    
    </div>

  );
};

export default LoginPage; 
// min-h-screen bg-gradient-to-br from-purple-200 to-pink-200