import config from '../config/config';

// Action types
const LOGIN="USER/LOGIN";
const REGISTER ="USER/REGISTER";
const LOGOUT="USER/LOGOUT";
const CHAT="USER/CHAT";
const GETTASK = "USER/GETTASK";
const TAKETASK = "USER/TAKETASK";
const POSTTASK = "USER/POSTTASK";
const GETMESSAGE = "USER/GETMESSAGE";
const CLEARNOTIFY = "USER/CLEARNOTIFY";

// User state
const initialState = {
  logError: false,
  loggedIn: false,
  username: "",
  email: "",
  avatar: "",
  me: {},
  messages: [],  // messsage list
  buddies: {},   // all buddies.
  buddy: {},     // current chat buddy.
  self_take_task: [],  // list of tasks taken by the user
  self_post_task: [],  // list of tasks posted by the user
  underway_task: [],   // list of ongoing tasks related to the user
  notify: 0,     // number of unread messages
};

function user(state=initialState, action){
  switch(action.type){
    case LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        username: action.username,
        email: action.email,
        avatar: action.avatar,
        buddy: "",
        task_list: {},
        me: {username: action.username, email: action.email, avatar: action.avatar},
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
        me: {username: action.username, email: action.email, avatar: action.avatar},
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
        if(Object.keys(buddies).indexOf(action.buddy.username) == -1)
        {
          buddies[action.buddy.username] = {
            username: action.buddy.username,
            date: new Date().getTime(),
            email: action.buddy.email,
            avatar: action.buddy.avatar,
            messages: [],
            newMessages: 0,
          }
        }
      return Object.assign({}, state, {
        buddy: action.buddy,
        buddies: buddies
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
      let underway_task = state.underway_task.slice();
      console.log("post/"+action.taskInfo);
      self_post_task.push(action.taskInfo);
      underway_task.push(action.taskInfo);
      return Object.assign({}, state, {
        self_post_task: self_post_task,
        underway_task: underway_task,
      });
    case GETMESSAGE:                                  // add just ONE message!!
      buddies = Object.assign({}, state.buddies);
      // add buddy...
      let username = action.sender.username;
      let email = action.sender.email;
      let avatar = action.sender.avatar;
      if(!action.isReceiver){
        username = action.receiver.username;
        email = action.receiver.email;
        avatar = action.receiver.avatar;
      }
      if(Object.keys(buddies).indexOf(username) != -1)
      {
        buddies[username].date = action.timestamp;
      }
      else
      {
        buddies[username] = {
          username: username,
          date: action.timestamp,
          email: email,
          avatar: avatar,
          messages: [],
          newMessages: 0,
        };
      }

      let msg = {
        sender: action.sender,
        receiver: action.receiver,
        timestamp: action.timestamp,
        content: action.content
      };
      buddies[username].messages.push(msg);
        if(action.isReceiver)
        {
          buddies[username].newMessages++;
        }
      console.log(buddies);
      // add message
      let messages = state.messages;
      messages.push(msg);

      //maybe update notification here..
        notify = state.notify;
        if(state.buddy.username !== action.sender.username)
            notify += 1;

      return Object.assign({}, state, {
        buddies: buddies,
        buddy: {username: username, email: email, avatar: avatar},
        messages: messages,
        notify: state.notify + 1,
      });
    case CLEARNOTIFY:                         // clear newMessages, add to messages, subtract from notify.
      buddies = Object.assign({}, state.buddies);
      let notify = state.notify - buddies[action.username].newMessages;
      buddies[action.username].newMessages = 0;
      return Object.assign({}, state, {
        notify: notify,
        buddies: buddies,
      });

    default:
      return state;
  }
}

function login(username, email, avatar){
  return {
    type: LOGIN,
    username: username,
    email: email,
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

function chat(buddy)  // {username, email, avatar}
{
  return {
    type: CHAT,
    buddy: buddy,
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

function getMessage(sender, receiver, timestamp, content, isReceiver) //sender, receiver: object, {username, avatar, email}; other: string
{
  return {
    type: GETMESSAGE,
    sender: sender,
    receiver: receiver,
    timestamp: timestamp,
    content: content,
    isReceiver: isReceiver,
  }
}

function clearNotify(username)
{
  return {
    type: CLEARNOTIFY,
    username: username,
  }
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
  getMessage,
  clearNotify,
};
