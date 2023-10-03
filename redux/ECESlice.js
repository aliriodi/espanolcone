import { createSlice } from "@reduxjs/toolkit";

//Condicion inicial de variables Store
const initialState= {
    languages:['br','en','sp'],
    classid:'0',
    language: 'br',
    showClass: false,
    plan:'plan1',
    userL: {
      name: "User",
      rol: "invitado",
      email: "user@mail.com",
      tests: [],
      temas: [],
    }
  };
  
  const datosSlice = createSlice({
    name: 'datos',
    initialState,
    reducers: {
      getUserS: (state,action) => {
        state.userL = action.payload},
      showClass: (state,action)=> {
        state.showClass = action.payload},
        classId: (state,action)=> {
          state.classid = action.payload},
      },
     
      }
  )
  export const { getUserS ,showClass,classId} = datosSlice.actions;
  export default datosSlice.reducer;