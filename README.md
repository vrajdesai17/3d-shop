# 3D Shop - Custom T-Shirt Designer

A modern 3D t-shirt customization web application built with React, Three.js, and Node.js. Users can customize t-shirts in real-time with custom colors, logos, and AI-generated designs.

## Features

- **3D Visualization**: Real-time 3D t-shirt rendering using Three.js and React Three Fiber
- **User Authentication**: Secure login and registration system with JWT
- **Design Customization**:
  - Custom color selection
  - Upload custom logos
  - Apply full-texture designs
  - AI-generated designs using DALL-E
- **Save & Load Designs**: Save your favorite designs and access them anytime
- **Responsive Design**: Beautiful glassmorphism UI that works on all devices

## Tech Stack

### Frontend
- React 18.2.0
- Three.js & React Three Fiber (3D rendering)
- Valtio (State management)
- Framer Motion (Animations)
- Tailwind CSS (Styling)
- Vite (Build tool)

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- OpenAI API (DALL-E integration)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vrajdesai17/3d-shop.git
cd 3d-shop
```

2. Install dependencies:

**Client:**
```bash
cd client
npm install
```

**Server:**
```bash
cd ../server
npm install
```

3. Set up environment variables:

**Server (.env):**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
```

**Client (.env):**
```env
VITE_API_URL=http://localhost:8080
```

4. Start the development servers:

**Server:**
```bash
cd server
npm start
```

**Client:**
```bash
cd client
npm run dev
```

5. Open http://localhost:5173 in your browser

## Deployment

The application is configured for deployment on Vercel:

### Deploy Server
```bash
cd server
vercel --prod
```

### Deploy Client
```bash
cd client
vercel --prod
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
3d-shop/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/        # Images and static files
│   │   ├── canvas/        # Three.js 3D components
│   │   ├── components/    # React components
│   │   ├── config/        # Configuration files
│   │   ├── pages/         # Page components
│   │   └── store/         # State management
│   └── public/            # Public assets
│
└── server/                # Backend Node.js application
    ├── config/            # Database configuration
    ├── controllers/       # Route controllers
    ├── middleware/        # Custom middleware
    ├── models/            # Mongoose models
    └── routes/            # API routes
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile

### Designs
- `GET /api/v1/designs` - Get all user designs
- `POST /api/v1/designs` - Save new design
- `GET /api/v1/designs/:id` - Get specific design
- `DELETE /api/v1/designs/:id` - Delete design

### AI Generation
- `POST /api/v1/dalle` - Generate AI image with DALL-E

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

**Vraj Desai**
- GitHub: [@vrajdesai17](https://github.com/vrajdesai17)

## Acknowledgments

- Three.js for 3D rendering capabilities
- OpenAI for DALL-E API
- Vercel for hosting
