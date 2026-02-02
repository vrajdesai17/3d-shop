import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['tshirt', 'hoodie', 'mug', 'phonecase', 'totebag'],
    required: true,
    unique: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  model3D: {
    type: String,
    required: true
  },
  decalPositions: {
    logo: {
      position: [Number],
      rotation: [Number],
      scale: Number
    },
    full: {
      position: [Number],
      rotation: [Number],
      scale: Number
    }
  },
  icon: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
