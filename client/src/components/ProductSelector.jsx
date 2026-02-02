import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

const ProductSelector = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    // Fetch available products on mount
    fetch('http://localhost:8080/api/v1/products')
      .then(res => res.json())
      .then(data => state.availableProducts = data)
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleProductSelect = (product) => {
    state.selectedProduct = product;
    state.productSelectorOpen = false;
  };

  return (
    <div className="absolute left-full ml-3 glassmorphism p-3 w-[250px] rounded-md">
      <h3 className="text-sm font-semibold mb-3">Select Product</h3>
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {snap.availableProducts.map((product) => (
          <div
            key={product.type}
            onClick={() => handleProductSelect(product)}
            className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-white hover:bg-opacity-20 ${
              snap.selectedProduct.type === product.type ? 'bg-white bg-opacity-30' : ''
            }`}
          >
            <div className="w-10 h-10 rounded flex items-center justify-center bg-white bg-opacity-20">
              {product.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-gray-600">${product.basePrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;
