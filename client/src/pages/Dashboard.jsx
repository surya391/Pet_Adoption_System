
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {userInfo?.name || 'Pet Lover'}! 🐾
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Here’s what you can do today in your pet adoption journey:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-yellow-100 p-5 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🐶 View Pets</h3>
            <p className="text-gray-700">Explore adorable pets available for adoption near you.</p>
          </div>

          <div className="bg-green-100 p-5 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📋 My Listings</h3>
            <p className="text-gray-700">Manage your uploaded pets, check adoption requests.</p>
          </div>

          <div className="bg-blue-100 p-5 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">❤️ Favorites</h3>
            <p className="text-gray-700">See your favorite pets and revisit them anytime.</p>
          </div>

          <div className="bg-red-100 p-5 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🔔 Notifications</h3>
            <p className="text-gray-700">Stay updated with latest adoption updates and messages.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
