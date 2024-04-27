import React, { useState, useEffect, useRef } from 'react';
import nextI18NextConfig from "../next-i18next.config";
import { useTranslation, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

function Formulario() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState([]);
  const [opcionSeleccionada2, setOpcionSeleccionada2] = useState([]);

  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [texto, setTexto] = useState('');
  const [formularioValido, setFormularioValido] = useState(false);

  //Traduccion
  //decalro la funcion idiomas que uso de los /public/locales/*json
  //en este caso uso form.json y aboutus.json
  const { t } = useTranslation(['form', 'aboutus'])
  const [showMenuLanguage, setShowMenuLanguage] = useState(false)
  const { locale, locales, push, pathname } = useRouter()
  //Objeto de arrays de banderas
  const languages2 = [{ value: 'es', label: 'ESPAÑOL', label2:'Es',image: "https://res.cloudinary.com/dfddh08q8/image/upload/v1694363931/images/sp_tmnhok.jpg" },
  { value: 'en', label: 'INGLÉS',label2:'En', image: "https://res.cloudinary.com/dfddh08q8/image/upload/v1694363928/images/en_pybv0j.jpg" },
  { value: 'pt', label: 'PORTUGUÉS',label2:'Pt', image: "https://res.cloudinary.com/dfddh08q8/image/upload/v1694363923/images/br_qj0a0o.jpg" }];
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

  }, [opcionSeleccionada, opcionSeleccionada2, texto, language]);

  const validarFormulario = () => {
    // Verificar si se ha seleccionado una opción en ambos radio buttons y si se ha ingresado texto
    if (opcionSeleccionada.length && opcionSeleccionada2.length && texto.trim() !== '') {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleRadioChange = (e) => {
    const opcion = e.target.value;
    // Si la opción ya está seleccionada, la removemos
    if (opcionSeleccionada.includes(opcion)) {
      setOpcionSeleccionada(opcionSeleccionada.filter(item => item !== opcion));
    } else { // Si no está seleccionada, la agregamos
      setOpcionSeleccionada([...opcionSeleccionada, opcion]);
    }
  };
  const handleRadioChange2 = (e) => {
    //setOpcionSeleccionada2(e.target.value);
    const opcion = e.target.value;
    // Si la opción ya está seleccionada, la removemos
    if (opcionSeleccionada2.includes(opcion)) {
      setOpcionSeleccionada2(opcionSeleccionada2.filter(item => item !== opcion));
    } else { // Si no está seleccionada, la agregamos
      setOpcionSeleccionada2([...opcionSeleccionada2, opcion]);

    };
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a través de una API o realizar cualquier otra acción necesaria
    console.log('Opción seleccionada:', opcionSeleccionada);
    console.log('Opción seleccionada2:', opcionSeleccionada2);
    console.log('Texto ingresado:', texto);
    console.log('language:', language)
    await fetch('/api/formulario/add/',
      {  //redirect: 'follow',
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          pregunta1: opcionSeleccionada,
          pregunta2: opcionSeleccionada2,
          texto: texto,
          language: locale,
          Name: Name,
          Email: Email
        })

        //mando por el body la nueva clase
      }).then(response => push('/'))

  };

  return (
    <div className="flex flex-col  ">

      {/* Navbar superior */}
      <div className="relative bg-primary text-white p-10 md:pt-1 md:pb-1 md:pr-0 font-bold  text-center
      md:px-[14px] z-10">
        <div className='flex items-center justify-center gap-10  md:pr-0'>
          
          <img src="/imgs/logo.png" alt="Logo" className="w-auto  h-20 md:w-16 md:h-16" />
          <span className='  text-[41px] md:text-[18px]'>{t('title')}  </span>
          <ul
            className={`${styles["navbar-btns"]} ${'w-[50px]'}`}
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
                  className={styles["select-languages_label"]}>
                  {t("labelLanguage")}
                </label>

                {/* Flecha del Responsive */}
                <FontAwesomeIcon icon={showMenuLanguage ? faCaretUp : faCaretDown} className={styles["select-languages_icon"]} />
              </div>
               {/* Menu Desplegable */}
            <ul className={`${styles['select-languages_menu']} ${'w-[140px]'} ${showMenuLanguage && styles['active']}`}>
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
                      className={styles["select-languages_img"]}/>

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



      </div>


      {/* Formulario */}
      <form className="p-12 w-[768px] mx-auto
      md:w-full md:m-0" onSubmit={handleSubmit}>

        {/* Interes */}
        <div className='my-5'>
          {/* ¿Qué tipo de clases te interesan? */}
          <h3 className=' font-bold'>{t('pregunta1')}</h3>

          {/* Opciones */}
          <div className=' my-5 '>

            {/* Opcion 1 */}
            <div className="flex items-center">

              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion1"
                name="pregunta1"
                value="Individuales online"
                checked={opcionSeleccionada.includes('Individuales online')}
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
                value="Grupales Online"
                checked={opcionSeleccionada.includes('Grupales Online')}
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
                value="Grupales OnlineGrupales presenciales en salón de clases (si estás en CBA)"
                checked={opcionSeleccionada.includes('Grupales OnlineGrupales presenciales en salón de clases (si estás en CBA)')}
                onChange={handleRadioChange}
              />
              <label
                className=' text-violet_dark font-medium
              md:text-[14px]'
                htmlFor="opcion3">{t('p1op3')}</label>
            </div>

            {/* Opcion 4 */}
            <div className="flex items-center">
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
            </div>

          </div>

        </div>

        {/* Horarios */}
        <div className='my-5'>

          {/* ¿Tienes alguna preferencia de horario o ubicación para las clases? */}
          <h3 className='font-bold'>{t('pregunta2')}</h3>

          {/* Opciones */}
          <div>

            {/* En la mañana despues de las 9:00am */}
            <div className="flex items-center mt-4">
              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion4"
                name="pregunta2"
                checked={opcionSeleccionada2.includes('En la mañana despues de las 9:00am')}
                value={'En la mañana despues de las 9:00am'}
                onChange={handleRadioChange2}
              />
              <label
                className="text-violet_dark
              md:text-[14px]"
                htmlFor="En la mañana despues de las 9:00am">{t('p2op1')} <b>9:00 AM</b></label>
            </div>

            {/* la mañana despues de las 11:00 am */}
            <div className="flex items-center">
              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion3"
                name="pregunta2"
                checked={opcionSeleccionada2.includes('En la mañana despues de las 11:00 am')}
                value={'En la mañana despues de las 11:00 am'}
                onChange={handleRadioChange2}
              />
              <label
                className="text-violet_dark
              md:text-[14px]"
                htmlFor="En la mañana despues de las 11:00 am">{t('p2op2')} <b>11:00 AM</b></label>
            </div>

            {/* En la tarde despues de las 3:00pm */}
            <div className="flex items-center">
              <input
                className="checkbox mr-2 my-2"
                type="checkbox"
                id="opcion4"
                name="pregunta2"
                checked={opcionSeleccionada2.includes('En la tarde despues de las 3:00pm')}
                value={'En la tarde despues de las 3:00pm'}
                onChange={handleRadioChange2}
              />
              <label
                className="text-violet_dark
              md:text-[14px]"
                htmlFor="opcion4">{t('p2op3')} <b>3:00 PM</b></label>
            </div>

            {/* Otro horario */}
            <div className="flex items-center">
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
            </div>

          </div>

        </div>

        {/* Temas */}
        <div className='my-5'>

          {/* ¿Qué temas específicos te gustaría aprender? */}
          <h3 className='font-bold' htmlFor="¿Qué temas específicos te gustaría aprender?">
            {t('temasespecific')}</h3>

          <textarea
            className='mt-3 rounded-[15px] p-3 border-2 outline-primary w-full'
            type="text"
            placeholder={t('temasespecificPH')}
            id="¿Qué temas específicos te gustaría aprender?"
            value={texto}
            onChange={handleTextChange}
            rows="4"
            cols="50"
          />
        </div>

        {/* Nombre */}
        <div className='flex flex-col my-5'>

          <label
            className='mb-2 font-bold text-[21px] text-violet_dark'
            htmlFor="name">
            {t('name')}:
          </label>

          <input
            className='p-2 rounded-[15px] border-2 outline-primary'
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
        <div className='flex flex-col my-5'>

          <label
            className='mb-2 font-bold text-[21px] text-violet_dark'
            htmlFor="email">
            {t('email')}:
          </label>

          <input
            className='p-2 rounded-[15px] border-2 outline-primary'
            type="text"
            placeholder="yohn@gmail.com"
            id="email"
            value={Email}
            onChange={handleTextChangeEmail}
            rows="1"
            cols="30"
          />

        </div>

        <button className={`bg-primary text-white rounded-md px-10 py-2 font-medium ${!formularioValido ? 'btn-disabled' : 'btn-primary'}`} type="submit" disabled={!formularioValido}>{t('submit')}</button>
      </form>
    </div>
  );
}

//export default Formulario;
export default withTranslation(['form', 'footer', 'landing'])(Formulario);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['form', 'footer', 'common', 'menu', 'aboutus', 'index', 'register'], nextI18NextConfig)),

    },
  }
}
