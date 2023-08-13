import { createSlice } from "@reduxjs/toolkit";

//Condicion inicial de variables Store
const initialState= {
    languages:['br','en','sp'],
    language: 'br',
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
     },
  })
  export const { getUserS } = datosSlice.actions;
  export default datosSlice.reducer;