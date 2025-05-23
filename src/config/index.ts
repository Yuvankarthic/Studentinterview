import { AppConfig } from '../types';

const config: AppConfig = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'
};

export default config;
