import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { addToCart } from '../store/cart';
import CustomButton from './CustomButton';

const AddToCartButton = () => {
  const snap = useSnapshot(state);

  const handleAddToCart = () => {
    const cartItem = {
      productType: snap.selectedProduct.type,
      productName: snap.selectedProduct.name,
      color: snap.color,
      logoDecal: snap.logoDecal,
      fullDecal: snap.fullDecal,
      isLogoTexture: snap.isLogoTexture,
      isFullTexture: snap.isFullTexture,
      price: snap.currentPrice
    };

    addToCart(cartItem);
    state.cartOpen = true;
  };

  return (
    <CustomButton
      type="filled"
      title="Add to Cart"
      handleClick={handleAddToCart}
      customStyles="px-4 py-2 text-sm font-bold"
    />
  );
};

export default AddToCartButton;
