import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.model.js';
import connectDB from './config/database.js';

dotenv.config();

const products = [
  {
    name: 'T-Shirt',
    type: 'tshirt',
    basePrice: 25,
    model3D: './shirt_baked.glb',
    decalPositions: {
      logo: {
        position: [0, 0.04, 0.15],
        rotation: [0, 0, 0],
        scale: 0.15
      },
      full: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 1
      }
    },
    icon: './tshirt-icon.png',
    isActive: true
  },
  {
    name: 'Hoodie',
    type: 'hoodie',
    basePrice: 45,
    model3D: './hoodie_baked.glb',
    decalPositions: {
      logo: {
        position: [0, 0.08, 0.15],
        rotation: [0, 0, 0],
        scale: 0.15
      },
      full: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 1
      }
    },
    icon: './hoodie-icon.png',
    isActive: true
  },
  {
    name: 'Mug',
    type: 'mug',
    basePrice: 15,
    model3D: './mug_baked.glb',
    decalPositions: {
      logo: {
        position: [0, 0.05, 0.08],
        rotation: [0, 0, 0],
        scale: 0.1
      },
      full: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 0.8
      }
    },
    icon: './mug-icon.png',
    isActive: true
  },
  {
    name: 'Phone Case',
    type: 'phonecase',
    basePrice: 20,
    model3D: './phonecase_baked.glb',
    decalPositions: {
      logo: {
        position: [0, 0, 0.01],
        rotation: [0, 0, 0],
        scale: 0.08
      },
      full: {
        position: [0, 0, 0.01],
        rotation: [0, 0, 0],
        scale: 0.18
      }
    },
    icon: './phonecase-icon.png',
    isActive: true
  },
  {
    name: 'Tote Bag',
    type: 'totebag',
    basePrice: 18,
    model3D: './totebag_baked.glb',
    decalPositions: {
      logo: {
        position: [0, 0.1, 0.1],
        rotation: [0, 0, 0],
        scale: 0.15
      },
      full: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: 1
      }
    },
    icon: './totebag-icon.png',
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('your-username')) {
      console.log('❌ Cannot seed database: MongoDB URI not configured');
      console.log('   Please update .env with your MongoDB Atlas connection string first.');
      process.exit(1);
    }

    console.log('🌱 Seeding database...');

    await Product.deleteMany();
    console.log('   Cleared existing products');

    await Product.insertMany(products);
    console.log('   ✅ Inserted 5 products');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
