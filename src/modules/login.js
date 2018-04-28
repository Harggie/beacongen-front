
export const loginConstants = {
  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
  LOGOUT: 'USERS_LOGOUT'
};

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? 
{ 
  loggedIn: true, 
  user, 
  error: null 
} : 
{
  loggedIn: false, 
  user: null, 
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return {
        user: action.user,
        error: null
      };
    case loginConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case loginConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        error: action.error
      };
    case loginConstants.LOGOUT:
      return {
        loggedIn: false,
        user: null
      };
    default:
      return state
  }
}