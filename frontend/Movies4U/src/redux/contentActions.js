import {setContent} from '../reducers/contentReducer';
import {getMovies, getShows} from '../services/contentService';

const getContent = () => {
    return async dispatch  => {
        const movies = await getMovies()
        const shows = await getShows()
        await dispatch(setContent({movies, shows}));
      }
    }

    export {getContent};
