import { auth_types } from "./types";

const init = {
  email: "",
  password: "",
};

function userReducer(state = init, action) {
  if (action.type == auth_types.login) {
    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
      name: action.payload.name,
      company_id: action.payload.company_id,
      address: action.payload.address,
    };
  } else if (action.type == auth_types.logout) {
    return init;
  }
  return state;
}

export default userReducer;
