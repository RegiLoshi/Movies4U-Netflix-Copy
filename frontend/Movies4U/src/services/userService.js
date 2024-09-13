import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/profile';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export const getUser = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const addLikedShow = async (id, showId) => {
  try {
    const response = await api.put(`/${id}/likedShows/${showId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding liked show:', error);
    throw error;
  }
}

export const getLikedShows = async (id) => {
  try {
    const response = await api.get(`/${id}/likedShows`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const removeLikedShow = async (id, showId) => {
  try {
    const response = await api.delete(`/${id}/likedShows/${showId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
  