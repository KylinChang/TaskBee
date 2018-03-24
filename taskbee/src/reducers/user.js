const LOGIN="USER/LOGIN";

const initialState = {
  logError: false,
  loggedIn: false,
  username: "",
};

function user(state=initialState, action){
  switch(action.type){
    case LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        username: username,
      })
    default:
      return state;
  }
}

function login(username){
  return {
    type: LOGIN,
    username: username,
  }
}

export {
  user,
  login,
};
