import axios from 'axios';
import API_ENDPOINTS from '../api.js';

const api = axios.create({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export const getShows = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.CONTENT.SHOWS);
    return response.data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
};

export const getMovies = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.CONTENT.MOVIES);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};


export const getShow = async (id) => {
  try {
    const response = await api.get(API_ENDPOINTS.CONTENT.SHOW_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching show with id ${id}:`, error);
    throw error;
  }
};

export const getMovie = async (id) => {
  try {
    const response = await api.get(API_ENDPOINTS.CONTENT.MOVIE_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
};

export const getShowsByGenre = async (genre) => {
  try {
    const response = await api.get(API_ENDPOINTS.CONTENT.SHOWS_BY_GENRE, { params: { genre } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching shows with genre ${genre}:`, error);
    throw error;
  }
};

export const getMoviesByGenre = async (genre) => {
  try {
    const response = await api.get(API_ENDPOINTS.CONTENT.MOVIES_BY_GENRE, { params: { genre } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movies with genre ${genre}:`, error);
    throw error;
  }
};

