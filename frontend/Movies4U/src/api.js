const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
  },
  PROFILE: {
    BASE: `${API_BASE_URL}/profile`,
    GET_PROFILE: (id) => `${API_BASE_URL}/profile/${id}`,
    LIKED_SHOWS: (id) => `${API_BASE_URL}/profile/${id}/likedShows`,
  },
  CONTENT: {
    SHOWS: `${API_BASE_URL}/content/shows`,
    MOVIES: `${API_BASE_URL}/content/movies`,
    SHOW_BY_ID: (id) => `${API_BASE_URL}/content/shows/${id}`,
    MOVIE_BY_ID: (id) => `${API_BASE_URL}/content/movies/${id}`,
    SHOWS_BY_GENRE: `${API_BASE_URL}/content/shows/genre`,
    MOVIES_BY_GENRE: `${API_BASE_URL}/content/movies/genre`,
  }
};

export default API_ENDPOINTS;