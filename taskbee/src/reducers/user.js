import config from '../config/config';

const LOGIN="USER/LOGIN";
const REGISTER ="USER/REGISTER";
const CHAT="USER/CHAT";

const initialState = {
  logError: false,
  loggedIn: false,
  username: "",
  email: "",
  avatar: "",
  messages: [],
  buddies: {},
  buddy: "",
};

function user(state=initialState, action){
  switch(action.type){
    case LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        username: action.username,
        email: action.email,
        messages: action.messages,
        buddies: action.buddies,
        avatar: action.avatar,
        buddy: "",
      });
    case REGISTER:
      return Object.assign({}, state, {
        loggedIn: true,
        username: action.username,
        email: action.email,
        avatar: action.avatar,
        messages: [],
        buddies: {},
        buddy: "",
      });
    case CHAT:
      let buddies = Object.assign({}, state.buddies);
      buddies[action.buddy] = new Date();
      return Object.assign({}, state, {
        buddies: buddies,
        buddy: action.budy,
      });
    default:
      return state;
  }
}

function login(username, email, messages, buddies, avatar){
  return {
    type: LOGIN,
    username: username,
    email: email,
    messages: messages,
    buddies: buddies,
    avatar: avatar,
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

function chat(buddy)
{
  return {
    type: CHAT,
    buddy: buddy,
  }
}
export {
  user,
  login,
  register,
  chat,
};
