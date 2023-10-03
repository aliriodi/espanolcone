import {
    getUserS,
    showClass,
    classId
  } from "./ECESlice";
  
  export const getuser = () => async (dispatch) => {
    await fetch("/api/hello")
      .then((response) => response.json())
      .then((json) => dispatch(getUserS(json)))
      .catch((error) => console.log(error));
  };

  export const setshowClass = (show) => (dispatch)=>   {
    
   // console.log(show)
     dispatch(showClass(show))
  };
  export const classid = (id) => (dispatch)=>   {
    // console.log('entre a redux')
    // console.log(id)
      dispatch(classId(id))
   };
  
  export const getuseremail = (email,password) => async (dispatch) => {
    await fetch("/api/users/getid?email="+email+"&&password="+password)
      .then((response) => response.json())
      .then((json) => dispatch(getUserS(json)))
      .catch((error) => console.log(error));
  };
  
  