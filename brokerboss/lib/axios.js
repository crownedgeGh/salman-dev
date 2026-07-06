import axios from 'axios';

// On the client side, use window.location.origin so that mobile browsers
// accessing the app via LAN IP (e.g. 192.168.x.x:3000) resolve /api correctly.
// On the server side (SSR), fall back to the env var or localhost.
const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined') return `${window.location.origin}/api`;
  return 'http://localhost:3000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
