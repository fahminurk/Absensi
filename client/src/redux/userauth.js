import axios from "axios";
import { auth_types } from "./types";

export function userLogin(user) {
  console.log(user);

  return async function (dispatch) {
    try {
      const userData = await axios.post("http://localhost:2000/users/v1", {
        email: user.email.toLowerCase(),
        password: user.password,
      });
      console.log(userData.status + "userData.status");
      // .then((res) => {
      //   console.log(res);
      //   return res.data[0];
      // });

      if (userData.status == 200) {
        dispatch({
          type: auth_types.login,
          payload: userData.data.value,
        });
        localStorage.setItem("user", JSON.stringify(userData.data.value));

        return {
          valid: true,
          msg: userData.data.message,
        };
      } else if (userData.status == 210) {
        return {
          valid: false,
          msg: userData.data.message,
        };
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err.message);
      return {
        valid: false,
        msg: err.message,
      };
    }
  };
}
