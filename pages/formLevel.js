import React, { useState, useEffect, useRef } from 'react';
import nextI18NextConfig from "../next-i18next.config";
import { useTranslation, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function Formulario() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState([]);
  const [opcionSeleccionada2, setOpcionSeleccionada2] = useState([]);
  const [opcionSeleccionada3, setOpcionSeleccionada3] = useState([]);
  const [opcionSeleccionada4, setOpcionSeleccionada4] = useState([]);
  const [opcionSeleccionada5, setOpcionSeleccionada5] = useState([]);
  const [opcionSeleccionada6, setOpcionSeleccionada6] = useState([]);
  const [opcionSeleccionada7, setOpcionSeleccionada7] = useState([]);
  const [opcionSeleccionada8, setOpcionSeleccionada8] = useState([]);
  const [opcionSeleccionada9, setOpcionSeleccionada9] = useState([]);
  const [opcionSeleccionada10, setOpcionSeleccionada10] = useState([]);
  const [opcionSeleccionada11, setOpcionSeleccionada11] = useState([]);
  const [opcionSeleccionada12, setOpcionSeleccionada12] = useState([]);
  const [opcionSeleccionada13, setOpcionSeleccionada13] = useState([]);
  const [opcionSeleccionada14, setOpcionSeleccionada14] = useState([]);
  const [opcionSeleccionada15, setOpcionSeleccionada15] = useState([]);
  const [opcionSeleccionada16, setOpcionSeleccionada16] = useState([]);
  const [opcionSeleccionada17, setOpcionSeleccionada17] = useState([]);
  const [opcionSeleccionada18, setOpcionSeleccionada18] = useState([]);
  const [opcionSeleccionada19, setOpcionSeleccionada19] = useState([]);
  const [opcionSeleccionada20, setOpcionSeleccionada20] = useState([]);


  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [texto, setTexto] = useState('23/9/2024');
  const [puntuacion, setPuntuacion] = useState(0);
  const [formularioValido, setFormularioValido] = useState(false);

  const [loading, setLoading] = useState(false)
  const [successSend, setSuccessSend] = useState(false)

  //Traduccion
  //decalro la funcion idiomas que uso de los /public/locales/*json
  //en este caso uso form.json y aboutus.json
  const { t } = useTranslation(['form2', 'aboutus'])
  const [showMenuLanguage, setShowMenuLanguage] = useState(false)
  const { locale, locales, push, pathname } = useRouter()
  //Objeto de arrays de banderas
  const languages2 = [{ value: 'es', label: 'ESPAÑOL', label2: 'Es', image: "https://res.cloudinary.com/dfddh08q8/image/upload/v1694363931/images/sp_tmnhok.jpg" },
  { value: 'en', label: 'INGLÉS', label2: 'En', image: "https://res.cloudinary.com/dfddh08q8/image/upload/v1694363928/images/en_pybv0j.jpg" },
  { value: 'pt', label: 'PORTUGUÉS', label2: 'Pt', image: "https://res.cloudinary.com/dfddh08q8/image/upload/v1694363923/images/br_qj0a0o.jpg" }];
  //declaro mi lenguaje actual
  const [language, setLanguage] = useState(languages2.find(objeto => objeto.value === locale));
  // Estilos React-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#f00',  // Cambiar el color de fondo a "inherit"
      width: '210px', // Ancho específico
      height: '40px', // Alto específico
      borderRadius: '8px', // Curvatura de bordes
      borderColor: 'white',
      outline: 'none', // Remove the blue outline when focused

      //  borderWidth: '2px', // Cambiar el grosor del borde a 2px
      boxShadow: '0 0 0 0px white', // Utilizar box-shadow en lugar de outline al enfocar
      '&:hover': {
        backgroundColor: 'rgba(60, 187, 214, 0.4)',

      },

      //border-radius: 6px,
      padding: '0px 0px',

    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: 'white', // Change the color of the default value text to white

      backgroundColor: 'rgba(60, 187, 214, 0.0)',
      '&:hover': {
        color: '#3CBBD6',  // Cambiar el color del borde al pasar el cursor sobre el componente
      },

    }),
    option: (provided) => ({
      ...provided,
      color: 'black', // Cambiar el color del texto de las opciones a blanco
      backgroundColor: 'white', // Cambiar el color de fondo de las opciones a "inherit"
      //backgroundColor: '#3CBBD6' 
      //backgroundColor: 'inherit'

      border: 'white',
      width: '207px', // Ancho específico
      height: '40px', // Alto específico
      '&:hover': {
        backgroundColor: 'rgba(60, 187, 214, 0.4)',
        color: 'black',
        borderRadius: '0px'
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(60, 187, 214, 0.0)', // Change the background color of the menu to translucent
      //  border: '2px solid white', // Eliminar el borde del menú desplegable
      boxShadow: 'none', // Eliminar la sombra del menú desplegable
      borderRadius: '8px',
    }),


  };

  //#region Menu De Idiomas
  const menuLanguage = useRef(null);
  function handleOnChange(lang) {
    push('', undefined, { locale: lang.value });
    setLanguage(languages2.find(objeto => objeto.value === lang.value))
  }


  function handleOnChangeLanguage() {
    showMenuLanguage ? setShowMenuLanguage(false) : setShowMenuLanguage(true)
    console.log(showMenuLanguage)
  }

  // Detecta si se cliquea fuera del Menu 
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuLanguage.current && !menuLanguage.current.contains(event.target)) {
        setShowMenuLanguage(false)
      }
    }

    // Agregar un event listener al documento para detectar clics
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Remover el event listener al desmontar el componente
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  //#endregion


  //Validacion Form
  useEffect(() => {
    // Código que se ejecutará después del renderizado
    validarFormulario();

  }, [opcionSeleccionada, opcionSeleccionada2,
    opcionSeleccionada3, opcionSeleccionada4,
    opcionSeleccionada5, opcionSeleccionada6,
    opcionSeleccionada7, opcionSeleccionada8,
    opcionSeleccionada9, opcionSeleccionada10,
    opcionSeleccionada11, opcionSeleccionada12,
    opcionSeleccionada13, opcionSeleccionada14,
    opcionSeleccionada15, opcionSeleccionada16,
    opcionSeleccionada17, opcionSeleccionada18,
    opcionSeleccionada19, opcionSeleccionada20,
    //Inhabilito el texto
    //texto,
    language]);

  const validarFormulario = () => {
    // Verificar si se ha seleccionado una opción en ambos radio buttons y si se ha ingresado texto
    if (opcionSeleccionada.length && opcionSeleccionada2.length &&
      opcionSeleccionada3.length && opcionSeleccionada4.length &&
      opcionSeleccionada5.length && opcionSeleccionada6.length &&
      opcionSeleccionada7.length && opcionSeleccionada8.length &&
      opcionSeleccionada9.length && opcionSeleccionada10.length &&
      opcionSeleccionada11.length && opcionSeleccionada12.length &&
      opcionSeleccionada13.length && opcionSeleccionada14.length &&
      opcionSeleccionada15.length && opcionSeleccionada16.length &&
      opcionSeleccionada17.length && opcionSeleccionada18.length &&
      opcionSeleccionada19.length && opcionSeleccionada20.length

      //texto.trim() !== ''  //Inhabilito el texto
    ) {  
      //Evaluo para habilitar boton de evaluacion
      evaluacion()
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  // const handleRadioChange = (e) => {
  //   const opcion = e.target.value;
  //   // Si la opción ya está seleccionada, la removemos
  //   if (opcionSeleccionada.includes(opcion)) {
  //     setOpcionSeleccionada('0');
  //   } else { // Si no está seleccionada, la agregamos
  //     setOpcionSeleccionada(opcion);
  //   }
  // };
  const generarHandleRadioChange = (opcionSeleccionada, setOpcionSeleccionada) => {
    return (e) => {
      const opcion = e.target.value;
      // Si la opción ya está seleccionada, la removemos
      if (opcionSeleccionada.includes(opcion)) {
        setOpcionSeleccionada([]);
      } else { // Si no está seleccionada, la agregamos
        setOpcionSeleccionada(opcion);
      }
    };
  };
  const handleRadioChange = generarHandleRadioChange(opcionSeleccionada, setOpcionSeleccionada);
  const handleRadioChange2 = generarHandleRadioChange(opcionSeleccionada2, setOpcionSeleccionada2);
  const handleRadioChange3 = generarHandleRadioChange(opcionSeleccionada3, setOpcionSeleccionada3);
  const handleRadioChange4 = generarHandleRadioChange(opcionSeleccionada4, setOpcionSeleccionada4);
  const handleRadioChange5 = generarHandleRadioChange(opcionSeleccionada5, setOpcionSeleccionada5);
  const handleRadioChange6 = generarHandleRadioChange(opcionSeleccionada6, setOpcionSeleccionada6);
  const handleRadioChange7 = generarHandleRadioChange(opcionSeleccionada7, setOpcionSeleccionada7);
  const handleRadioChange8 = generarHandleRadioChange(opcionSeleccionada8, setOpcionSeleccionada8);
  const handleRadioChange9 = generarHandleRadioChange(opcionSeleccionada9, setOpcionSeleccionada9);
  const handleRadioChange10 = generarHandleRadioChange(opcionSeleccionada10, setOpcionSeleccionada10);
  const handleRadioChange11 = generarHandleRadioChange(opcionSeleccionada11, setOpcionSeleccionada11);
  const handleRadioChange12 = generarHandleRadioChange(opcionSeleccionada12, setOpcionSeleccionada12);
  const handleRadioChange13 = generarHandleRadioChange(opcionSeleccionada13, setOpcionSeleccionada13);
  const handleRadioChange14 = generarHandleRadioChange(opcionSeleccionada14, setOpcionSeleccionada14);
  const handleRadioChange15 = generarHandleRadioChange(opcionSeleccionada15, setOpcionSeleccionada15);
  const handleRadioChange16 = generarHandleRadioChange(opcionSeleccionada16, setOpcionSeleccionada16);
  const handleRadioChange17 = generarHandleRadioChange(opcionSeleccionada17, setOpcionSeleccionada17);
  const handleRadioChange18 = generarHandleRadioChange(opcionSeleccionada18, setOpcionSeleccionada18);
  const handleRadioChange19 = generarHandleRadioChange(opcionSeleccionada19, setOpcionSeleccionada19);
  const handleRadioChange20 = generarHandleRadioChange(opcionSeleccionada20, setOpcionSeleccionada20);


  const handleTextChange = (e) => {
    setTexto(e.target.value);
  };
  //Variables opcionales Email y Name
  const handleTextChangeName = (e) => {
    setName(e.target.value);
  };
  const handleTextChangeEmail = (e) => {
    setEmail(e.target.value);
  };
//Seccion de evaluacion de Formulario
function evaluacion(){

  let puntosAcumulados = 0;

  if(opcionSeleccionada === t('p1op3')){ puntosAcumulados += 1; }
  if(opcionSeleccionada2 === t('p2op2')){ puntosAcumulados += 1; }
  if(opcionSeleccionada3 === t('p3op1')){ puntosAcumulados += 1; }
  if(opcionSeleccionada4 === t('p4op3')){ puntosAcumulados += 1; }
  if(opcionSeleccionada5 === t('p5op2')){ puntosAcumulados += 1; }
  if(opcionSeleccionada6 === t('p6op2')){ puntosAcumulados += 1; }
  // esto es porque el algoritmo debi meter un espacio para
  // que no coincida con otra respuesta
  if(opcionSeleccionada7 === ' '+t('p7op3')){ puntosAcumulados += 1; } 
  if(opcionSeleccionada8 === t('p8op3')){ puntosAcumulados += 1; }
  if(opcionSeleccionada9 === t('p9op3')){ puntosAcumulados += 1; }
  if(opcionSeleccionada10 === t('p10op2')){ puntosAcumulados += 1; }
  if(opcionSeleccionada11 === t('p11op3')){ puntosAcumulados += 1; }
  if(opcionSeleccionada12 === t('p12op3')){ puntosAcumulados += 1; }
  if(opcionSeleccionada13 === t('p13op3')){ puntosAcumulados += 1; }
  if(opcionSeleccionada14 === t('p14op2')){ puntosAcumulados += 1; }
  if(opcionSeleccionada15 === t('p15op2')){ puntosAcumulados += 1; }
  if(opcionSeleccionada16 === t('p16op2')+' '){ puntosAcumulados += 1; }
  if(opcionSeleccionada17 === t('p17op3')){ puntosAcumulados += 1; }
  if(opcionSeleccionada18 === t('p18op1')){ puntosAcumulados += 1; }
  if(opcionSeleccionada19 === t('p19op2')){ puntosAcumulados += 1; }
  if(opcionSeleccionada20 === t('p20op1')){ puntosAcumulados += 1; }
  
  setPuntuacion(puntuacion + puntosAcumulados);
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    // Aquí puedes enviar los datos del formulario a través de una API o realizar cualquier otra acción necesaria
   // console.log('Opción seleccionada:', opcionSeleccionada);
   // console.log('Opción seleccionada2:', opcionSeleccionada2);
   // console.log('Texto ingresado:', texto);
   // console.log('language:', language)

alert('tu puntaje es: '+ puntuacion)

    await fetch('/api/formulario/add2/',
      {  //redirect: 'follow',
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          pregunta1: opcionSeleccionada, pregunta2: opcionSeleccionada2,
          pregunta3: opcionSeleccionada3, pregunta4: opcionSeleccionada4,
          pregunta5: opcionSeleccionada5, pregunta6: opcionSeleccionada6,
          pregunta7: opcionSeleccionada7, pregunta8: opcionSeleccionada8,
          pregunta9: opcionSeleccionada9, pregunta10: opcionSeleccionada10,
          pregunta11: opcionSeleccionada11, pregunta12: opcionSeleccionada12,
          pregunta13: opcionSeleccionada13, pregunta14: opcionSeleccionada14,
          pregunta15: opcionSeleccionada15, pregunta16: opcionSeleccionada16,
          pregunta17: opcionSeleccionada17, pregunta18: opcionSeleccionada18,
          pregunta19: opcionSeleccionada19, pregunta20: opcionSeleccionada20,
          texto: texto,
          puntos:puntuacion,
          language: locale,
          Name: Name,
          Email: Email
        })

        //mando por el body la nueva clase
      }).then(response => setSuccessSend(true))

    setLoading(false)

  };

  return (
    <div className="flex flex-col overflow-hidden">

      {
        !successSend ?
          <>

            {/* Navbar superior */}
            <div className="relative bg-primary text-white p-10 pb-20 font-bold  text-center z-10 rounded-[0_0_100%_100%] w-[120%] left-1/2 translate-x-[-50%]
          md:px-[14px]">

              <div className='flex items-center justify-center gap-10 flex-col
            md:pr-0'>

                <img src="/imgs/logo.png" alt="Logo" className="w-auto  h-20 md:w-16 md:h-auto" />

                <span className='  text-[41px] md:text-[18px]'>{t('title')}  </span>

              </div>

            </div>

            {/* Opciones de idiomas */}
            <div
              style={{ background: "transparent" }}
              className={`${styles["navbar"]} ${styles["light"]}`}>

              <ul
                style={{ justifyContent: "center", paddingTop: "0", paddingBottom: "0" }}
                className={`${styles["navbar-btns"]} ${'mt-7 text-center w-full '}`}
              >

                <li className={styles["select-languages"]} onClick={handleOnChangeLanguage} ref={showMenuLanguage ? menuLanguage : null}>

                  <div className={styles["select-languages_button"]}>
                    {/* Icono */}
                    <Image
                      width={25}
                      height={17}
                      src={language?.image}
                      alt={language?.label}
                    />

                    {/* Label */}
                    <label
                      className={`${styles["select-languages_label"]}`}>
                      {t("labelLanguage")}
                    </label>

                    {/* Flecha del Responsive */}
                    <FontAwesomeIcon icon={showMenuLanguage ? faCaretUp : faCaretDown} className={styles["select-languages_icon"]} />
                  </div>

                  {/* Menu Desplegable */}
                  <ul
                    style={{ position: "absolute" }}
                    className={`${styles['select-languages_menu']} ${showMenuLanguage && styles['active']}`}>
                    {
                      languages2.length > 0 &&
                      languages2.map((language2) => (
                        <li
                          onClick={() => handleOnChange(language2)}
                          value={language2}
                          className={styles["select-languages_languages"]}
                          key={language2.value}>
                          {/* Icono */}
                          <Image
                            width={25}
                            height={17}
                            src={language2.image}
                            alt={language2.label}
                            className={styles["select-languages_img"]} />

                          {/* Label */}
                          <label style={{ marginLeft: "8px" }} className='pr-4 block md:hidden'>
                            {language2.label}
                          </label>
                          <label style={{ marginLeft: "0px" }} className='pr-8  hidden md:block'>
                            {language2.label2}
                          </label>
                        </li>
                      )
                      )
                    }
                  </ul>

                </li>

              </ul>

            </div>
            {/* Titulos debjo de las banderas */}
            <div className="mx-auto font-bold text-[41px] md:text-[18px] text-center text-primary md:w-full md:m-0">
              {t('title2')}</div>
            <div className="pt-2 md:pt-0 font-bold  text-[41px] md:text-[18px] mx-auto text-center text-primary md:w-full md:m-0">
              {t('title3')}</div>

            {/* Formulario */}
            <form className="p-10 w-[768px] mx-auto
          md:w-full md:m-0" onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className='flex flex-col my-8'>

                <label
                  className='mb-2 font-bold text-[21px] text-violet_dark
  md:text-[19px]'
                  htmlFor="name">
                  {t('name')}
                </label>

                <input
                  className='p-2 rounded-[15px] border-2 outline-primary
  md:text-[14px]'
                  type="text"
                  placeholder="Yohn Doe"
                  id="name"
                  value={Name}
                  onChange={handleTextChangeName}
                  rows="1"
                  cols="50"
                />

              </div>

              {/* Email */}
              <div className='flex flex-col my-8'>

                <label
                  className='mb-2 font-bold text-[21px] text-violet_dark
  md:text-[19px]'
                  htmlFor="email">
                  {t('email')}
                </label>

                <input
                  className='p-2 rounded-[15px] border-2 outline-primary
  md:text-[14px]'
                  type="text"
                  placeholder="yohn@gmail.com"
                  id="email"
                  value={Email}
                  onChange={handleTextChangeEmail}
                  rows="1"
                  cols="30"
                />

              </div>

              {/* PREGUNTA 1 */}
              <div className='my-8'>
                {/* ¿Qué tipo de clases te interesan? */}
                <h3 className=' font-bold
              md:text-[19px]'>{t('pregunta1')}</h3>

                {/* Opciones */}
                <div className=' my-5 '>

                  {/* Opcion 1 */}
                  <div className="flex items-center">

                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion1"
                      name="pregunta1"
                      value="estamos/somos"
                      checked={opcionSeleccionada.includes('estamos/somos')}
                      onChange={handleRadioChange}
                    />
                    {/* Pregunta 1 opcion1 */}
                    <label
                      className=' text-violet_dark font-medium
                  md:text-[14px]'
                      htmlFor="opcion1">{t('p1op1')}</label>

                  </div>

                  {/* Opcion 2 */}
                  <div className="flex items-center">

                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion2"
                      name="pregunta1"
                      value="estoy/soy"
                      checked={opcionSeleccionada.includes('estoy/soy')}
                      onChange={handleRadioChange}
                    />
                    {/* Pregunta 1 opcion 2 */}
                    <label
                      className=' text-violet_dark font-medium
                  md:text-[14px]'
                      htmlFor="opcion2">{t('p1op2')}</label>
                  </div>

                  {/* Opcion 3 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta1"
                      value={t('p1op3')} //soy/soy
                      checked={opcionSeleccionada.includes(t('p1op3'))}
                      onChange={handleRadioChange}
                    />
                    <label
                      className=' text-violet_dark font-medium
                  md:text-[14px]'
                      htmlFor="opcion3">{t('p1op3')}</label>
                  </div>

                  {/* Opcion 4 */}
                  {/* <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta1"
                      value="Grupales presenciales en diferentes lugares  (si estás en CBA)"
                      checked={opcionSeleccionada.includes('Grupales presenciales en diferentes lugares  (si estás en CBA)')}
                      onChange={handleRadioChange}
                    />
                    <label
                      className=' text-violet_dark font-medium
                  md:text-[14px]'
                      htmlFor="opcion4">{t('p1op4')}</label>
                  </div> */}

                </div>

              </div>

              {/* PREGUNTA 2 */}
              <div className='my-8'>

                <h3 className='font-bold
              md:text-[19px]'>{t('pregunta2')}</h3>

                {/* Opciones */}
                <div>

                  {/* Opcion 1 */}
                  <div className="flex items-center mt-4">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada2.includes('son/está')}
                      value={'son/está'}
                      onChange={handleRadioChange2}
                    />
                    <label
                      className="text-violet_dark
                  md:text-[14px]"
                      htmlFor="En la mañana despues de las 9:00am">{t('p2op1')} </label>
                  </div>

                  {/* Opcion 2 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada2.includes('hay/tiene')}
                      value={'hay/tiene'}
                      onChange={handleRadioChange2}
                    />
                    <label
                      className="text-violet_dark
                  md:text-[14px]"
                      htmlFor="En la mañana despues de las 11:00 am">{t('p2op2')} </label>
                  </div>

                  {/* Opcion 3 - p-2*/}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada2.includes('están/tiene')}
                      value={'están/tiene'}
                      onChange={handleRadioChange2}
                    />
                    <label
                      className="text-violet_dark
                  md:text-[14px]"
                      htmlFor="opcion4">{t('p2op3')} </label>
                  </div>

                  {/* Opcion 4 p-2 */}
                  {/* <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada2.includes('Otro horario')}
                      value={'Otro horario'}
                      onChange={handleRadioChange2}
                    />
                    <label
                      className="text-violet_dark
                  md:text-[14px]"
                      htmlFor="Otro horario">{t('p2op4')}</label>
                  </div> */}

                </div>

              </div>

              {/* PREGUNTA 3 */}
              <div className='my-8'>

                <h3 className='font-bold
