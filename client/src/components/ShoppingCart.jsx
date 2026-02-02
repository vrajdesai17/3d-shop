import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { removeFromCart, updateCartQuantity, getCartTotal } from '../store/cart';
import CustomButton from './CustomButton';
import { slideAnimation, fadeAnimation } from '../config/motion';

const ShoppingCart = () => {
  const snap = useSnapshot(state);

  const handleCheckout = () => {
    if (!snap.isAuthenticated) {
      state.authModalOpen = true;
      state.authMode = 'login';
      state.cartOpen = false;
      return;
    }

    if (snap.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Open checkout modal
    state.checkoutOpen = true;
    state.cartOpen = false;
  };

  return (
    <AnimatePresence>
      {snap.cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            {...fadeAnimation}
            onClick={() => state.cartOpen = false}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md glassmorphism shadow-2xl z-50 p-6 overflow-y-auto"
            {...slideAnimation('right')}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => state.cartOpen = false}
                className="text-2xl hover:opacity-70"
              >
                ×
              </button>
            </div>

            {snap.cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {snap.cart.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <div className="flex gap-4">
                        <div
                          className="w-20 h-20 rounded"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.productName}</h3>
                          <p className="text-sm text-gray-600">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateCartQuantity(index, item.quantity - 1)}
                              className="px-2 py-1 border rounded"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(index, item.quantity + 1)}
                              className="px-2 py-1 border rounded"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-lg">${getCartTotal().toFixed(2)}</span>
                  </div>

                  <CustomButton
                    type="filled"
                    title="Proceed to Checkout"
                    handleClick={handleCheckout}
                    customStyles="w-full py-3 font-bold"
                  />
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
