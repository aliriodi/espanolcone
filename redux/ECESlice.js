import { createSlice } from '@reduxjs/toolkit';

//Condicion inicial de variables Store
const initialState = {
  languages: ['br', 'en', 'sp'],
  classid: '6557e26410faf6be3ada6ad6',
  classPage: 0,
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
  cardDetail: [],
  cardsTourist: [],
  cardsTouristDetail: []
};

const datosSlice = createSlice({
  name: 'datos',
  initialState,
  reducers: {
    getUserS: (state, action) => {
      state.userL = action.payload
    },
    showClass: (state, action) => {
      state.showClass = action.payload
    },
    classId: (state, action) => {
      state.classid = action.payload
    },
    classPreviewS: (state, action) => {
      state.classpreview = action.payload;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    classPage: (state, action) => {
      state.classPage = action.payload
    },
    cardDetailS: (state, action) => {
      state.cardDetail = action.payload;
    },
    setCardsTourist: (state, action) => {
      state.cardsTourist = action.payload;
    },
    setCardsTouristDetail: (state, action) => {
      state.cardsTouristDetail = action.payload;
    },
  },
});

export const { getUserS, showClass, classId, classPreviewS, setCards, cardDetailS, classPage, setCardsTourist, setCardsTouristDetail } = datosSlice.actions;
export default datosSlice.reducer;