md:text-[19px]'>{t('pregunta3')}</h3>

                {/* Opciones */}
                <div>

                  {/* Opcion 1 P-3 */}
                  <div className="flex items-center mt-4">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada3.includes('es/en')}
                      value={'es/en'}
                      onChange={handleRadioChange3}
                    />
                    <label
                      className="text-violet_dark
  md:text-[14px]"
                      htmlFor="En la mañana despues de las 9:00am">{t('p3op1')} </label>
                  </div>

                  {/* Opcion 2 P3*/}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada3.includes('soy/por')}
                      value={'soy/por'}
                      onChange={handleRadioChange3}
                    />
                    <label
                      className="text-violet_dark
  md:text-[14px]"
                      htmlFor="En la mañana despues de las 11:00 am">{t('p3op2')} </label>
                  </div>

                  {/* Opcion 3 P-3 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada3.includes('está/en')}
                      value={'está/en'}
                      onChange={handleRadioChange3}
                    />
                    <label
                      className="text-violet_dark
  md:text-[14px]"
                      htmlFor="opcion4">{t('p3op3')} </label>
                  </div>

                  {/* Opcion 4 p-3 */}
                  {/* <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada3.includes('Otro horario')}
                      value={'Otro horario'}
                      onChange={handleRadioChange3}
                    />
                    <label
                      className="text-violet_dark
  md:text-[14px]"
                      htmlFor="Otro horario">{t('p3op4')}</label>
                  </div> */}

                </div>

              </div>
              {/* PREGUNTA 4 */}
              <div className='my-8'>

                <h3 className='font-bold md:text-[19px]'>
                  {t('pregunta4')}</h3>
                <h3 className='font-bold md:text-[19px] pl-6'>
                  {t('pregunta4-2')}</h3>

                {/* Opciones */}
                <div>

                  {/* Opcion 1 */}
                  <div className="flex items-center mt-4">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada4.includes('también')}
                      value={'también'}
                      onChange={handleRadioChange4}
                    />
                    <label
                      className="text-violet_dark
  md:text-[14px]"
                      htmlFor="En la mañana despues de las 9:00am">{t('p4op1')} </label>
                  </div>

                  {/* Opcion 2 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada4.includes('no')}
                      value={'no'}
                      onChange={handleRadioChange4}
                    />
                    <label
                      className="text-violet_dark
  md:text-[14px]"
                      htmlFor="En la mañana despues de las 11:00 am">{t('p4op2')} </label>
                  </div>

                  {/* Opcion 3 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada4.includes('tampoco')}
                      value={'tampoco'}
                      onChange={handleRadioChange4}
                    />
                    <label
                      className="text-violet_dark
  md:text-[14px]"
                      htmlFor="opcion4">{t('p4op3')} </label>
                  </div>

                  {/* Opcion 4 */}
                  {/* <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada4.includes('Otro horario')}
                      value={'Otro horario'}
                      onChange={handleRadioChange4}
                    />
                    <label
                      className="text-violet_dark
  md:text-[14px]"
                      htmlFor="Otro horario">{t('p4op4')}</label>
                  </div> */}

                </div>

              </div>

              {/* PREGUNTA 5 */}
              <div className='my-8'>

                <h3 className='font-bold md:text-[19px]'>
                  {t('pregunta5')}</h3>

                {/* Opciones */}
                <div>

                  {/* Opcion 1 */}
                  <div className="flex items-center mt-4">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada5.includes('también')}
                      value={'también'}
                      onChange={handleRadioChange5}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 9:00am">{t('p5op1')} </label>
                  </div>

                  {/* Opcion 2 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada5.includes('gusta/gustan')}
                      value={'gusta/gustan'}
                      onChange={handleRadioChange5}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 11:00 am">{t('p5op2')} </label>
                  </div>

                  {/* Opcion 3 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada5.includes('tampoco')}
                      value={'tampoco'}
                      onChange={handleRadioChange5}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="opcion4">{t('p5op3')} </label>
                  </div>

                  {/* Opcion 4 */}
                  {/* <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada4.includes('Otro horario')}
      value={'Otro horario'}
      onChange={handleRadioChange4}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="Otro horario">{t('p4op4')}</label>
  </div> */}
                </div>
              </div>


              {/* PREGUNTA 6 */}
              <div className='my-8'>

                <h3 className='font-bold md:text-[19px]'>
                  {t('pregunta6')}</h3>

                {/* Opciones */}
                <div>

                  {/* Opcion 1 */}
                  <div className="flex items-center mt-4">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada6.includes('esta/este')}
                      value={'esta/este'}
                      onChange={handleRadioChange6}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 9:00am">{t('p6op1')} </label>
                  </div>

                  {/* Opcion 2 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada6.includes('este/esta')}
                      value={'este/esta'}
                      onChange={handleRadioChange6}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 11:00 am">{t('p6op2')} </label>
                  </div>

                  {/* Opcion 3 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada6.includes('gusta/gusta')}
                      value={'gusta/gusta'}
                      onChange={handleRadioChange6}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="opcion4">{t('p6op3')} </label>
                  </div>

                  {/* Opcion 4 */}
                  {/* <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada4.includes('Otro horario')}
      value={'Otro horario'}
      onChange={handleRadioChange4}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="Otro horario">{t('p4op4')}</label>
  </div> */}
                </div>
              </div>


              {/* PREGUNTA 7 */}
              <div className='my-8'>

                <h3 className='font-bold md:text-[19px]'>
                  {t('pregunta7')}</h3>

                {/* Opciones */}
                <div>

                  {/* Opcion 1 */}
                  <div className="flex items-center mt-4">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada7.includes('tercero ')}
                      value={'tercero '}
                      onChange={handleRadioChange7}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 9:00am">{t('p7op1')} </label>
                  </div>

                  {/* Opcion 2 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada7.includes('primero')}
                      value={'primero'}
                      onChange={handleRadioChange7}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 11:00 am">{t('p7op2')} </label>
                  </div>

                  {/* Opcion 3 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada7.includes(' tercer')}
                      value={' tercer'}
                      onChange={handleRadioChange7}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="opcion4">{t('p7op3')} </label>
                  </div>

                  {/* Opcion 4 */}
                  {/* <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada4.includes('Otro horario')}
      value={'Otro horario'}
      onChange={handleRadioChange4}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="Otro horario">{t('p4op4')}</label>
  </div> */}
                </div>
              </div>


              {/* PREGUNTA 8 */}
              <div className='my-8'>

                <h3 className='font-bold md:text-[19px]'>
                  {t('pregunta8')}</h3>

                {/* Opciones */}
                <div>

                  {/* Opcion 1 */}
                  <div className="flex items-center mt-4">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada8.includes('Tengo/Les')}
                      value={'Tengo/Les'}
                      onChange={handleRadioChange8}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 9:00am">{t('p8op1')} </label>
                  </div>

                  {/* Opcion 2 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada8.includes('Tiene/Se los')}
                      value={'Tiene/Se los'}
                      onChange={handleRadioChange8}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 11:00 am">{t('p8op2')} </label>
                  </div>

                  {/* Opcion 3 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada8.includes('Tengo/se las')}
                      value={'Tengo/se las'}
                      onChange={handleRadioChange8}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="opcion4">{t('p8op3')} </label>
                  </div>

                  {/* Opcion 4 */}
                  {/* <div className="flex items-center">
<input
className="checkbox mr-2 my-2"
type="checkbox"
id="opcion3"
name="pregunta2"
checked={opcionSeleccionada4.includes('Otro horario')}
value={'Otro horario'}
onChange={handleRadioChange4}
/>
<label
className="text-violet_dark
md:text-[14px]"
htmlFor="Otro horario">{t('p4op4')}</label>
</div> */}
                </div>
              </div>

              {/* PREGUNTA 9 */}
              <div className='my-8'>

                <h3 className='font-bold md:text-[19px]'>
                  {t('pregunta9')}</h3>
                  <h3 className='pl-8 font-bold md:text-[19px]'>
                  {t('pregunta9-2')}</h3>

                {/* Opciones */}
                <div>

                  {/* Opcion 1 */}
                  <div className="flex items-center mt-4">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada9.includes('Vas/ fuiste/ está')}
                      value={'Vas/ fuiste/ está'}
                      onChange={handleRadioChange9}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 9:00am">{t('p9op1')} </label>
                  </div>

                  {/* Opcion 2 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada9.includes('Ir / estuve/ era')}
                      value={'Ir / estuve/ era'}
                      onChange={handleRadioChange9}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 11:00 am">{t('p9op2')} </label>
                  </div>

                  {/* Opcion 3 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada9.includes('Has estado/fui/es')}
                      value={'Has estado/fui/es'}
                      onChange={handleRadioChange9}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="opcion4">{t('p9op3')} </label>
                  </div>

                  {/* Opcion 4 */}
                  {/* <div className="flex items-center">
<input
className="checkbox mr-2 my-2"
type="checkbox"
id="opcion3"
name="pregunta2"
checked={opcionSeleccionada4.includes('Otro horario')}
value={'Otro horario'}
onChange={handleRadioChange4}
/>
<label
className="text-violet_dark
md:text-[14px]"
htmlFor="Otro horario">{t('p4op4')}</label>
</div> */}
                </div>
              </div>

              {/* PREGUNTA 10 */}
              <div className='my-8'>

                <h3 className='font-bold md:text-[19px]'>
                  {t('pregunta10')}</h3>
                  <h3 className='font-bold pl-8 md:text-[19px]'>
                  {t('pregunta10-2')}</h3>

                {/* Opciones */}
                <div>

                  {/* Opcion 1 */}
                  <div className="flex items-center mt-4">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada10.includes('se lo lleva')}
                      value={'se lo lleva'}
                      onChange={handleRadioChange10}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 9:00am">{t('p10op1')} </label>
                  </div>

                  {/* Opcion 2 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada10.includes('me lo llevo')}
                      value={'me lo llevo'}
                      onChange={handleRadioChange10}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 11:00 am">{t('p10op2')} </label>
                  </div>

                  {/* Opcion 3 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada10.includes('me llevo')}
                      value={'me llevo'}
                      onChange={handleRadioChange10}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="opcion4">{t('p10op3')} </label>
                  </div>

                  {/* Opcion 4 */}
                  {/* <div className="flex items-center">
<input
className="checkbox mr-2 my-2"
type="checkbox"
id="opcion3"
name="pregunta2"
checked={opcionSeleccionada4.includes('Otro horario')}
value={'Otro horario'}
onChange={handleRadioChange4}
/>
<label
className="text-violet_dark
md:text-[14px]"
htmlFor="Otro horario">{t('p4op4')}</label>
</div> */}
                </div>
              </div>


              {/* PREGUNTA 11 */}
              <div className='my-8'>

                <h3 className='font-bold md:text-[19px]'>
                  {t('pregunta11')}</h3>
                  <h3 className='pl-8 font-bold md:text-[19px]'>
                  {t('pregunta11-2')}</h3>
                {/* Opciones */}
                <div>

                  {/* Opcion 1 */}
                  <div className="flex items-center mt-4">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada11.includes(' dos años ')}
                      value={' dos años '}
                      onChange={handleRadioChange11}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 9:00am">{t('p11op1')} </label>
                  </div>

                  {/* Opcion 2 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion3"
                      name="pregunta2"
                      checked={opcionSeleccionada11.includes('en dos años')}
                      value={'en dos años'}
                      onChange={handleRadioChange11}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="En la mañana despues de las 11:00 am">{t('p11op2')} </label>
                  </div>

                  {/* Opcion 3 */}
                  <div className="flex items-center">
                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion4"
                      name="pregunta2"
                      checked={opcionSeleccionada11.includes('hace dos años')}
                      value={'hace dos años'}
                      onChange={handleRadioChange11}
                    />
                    <label
                      className="text-violet_dark
