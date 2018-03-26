import config from '../config/config';

const LOGIN="USER/LOGIN";
const REGISTER ="USER/REGISTER";
const CHAT="USER/CHAT";
const GETTASK = "USER/GETTASK";
const TAKETASK = "USER/TAKETASK";

const initialState = {
  logError: false,
  loggedIn: false,
  username: "",
  email: "",
  avatar: "",
  messages: [],
  buddies: {},
  buddy: "",
  task_list: {},
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
        task_list: {},
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
        task_list: {},
      });
    case CHAT:
      let buddies = Object.assign({}, state.buddies);
      buddies[action.buddy] = {
        buddy_name: action.buddy,
        date: new Date(),
        email: action.email,
        avatar: action.avatar,
      };
      return Object.assign({}, state, {
        buddies: buddies,
        buddy: action.buddy,
      });
    case GETTASK:
      return Object.assign({}, state, {
        task_list: action.task_list,
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

function chat(buddy, email, avatar)
{
  return {
    type: CHAT,
    buddy: buddy,
    email: email,
    avatar: avatar,
  }
}

function getTask(task_list)
{
  return {
    type: GETTASK,
    task_list: task_list,
  }
}

function takeTask(taskID){
  return {
    type: TAKETASK,
    taskid: taskID,
  };
}

export {
  user,
  login,
  register,
  chat,
  getTask,
};
