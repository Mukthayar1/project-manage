import { createSlice } from '@reduxjs/toolkit';
const getStoredAuth = JSON.parse(localStorage.getItem('auth') || 'null');

const initialState = getStoredAuth || {
  isAuthenticated: false,
  userEmail: null,
  token: null,
  saveUserInfo: false,
  lastLogin: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log('state login==>', state);

      state.isAuthenticated = true;
      state.userEmail = action.payload.email;
      state.token = action.payload.token;
      state.saveUserInfo = action.payload.rememberMe;
      state.lastLogin = new Date().toISOString();

      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: true,
        userEmail: action.payload.email,
        token: action.payload.token,
        saveUserInfo: action.payload.rememberMe,
        lastLogin: state.lastLogin,
      }));

    },
    logout: (state) => {
      state.isAuthenticated = false;
      if (!state?.saveUserInfo) {
        state.userEmail = null;
        console.log('userEmail cleared');
      } else {
        console.log('userEmail preserved for next login');
      }
      state.token = null;
      state.lastLogin = null;
      localStorage.removeItem('auth');
      console.log('userlogout=====>',state.isAuthenticated);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer