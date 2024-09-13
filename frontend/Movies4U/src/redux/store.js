import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import contentReducer from '../reducers/contentReducer';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken ? storedToken : null,
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        content: contentReducer,
    },
    preloadedState: {
        auth: initialState,
    }
});

export default store;
