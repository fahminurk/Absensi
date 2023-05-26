const init = {
  email: "",
  // password: "",
};

function userReducer(state = init, action) {
  if (action.type == "login") {
    return {
      ...state,
      id: action.payload.id,
      email: action.payload.email,
      // password: action.payload.password,
      name: action.payload.name,
      // company_id: action.payload.company_id,
      address: action.payload.address,
      avatar_url: action.payload.avatar_url,
    };
  } else if (action.type == "logout") {
    return init;
  }
  return state;
}

export default userReducer;
