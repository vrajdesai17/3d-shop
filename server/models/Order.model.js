import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  design: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Design'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  designSnapshot: {
    color: String,
    logoDecal: String,
    fullDecal: String,
    isLogoTexture: Boolean,
    isFullTexture: Boolean
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  paymentInfo: {
    method: String,
    transactionId: String,
    status: String
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
