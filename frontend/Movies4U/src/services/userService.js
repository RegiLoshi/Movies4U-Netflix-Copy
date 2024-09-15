import axios from 'axios';
import API_ENDPOINTS from '../api.js';

const api = axios.create({
  baseURL: API_ENDPOINTS.PROFILE.BASE,
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
    const response = await api.put(API_ENDPOINTS.PROFILE.LIKED_SHOWS(id) + `/${showId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding liked show:', error);
    throw error;
  }
};

export const getLikedShows = async (id) => {
  try {
    const response = await api.get(API_ENDPOINTS.PROFILE.LIKED_SHOWS(id));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeLikedShow = async (id, showId) => {
  try {
    const response = await api.delete(API_ENDPOINTS.PROFILE.LIKED_SHOWS(id) + `/${showId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
