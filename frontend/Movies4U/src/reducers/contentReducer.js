import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: null,
    shows: null
    };

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContent(state, action) {
            state.movies = action.payload.movies;
            state.shows = action.payload.shows;
        }
    },
});

export const { setContent } = contentSlice.actions;
export default contentSlice.reducer;