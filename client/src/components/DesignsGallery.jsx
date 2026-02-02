import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { getAuthHeaders } from '../store/auth';
import CustomButton from './CustomButton';
import { fadeAnimation } from '../config/motion';
import { API_URL } from '../config/config';

const DesignsGallery = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    if (snap.designsGalleryOpen && snap.isAuthenticated) {
      fetchDesigns();
    }
  }, [snap.designsGalleryOpen]);

  const fetchDesigns = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/designs`, {
        headers: getAuthHeaders()
      });

      const data = await response.json();
      state.savedDesigns = data;
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

  const loadDesign = (design) => {
    state.color = design.color;
    state.isLogoTexture = design.isLogoTexture;
    state.isFullTexture = design.isFullTexture;
    state.logoDecal = design.logoDecal;
    state.fullDecal = design.fullDecal;
    state.currentDesignId = design._id;
    state.designsGalleryOpen = false;
  };

  const deleteDesign = async (designId) => {
    if (!confirm('Are you sure you want to delete this design?')) return;

    try {
      await fetch(`${API_URL}/api/v1/designs/${designId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      state.savedDesigns = snap.savedDesigns.filter(d => d._id !== designId);
    } catch (error) {
      console.error('Error deleting design:', error);
    }
  };

  return (
    <AnimatePresence>
      {snap.designsGalleryOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            {...fadeAnimation}
            onClick={() => state.designsGalleryOpen = false}
          />
          <motion.div
            className="fixed inset-0 m-auto w-full max-w-4xl h-fit max-h-[80vh] glassmorphism shadow-2xl z-50 p-6 rounded-lg overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Saved Designs</h2>
              <button
                onClick={() => state.designsGalleryOpen = false}
                className="text-2xl hover:opacity-70"
              >
                ×
              </button>
            </div>

            {snap.savedDesigns.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No saved designs yet</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {snap.savedDesigns.map((design) => (
                  <div key={design._id} className="border rounded-lg p-3 hover:shadow-lg transition-shadow">
                    <div
                      className="w-full h-40 rounded mb-2"
                      style={{ backgroundColor: design.color }}
                    />
                    <h3 className="font-semibold truncate">{design.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{design.productType}</p>
                    <div className="flex gap-2">
                      <CustomButton
                        type="filled"
                        title="Load"
                        handleClick={() => loadDesign(design)}
                        customStyles="text-xs px-2 py-1"
                      />
                      <CustomButton
                        type="outline"
                        title="Delete"
                        handleClick={() => deleteDesign(design._id)}
                        customStyles="text-xs px-2 py-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DesignsGallery;
