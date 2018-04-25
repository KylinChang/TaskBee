import * as actions from '../src/reducers/user';

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

describe("actions", () => {
  it('should create an action to add a login', () => {
    const username = "login-test1";
    const email = "login-test1@test.edu";
    const avatar = "https://login-test1";
    const expectedAction = {
      type: LOGIN,
      username: username,
      email: email,
      avatar: avatar,
    }
    expect(actions.login(username, email, avatar)).toEqual(expectedAction)
  })
});

describe("actions", () => {
  it('should create an action to add a register', () => {
    const username = "register-test1";
    const email = "register-test1@test.edu";
    const avatar = "https://register-test1";
    const expectedAction = {
      type: REGISTER,
      username: username,
      email: email,
      avatar: avatar,
    }
    expect(actions.register(username, email, avatar)).toEqual(expectedAction)
  })
});

describe("actions", () => {
  it('should create an action to add a chat', () => {
    const username = "chat-test1";
    const email = "chat-test1@test.edu";
    const avatar = "https://chat-test1";
    const buddy = {
      username: username,
      email: email,
      avatar: avatar,
    }
    const expectedAction = {
      type: CHAT,
      buddy: buddy
    }
    expect(actions.chat(buddy)).toEqual(expectedAction)
  })
});

describe("actions", () => {
  it('should create an action to add a chat', () => {
    const task_list = ["test1", "test2"]

    const expectedAction = {
      type: GETTASK,
      task_list: task_list
    }
    expect(actions.getTask(task_list)).toEqual(expectedAction)
  })
});

describe("actions", () => {
  it('should create an action to add a chat', () => {
    const username = "take-task-test1";
    const email = "take-task-test1@test.edu";
    const avatar = "https://take-task-test1";
    const taskInfo = {
      username: username,
      email: email,
      avatar: avatar,
    }
    const expectedAction = {
      type: TAKETASK,
      taskInfo: taskInfo
    }
    expect(actions.takeTask(taskInfo)).toEqual(expectedAction)
  })
});
