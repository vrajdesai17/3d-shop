import state from './index';

export const setUser = (user, token) => {
  state.user = user;
  state.isAuthenticated = true;
  state.authToken = token;
  localStorage.setItem('authToken', token);
};

export const logout = () => {
  state.user = null;
  state.isAuthenticated = false;
  state.authToken = null;
  state.savedDesigns = [];
  localStorage.removeItem('authToken');
};

export const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${state.authToken}`
  };
};
