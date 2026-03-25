const getStoredAuth = JSON.parse(localStorage.getItem('auth') || 'null');

const initialState = getStoredAuth || {
  isAuthenticated: false,
  userEmail: null,
  token: null,
  saveUserInfo: false,
  lastLogin: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "loginSucess":
      console.log("action.payload===>", action.payload)
      const newState = {
        ...state,
        isAuthenticated: true,
        userEmail: action.payload.email,
        token: action.payload.token,
        saveUserInfo: action.payload.rememberMe,
        lastLogin: new Date().toISOString(),
      };

      localStorage.setItem('auth', JSON.stringify(newState))
      console.log('User login');
      return newState;

    case "logoutUser":
      localStorage.removeItem('auth');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        lastLogin: null,
        userEmail: state.saveUserInfo ? state.userEmail : null,
      };

    default:
      return state;
  }
}