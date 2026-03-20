import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../store/redux/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth);

  const login = (email, password, rememberMe) => {
    if (email.includes('@') && password.length >= 8) {
      dispatch(loginSuccess({
        email,
        token: 'fake-jwt-token-' + Date.now(),
        rememberMe,
      }));
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    dispatch(logout())
  };

  return {
    ...auth,
    login,
    logoutUser,
  };
};
