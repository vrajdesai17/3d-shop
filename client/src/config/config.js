const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const config = {
  development: {
    backendUrl: `${API_URL}/api/v1/dalle`,
  },
  production: {
    backendUrl: `${API_URL}/api/v1/dalle`,
  },
};

export { API_URL };
export default config;