md:text-[14px]"
                      htmlFor="opcion4">{t('p11op3')} </label>
                  </div>

                </div>
              </div>

{/* PREGUNTA 12 */}
<div className='my-8'>

<h3 className='font-bold md:text-[19px]'>
  {t('pregunta12')}</h3>
  <h3 className='pl-8 font-bold md:text-[19px]'>
  {t('pregunta12-2')}</h3>
{/* Opciones */}
<div>

  {/* Opcion 1 */}
  <div className="flex items-center mt-4">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada12.includes('te duele')}
      value={'te duele'}
      onChange={handleRadioChange12}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 9:00am">{t('p12op1')} </label>
  </div>

  {/* Opcion 2 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada12.includes('me duele')}
      value={'me duele'}
      onChange={handleRadioChange12}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 11:00 am">{t('p12op2')} </label>
  </div>

  {/* Opcion 3 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada12.includes('le duele')}
      value={'le duele'}
      onChange={handleRadioChange12}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="opcion4">{t('p12op3')} </label>
  </div>

</div>
</div>

{/* PREGUNTA 13 */}
<div className='my-8'>

<h3 className='font-bold md:text-[19px]'>
  {t('pregunta13')}</h3>
  
{/* Opciones */}
<div>

  {/* Opcion 1 */}
  <div className="flex items-center mt-4">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada13.includes('he salido/llamaste')}
      value={'he salido/llamaste'}
      onChange={handleRadioChange13}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 9:00am">{t('p13op1')} </label>
  </div>

  {/* Opcion 2 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada13.includes('salí/habías llamado')}
      value={'salí/habías llamado'}
      onChange={handleRadioChange13}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 11:00 am">{t('p13op2')} </label>
  </div>

  {/* Opcion 3 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada13.includes('había salido/llamaste')}
      value={'había salido/llamaste'}
      onChange={handleRadioChange13}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="opcion4">{t('p13op3')} </label>
  </div>

</div>
</div>

{/* PREGUNTA 14 */}
<div className='my-8'>

