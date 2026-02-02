import Product from '../models/Product.model.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProductByType = async (req, res) => {
  try {
    const product = await Product.findOne({ type: req.params.type, isActive: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

export const calculatePrice = async (req, res) => {
  try {
    const { productType, hasLogoTexture, hasFullTexture } = req.body;

    const product = await Product.findOne({ type: productType });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let price = product.basePrice;

    // Add pricing logic
    if (hasLogoTexture) price += 5; // Additional cost for logo
    if (hasFullTexture) price += 10; // Additional cost for full texture

    res.json({ price });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating price' });
  }
};
