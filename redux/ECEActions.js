import {
  getUserS,
  showClass,
  classId,
  classPage,
  classPreviewS,
  setCards,
  cardDetailS
} from "./ECESlice";

export const getuser = () => async (dispatch) => {
  await fetch("/api/hello")
    .then((response) => response.json())
    .then((json) => dispatch(getUserS(json)))
    .catch((error) => console.log(error));
};

export const setshowClass = (show) => (dispatch) => {

  // console.log(show)
  dispatch(showClass(show))
};
export const classid = (id) => (dispatch) => {
  // console.log('entre a redux')
  // console.log(id)
  dispatch(classId(id))
};
export const setClassPage = (page) => (dispatch)=>   {
    dispatch(classPage(page))
  }
export const getuseremail = (email, password) => async (dispatch) => {
  await fetch("/api/users/getid?email=" + email + "&&password=" + password)
    .then((response) => response.json())
    .then((json) => dispatch(getUserS(json)))
    .catch((error) => console.log(error));
};

export const classpreviewA = (classp) => (dispatch) => {
  console.log('entre a redux classpreview')
  // console.log(id)
  dispatch(classPreviewS(classp))
};

export const fetchTeachers = () => async (dispatch) => {
  try {
    // Importa los datos de profesores desde tu archivo local
    await import('../public/imgs/images').then((module) => {
      // Accede a la variable exportada del módulo
      const teachers = module.cardsTeachers;
      // Envía la acción setCards al reducer con los datos de profesores
      dispatch(setCards(teachers));
    });
  } catch (error) {
    console.error('Error al cargar los datos de profesores:', error);
  }
};

export const cardDetail = (card) => (dispatch) => {
  console.log('cardDetailS')
  // console.log(id)
  dispatch(cardDetailS(card))
};


