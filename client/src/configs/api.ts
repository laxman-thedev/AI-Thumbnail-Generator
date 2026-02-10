import axios from "axios";

/**
 * Configured Axios instance used for all API requests.
 * - baseURL: reads from VITE_BASE_URL env variable, falls back to localhost:3000
 * - withCredentials: enables sending cookies for session-based authentication
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
    withCredentials: true,
})

export default api;