<h3 className='font-bold md:text-[19px]'>
  {t('pregunta14')}</h3>
  
{/* Opciones */}
<div>

  {/* Opcion 1 */}
  <div className="flex items-center mt-4">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada14.includes('hagas')}
      value={'hagas'}
      onChange={handleRadioChange14}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 9:00am">{t('p14op1')} </label>
  </div>

  {/* Opcion 2 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada14.includes('hayas')}
      value={'hayas'}
      onChange={handleRadioChange14}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 11:00 am">{t('p14op2')} </label>
  </div>

  {/* Opcion 3 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada14.includes('has')}
      value={'has'}
      onChange={handleRadioChange14}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="opcion4">{t('p14op3')} </label>
  </div>

</div>
</div>

{/* PREGUNTA 15 */}
<div className='my-8'>

<h3 className='font-bold md:text-[19px]'>
  {t('pregunta15')}</h3>
  
{/* Opciones */}
<div>

  {/* Opcion 1 */}
  <div className="flex items-center mt-4">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada15.includes(' habla')}
      value={' habla'}
      onChange={handleRadioChange15}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 9:00am">{t('p15op1')} </label>
  </div>

  {/* Opcion 2 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada15.includes('hable')}
      value={'hable'}
      onChange={handleRadioChange15}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 11:00 am">{t('p15op2')} </label>
  </div>

  {/* Opcion 3 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada15.includes('hablara')}
      value={'hablara'}
      onChange={handleRadioChange15}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="opcion4">{t('p15op3')} </label>
  </div>

</div>
</div>

{/* PREGUNTA 16 */}
<div className='my-8'>

