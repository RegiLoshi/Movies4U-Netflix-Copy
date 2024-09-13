import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/profile';


export const signUp = async (data) => {
    try {
        const response = await axios.post(url + 'register', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signIn = async (data) => {
    try {
        const response = await axios.post(url + 'login', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

