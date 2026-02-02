import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

const PriceDisplay = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    // Calculate price when design changes
    const calculatePrice = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/products/calculate-price', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productType: snap.selectedProduct.type,
            hasLogoTexture: snap.isLogoTexture,
            hasFullTexture: snap.isFullTexture
          })
        });

        const data = await response.json();
        state.currentPrice = data.price;
      } catch (error) {
        console.error('Error calculating price:', error);
      }
    };

    calculatePrice();
  }, [snap.selectedProduct.type, snap.isLogoTexture, snap.isFullTexture]);

  return (
    <div className="glassmorphism px-4 py-2 rounded-full">
      <span className="text-sm font-semibold">Price: ${snap.currentPrice}</span>
    </div>
  );
};

export default PriceDisplay;
