import { createSlice } from '@reduxjs/toolkit';

//Condicion inicial de variables Store
// const initialState= {
//     languages:['br','en','sp'],
//     classid:'0',
//     classPage:1,
//     language: 'br',
//     showClass: false,
//     plan:'plan1',
//     userL: {
//       name: "User",
//       rol: "invitado",
//       email: "user@mail.com",
//       tests: [],
//       temas: [],
//     }
//   };

//   export const { getUserS ,showClass,classId, classPage} = datosSlice.actions;
//   export default datosSlice.reducer;
const initialState = {
  languages: ['br', 'en', 'sp'],
  classid: '65285a70bb78bea94a6b1369',
  classPage:1,
  language: 'br',
  showClass: false,
  plan: 'plan1',
  userL: {
    name: "User",
    rol: "invitado",
    email: "user@mail.com",
    tests: [],
    temas: [],
  },
  classpreview: {
    level: "Nivel A1",
    unit: "Unidad 6",
    description: 'nivela2 del MVP con ejemplos de ppopppus2 1 2 3 4 5 6 7',
    sheets: [{
      type: "text",
      section: {
        number: 0, value: "Mis Metas",
      },
      template: "https://res.cloudinary.com/dfddh08q8/image/upload/v1696113984/images/1_qywc8c.png",
      data: [{
        type: "image",
        value: "https://res.cloudinary.com/dfddh08q8/image/upload/v1694366262/images/logo-primary_qoagkg.png",
        alt: "EspañolconE",
        className: "Portadaimg"
      },
      {
        type: "title",
        value: "EXTRANJEROS EN JUJUY",
        className: "Portadatil"
      }]
    }]
  },
  cards: [],
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
    classPreviewS: (state, action) => {
            state.classpreview = action.payload;
          },
    setCards: (state, action) => {
            state.cards = action.payload;
          },
    classPage: (state,action)=>{
      state.classPage = action.payload
    }
    },
   
    }
)
export const { getUserS, showClass, classId, classPreviewS, setCards, classPage } = datosSlice.actions;
export default datosSlice.reducer;