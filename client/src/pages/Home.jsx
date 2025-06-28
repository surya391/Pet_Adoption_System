import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { userInfo } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
          🐾 Welcome to Pet Pals!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Find your perfect furry friend or a loving temporary home for your pet.
          Trusted by hundreds of pet lovers and caretakers. Secure, Simple, and Heartfelt. 💖
        </p>

        {!userInfo && (
          <button
            onClick={() => navigate('/login')}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300"
          >
            Login to Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
