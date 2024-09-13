import {
  Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogInForm from './components/Auth/logInForm';
import SignUpForm from './components/Auth/SignUpForm';
import Home from './components/home/home';
import Watch from './components/Watch';
import Profile from './components/Profile';
import ProtectedRoute from './components/Auth/ProtectedRoute';
function App() {
  const user = useSelector(state => state.user);

  return (
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LogInForm />}
        />
        <Route path='/register' element={<SignUpForm />} />

        {//ProtectedRoute is a component that checks if the user is logged in. If the user is not logged in, it redirects to the login page. If the user is logged in, it renders the child routes
        }
        <Route element={<ProtectedRoute />} >
          <Route path='/home' element={<Home />} />
          <Route path='/watch/:id' element={<Watch />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Route>
      </Routes>
  );
}

export default App;