<h3 className='font-bold md:text-[19px]'>
  {t('pregunta16')}</h3>
  
{/* Opciones */}
<div>

  {/* Opcion 1 */}
  <div className="flex items-center mt-4">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada16.includes('está')}
      value={'está'}
      onChange={handleRadioChange16}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 9:00am">{t('p16op1')} </label>
  </div>

  {/* Opcion 2 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada16.includes('es ')}
      value={'es '}
      onChange={handleRadioChange16}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 11:00 am">{t('p16op2')} </label>
  </div>

  {/* Opcion 3 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada16.includes('estará')}
      value={'estará'}
      onChange={handleRadioChange16}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="opcion4">{t('p16op3')} </label>
  </div>

</div>
</div>


{/* PREGUNTA 17 */}
<div className='my-8'>

<h3 className='font-bold md:text-[19px]'>
  {t('pregunta17')}</h3>
  
{/* Opciones */}
<div>

  {/* Opcion 1 */}
  <div className="flex items-center mt-4">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada17.includes('mucho')}
      value={'mucho'}
      onChange={handleRadioChange17}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 9:00am">{t('p17op1')} </label>
  </div>

  {/* Opcion 2 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada17.includes('nada')}
      value={'nada'}
      onChange={handleRadioChange17}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 11:00 am">{t('p17op2')} </label>
  </div>

  {/* Opcion 3 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada17.includes('muy')}
      value={'muy'}
      onChange={handleRadioChange17}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="opcion4">{t('p17op3')} </label>
  </div>

</div>
</div>


{/* PREGUNTA 18 */}
<div className='my-8'>

