import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { logout } from '../store/auth';
import { motion, AnimatePresence } from 'framer-motion';

const UserProfile = () => {
  const snap = useSnapshot(state);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  if (!snap.isAuthenticated) {
    return (
      <button
        onClick={() => {
          state.authModalOpen = true;
          state.authMode = 'login';
        }}
        className="glassmorphism px-4 py-2 rounded-full text-sm font-semibold hover:opacity-80"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="glassmorphism w-10 h-10 rounded-full flex items-center justify-center font-bold hover:opacity-80"
      >
        {snap.user?.name?.charAt(0).toUpperCase()}
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 glassmorphism rounded-lg shadow-lg py-2 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="font-semibold">{snap.user?.name}</p>
              <p className="text-xs text-gray-600">{snap.user?.email}</p>
            </div>

            <button
              onClick={() => {
                state.designsGalleryOpen = true;
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-white hover:bg-opacity-20 text-sm"
            >
              My Designs
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-white hover:bg-opacity-20 text-sm text-red-600"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
