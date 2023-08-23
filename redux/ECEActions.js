import {
    getUserS,
    
  } from "./ECESlice";
  
  export const getuser = () => async (dispatch) => {
    await fetch("/api/hello")
      .then((response) => response.json())
      .then((json) => dispatch(getUserS(json)))
      .catch((error) => console.log(error));
  };
  
  export const getuseremail = (email,password) => async (dispatch) => {
    await fetch("/api/users/getid?email="+email+"&&password="+password)
      .then((response) => response.json())
      .then((json) => dispatch(getUserS(json)))
      .catch((error) => console.log(error));
  };
  
  