<h3 className='font-bold md:text-[19px]'>
  {t('pregunta18')}</h3>
  <h3 className='pl-8 font-bold md:text-[19px]'>
  {t('pregunta18-2')}</h3>
{/* Opciones */}
<div>

  {/* Opcion 1 */}
  <div className="flex items-center mt-4">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada18.includes('hará/llueva')}
      value={'hará/llueva'}
      onChange={handleRadioChange18}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 9:00am">{t('p18op1')} </label>
  </div>

  {/* Opcion 2 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada18.includes('haga/llueva')}
      value={'haga/llueva'}
      onChange={handleRadioChange18}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 11:00 am">{t('p18op2')} </label>
  </div>

  {/* Opcion 3 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada18.includes('hará/lloverá')}
      value={'hará/lloverá'}
      onChange={handleRadioChange18}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="opcion4">{t('p18op3')} </label>
  </div>

</div>
</div>

{/* PREGUNTA 19 */}
<div className='my-8'>

<h3 className='font-bold md:text-[19px]'>
  {t('pregunta19')}</h3>
  
{/* Opciones */}
<div>

  {/* Opcion 1 */}
  <div className="flex items-center mt-4">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada19.includes('habrías/perderías')}
      value={'habrías/perderías'}
      onChange={handleRadioChange19}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 9:00am">{t('p19op1')} </label>
  </div>

  {/* Opcion 2 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada19.includes('hubieras/habrías')}
      value={'hubieras/habrías'}
      onChange={handleRadioChange19}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 11:00 am">{t('p19op2')} </label>
  </div>

  {/* Opcion 3 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada19.includes('habrás/habrías')}
      value={'habrás/habrías'}
      onChange={handleRadioChange19}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="opcion4">{t('p19op3')} </label>
  </div>

</div>
</div>

{/* PREGUNTA 20 */}
<div className='my-8'>

