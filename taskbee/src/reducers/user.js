import config from '../config/config';

const LOGIN="USER/LOGIN";
const REGISTER ="USER/REGISTER";

const initialState = {
  logError: false,
  loggedIn: false,
  username: "",
  email: "",
  avatar: "",
};

function user(state=initialState, action){
  switch(action.type){
    case LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        username: action.username,
        email: action.email,
      });
    case REGISTER:
      return Object.assign({}, state, {
        loggedIn: true,
        username: action.username,
        email: action.email,
        avatar: action.avatar
      });
    default:
      return state;
  }
}

function login(username, email){
  return {
    type: LOGIN,
    username: username,
    email: email,
  }
}

function register(username, email, avatar){
  return {
    type: REGISTER,
    username: username,
    email: email,
    avatar: avatar,
  }
}

export {
  user,
  login,
  register,
};
