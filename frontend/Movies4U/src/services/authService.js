import axios from 'axios';
import API_ENDPOINTS from '../api.js';

export const signUp = async (data) => {
    try {
        const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signIn = async (data) => {
    try {
        const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