<h3 className='font-bold md:text-[19px]'>
  {t('pregunta20')}</h3>
  
{/* Opciones */}
<div>

  {/* Opcion 1 */}
  <div className="flex items-center mt-4">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada20.includes('Estuvo/pasamos')}
      value={'Estuvo/pasamos'}
      onChange={handleRadioChange20}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 9:00am">{t('p20op1')} </label>
  </div>

  {/* Opcion 2 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion3"
      name="pregunta2"
      checked={opcionSeleccionada20.includes('Estuvo/pasábamos')}
      value={'Estuvo/pasábamos'}
      onChange={handleRadioChange20}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="En la mañana despues de las 11:00 am">{t('p20op2')} </label>
  </div>

  {/* Opcion 3 */}
  <div className="flex items-center">
    <input
      className="checkbox mr-2 my-2"
      type="checkbox"
      id="opcion4"
      name="pregunta2"
      checked={opcionSeleccionada20.includes('Era/pasamos')}
      value={'Era/pasamos'}
      onChange={handleRadioChange20}
    />
    <label
      className="text-violet_dark
md:text-[14px]"
      htmlFor="opcion4">{t('p20op3')} </label>
  </div>

</div>
</div>


              {/* Temas */}
              {/* <div className='my-8'> */}

              {/* ¿Qué temas específicos te gustaría aprender? */}
              {/* <h3 className='font-bold
              md:text-[19px]'
                  htmlFor="¿Qué temas específicos te gustaría aprender?">
                  {t('temasespecific')}</h3> */}

              {/* <textarea
                  className='mt-3 rounded-[15px] p-3 border-2 outline-primary w-full
                md:text-[14px]'
                  type="text"
                  placeholder={t('temasespecificPH')}
                  id="¿Qué temas específicos te gustaría aprender?"
                  value={texto}
                  onChange={handleTextChange}
                  rows="4"
                  cols="50"
                />
              </div> */}


              {/* Enviar */}
              <button className={`bg-primary text-white rounded-md px-10 py-2 font-medium ${!formularioValido ? 'opacity-[50%]' : 'btn-primary'} w-full`} type="submit" disabled={!formularioValido}>
                {
                  !loading ?
                    t('submit')
                    :
                    <span
                      className="inline-block  h-6 w-6 animate-spin rounded-full border-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    />
                }
              </button>

            </form>

          </>
          :

          // Mensaje al enviar el formulario
          <div className='flex flex-col justify-center items-center w-full h-screen'>

            <Image
            test='taiwebs.com'
              width={385}
              height={393}
              src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1694366456/images/promo_img_1_fnggbr.png"}
            />

            <h3
              className='text-[#4F4F4F] text-[24px] font-semibold text-center'>
              Gracias por contribuir al crecimiento de esta comunidad!!
            </h3>

            <Link
              href={"/"}
              className='bg-primary text-center font-semibold text-white text-[19px] w-full max-w-[400px] p-3 mt-5 rounded-full'>
              Volver
            </Link>
          </div>
      }

    </div>
  );
}

//export default Formulario;
export default withTranslation(['form2', 'footer', 'landing', 'form'])(Formulario);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['form2', 'footer', 'common', 'menu', 'aboutus', 'index', 'register'], nextI18NextConfig)),

    },
  }
}
