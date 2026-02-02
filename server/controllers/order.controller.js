import Order from '../models/Order.model.js';
import User from '../models/User.model.js';

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { orders: order._id }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product');

    if (!order || order.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order' });
  }
};
