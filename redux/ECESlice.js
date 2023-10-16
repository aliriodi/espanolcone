import { createSlice } from "@reduxjs/toolkit";

//Condicion inicial de variables Store
const initialState= {
    languages:['br','en','sp'],
    classid:'0',
    classPage:1,
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
      classPage: (state,action)=>{
        state.classPage = action.payload
      }
      },
     
      }
  )
  export const { getUserS ,showClass,classId, classPage} = datosSlice.actions;
  export default datosSlice.reducer;