import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { getAuthHeaders } from '../store/auth';
import CustomButton from './CustomButton';
import { API_URL } from '../config/config';

const SaveDesignButton = () => {
  const snap = useSnapshot(state);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!snap.isAuthenticated) {
      state.authModalOpen = true;
      state.authMode = 'login';
      return;
    }

    const designName = prompt('Enter a name for your design:');
    if (!designName) return;

    setSaving(true);

    try {
      // Capture thumbnail
      const canvas = document.querySelector('canvas');
      const thumbnail = canvas.toDataURL();

      const designData = {
        name: designName,
        productType: 'tshirt',
        color: snap.color,
        isLogoTexture: snap.isLogoTexture,
        isFullTexture: snap.isFullTexture,
        logoDecal: snap.logoDecal,
        fullDecal: snap.fullDecal,
        thumbnail
      };

      const response = await fetch(`${API_URL}/api/v1/designs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(designData)
      });

      if (!response.ok) throw new Error('Failed to save design');

      alert('Design saved successfully!');
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Failed to save design');
    } finally {
      setSaving(false);
    }
  };

  return (
    <CustomButton
      type="outline"
      title={saving ? 'Saving...' : 'Save Design'}
      handleClick={handleSave}
      customStyles="px-4 py-2 text-sm"
    />
  );
};

export default SaveDesignButton;
