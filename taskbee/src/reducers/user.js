const LOGIN="USER/LOGIN";

const initialState = {
  loggingIn: false,
  username: "test",
};

function user(state=initialState, action){
  switch(action.type){
    case LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
      })
    default:
      return state;
  }
}

function login(){
  return {
    type: LOGIN,
  }
}

export {
  user,
  login,
};
