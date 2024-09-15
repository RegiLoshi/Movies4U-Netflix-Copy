import { Routes, Route, Navigate } from 'react-router-dom';
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
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/home" /> : <LogInForm />}
      />
      <Route path='/register' element={user ? <Navigate to="/home" /> : <SignUpForm />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/watch/:id' element={<Watch />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Route>

      {/* Catch-all route for undefined routes */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;