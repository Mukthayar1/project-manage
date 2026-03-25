export const loginSuccess = (payload) => ({
  type: 'loginSucess',
  payload,
});

export const logout = () => ({
  type: 'logoutUser',
});