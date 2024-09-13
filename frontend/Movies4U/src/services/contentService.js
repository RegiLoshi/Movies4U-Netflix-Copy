import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/profile';


const api = axios.create({
  baseURL: BASE_URL
});

export const getShows = async () => {
  try {
    const response = await api.get('shows');
    return response.data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
};

export const getMovies = async () => {
  try {
    const response = await api.get('movies');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getShow = async (id) => {
  try {
    const response = await api.get(`shows/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching show with id ${id}:`, error);
    throw error;
  }
};

export const getMovie = async (id) => {
  try {
    const response = await api.get(`movies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
};

export const getShowsByGenre = async (genre) => {
    try {
      const response = await api.get('shows/genre', { params: { genre } });
      return response.data;
    } catch (error) {
      console.error(`Error fetching shows with genre ${genre}:`, error);
      throw error;
    }
  };
  
  export const getMoviesByGenre = async (genre) => {
    try {
      const response = await api.get('movies/genre', { params: { genre } });
      return response.data;
    } catch (error) {
      console.error(`Error fetching movies with genre ${genre}:`, error);
      throw error;
    }
  };

  
