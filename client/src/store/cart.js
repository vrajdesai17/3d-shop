import state from './index';

export const addToCart = (item) => {
  const existingItem = state.cart.find(
    i => i.productType === item.productType &&
         i.color === item.color &&
         i.logoDecal === item.logoDecal &&
         i.fullDecal === item.fullDecal
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(state.cart));
};

export const removeFromCart = (index) => {
  state.cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

export const updateCartQuantity = (index, quantity) => {
  if (quantity <= 0) {
    removeFromCart(index);
  } else {
    state.cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }
};

export const clearCart = () => {
  state.cart = [];
  localStorage.removeItem('cart');
};

export const getCartTotal = () => {
  return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};
