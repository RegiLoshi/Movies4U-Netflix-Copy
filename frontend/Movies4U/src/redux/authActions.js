import {setUser, logout} from '../reducers/authReducer';
import {signIn, signUp} from '../services/authService';
const logIn = (content) => {
    return async dispatch  => {
        const data = await signIn(content)
        dispatch(setUser(data));
      }
    }

const register = (content) => {
  return async dispatch  => {
      const data = await signUp(content);
      const logInData = await signIn({email: content.email, password: content.password});
      dispatch(setUser(logInData));
    }
  }

  const signOut = () => {
    return async dispatch  => {
        dispatch(logout());
      }
    }
  
export {logIn,register, signOut};
