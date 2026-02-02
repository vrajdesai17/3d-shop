import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { setUser } from '../store/auth';
import CustomButton from './CustomButton';
import { fadeAnimation } from '../config/motion';
import { API_URL } from '../config/config';

const AuthModal = () => {
  const snap = useSnapshot(state);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = snap.authMode === 'login' ? '/api/v1/auth/login' : '/api/v1/auth/register';
      const body = snap.authMode === 'login'
        ? { email, password }
        : { email, password, name };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      setUser(data, data.token);
      state.authModalOpen = false;
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {snap.authModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          {...fadeAnimation}
          onClick={() => state.authModalOpen = false}
        >
          <motion.div
            className="glassmorphism p-8 rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              {snap.authMode === 'login' ? 'Login' : 'Sign Up'}
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {snap.authMode === 'register' && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />

              <CustomButton
                type="filled"
                title={loading ? 'Please wait...' : snap.authMode === 'login' ? 'Login' : 'Sign Up'}
                customStyles="w-full py-3 font-bold"
                handleClick={handleSubmit}
              />
            </form>

            <p className="text-center mt-4 text-sm">
              {snap.authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => state.authMode = snap.authMode === 'login' ? 'register' : 'login'}
                className="text-blue-600 hover:underline font-semibold"
              >
                {snap.authMode === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
