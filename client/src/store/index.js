import { proxy } from 'valtio';

const state = proxy({
  // Existing state
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',

  // Authentication
  user: null,
  isAuthenticated: false,
  authToken: typeof window !== 'undefined' ? localStorage.getItem('authToken') : null,

  // Saved designs
  savedDesigns: [],
  currentDesignId: null,
  designsGalleryOpen: false,

  // UI modals
  authModalOpen: false,
  authMode: 'login', // 'login' or 'register'
});

export default state;