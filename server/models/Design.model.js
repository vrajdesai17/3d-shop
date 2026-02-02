import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    default: 'Untitled Design'
  },
  productType: {
    type: String,
    enum: ['tshirt', 'hoodie', 'mug', 'phonecase', 'totebag'],
    default: 'tshirt'
  },
  color: {
    type: String,
    default: '#EFBD48'
  },
  isLogoTexture: {
    type: Boolean,
    default: true
  },
  isFullTexture: {
    type: Boolean,
    default: false
  },
  logoDecal: {
    type: String,
    default: './threejs.png'
  },
  fullDecal: {
    type: String,
    default: './threejs.png'
  },
  thumbnail: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('Design', designSchema);
