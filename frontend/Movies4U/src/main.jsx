import store from './redux/store';
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import { Provider } from 'react-redux'
import './globals.css'
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <Router>
    <App />
    </Router>
    </Provider>
)
