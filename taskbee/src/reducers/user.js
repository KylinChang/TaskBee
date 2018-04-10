import config from '../config/config';

const LOGIN="USER/LOGIN";
const REGISTER ="USER/REGISTER";
const LOGOUT="USER/LOGOUT";
const CHAT="USER/CHAT";
const GETTASK = "USER/GETTASK";
const TAKETASK = "USER/TAKETASK";
const POSTTASK = "USER/POSTTASK";

const initialState = {
  logError: false,
  loggedIn: false,
  username: "",
  email: "",
  avatar: "",
  messages: [],
  buddies: {},
  buddy: "",
  self_take_task: [],
  self_post_task: [],
  underway_task: [],
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
        loggedIn: false,
        username: action.username,
        email: action.email,
        messages: action.messages,
        buddies: action.buddies,
        avatar: action.avatar,
        buddy: "",
        task_list: {},
      });
    case LOGOUT:
      return Object.assign({}, state, {
        loggedIn: true,
        logError: false,
        username: "",
        email: "",
        avatar: "",
        buddy: "",
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
        self_post_task: action.task_list.self_post_task,
        self_take_task: action.task_list.self_take_task,
        underway_task: action.task_list.underway_task,
      });
    case TAKETASK:
      let self_take_task = state.self_take_task.slice();
      self_take_task.push(action.taskInfo);
      return Object.assign({}, state, {
        self_take_task: self_take_task,
      });
    case POSTTASK:
      let self_post_task = state.self_post_task.slice();
      console.log("post/"+action.taskInfo);
      self_post_task.push(action.taskInfo);
      return Object.assign({}, state, {
        self_post_task: self_post_task,
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

function logout(){
  return {
    type: LOGOUT,
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

function takeTask(taskInfo){
  return {
    type: TAKETASK,
    taskInfo: taskInfo,
  };
}

function postTask(taskInfo){
  return {
    type: POSTTASK,
    taskInfo: taskInfo,
  };
}

export {
  user,
  login,
  register,
  logout,
  chat,
  getTask,
  takeTask,
  postTask,
};
