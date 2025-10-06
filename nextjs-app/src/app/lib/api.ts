//This works as an utility file.
import axios from 'axios';

// Base URL automatically adjusts for environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Empty for relative URLs in production
  : 'http://localhost:3000'; // Localhost for development

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;