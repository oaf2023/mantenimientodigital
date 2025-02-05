// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
};

export const verifyToken = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/protected`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.error;
    }
};
