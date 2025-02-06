import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function FormularioLevel({ t }) {
  // Para el boton de email
  const [emailfound, setemailfound] = useState(null);
  //Para mensaje de alerta en caso de que exista email en BD
  const [showMessage, setshowMessage] = useState(null);
  //Para mostrar formulario en caso de que el email no exista en formulario
  const [showForm, setshowForm] = useState(true);
  const [showInput, setshowInput] = useState(true);
  const [emailvalido, setemailvalido] = useState(false);


  const [opcionSeleccionada, setOpcionSeleccionada] = useState([]);

  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [texto, setTexto] = useState('');
  const [formularioValido, setFormularioValido] = useState(false);
  const [loading, setLoading] = useState(false)
  const [successSend, setSuccessSend] = useState(false)

  //Traduccion
  //decalro la funcion idiomas que uso de los /public/locales/*json
  //en este caso uso form.json y aboutus.json
  //const { t } = useTranslation(['form2', 'aboutus'])
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

  }, [opcionSeleccionada, texto,emailvalido, Name, language, city, country]);

  const validarFormulario = () => {
    // Verificar si se ha seleccionado una opción en ambos radio buttons y si se ha ingresado texto
    if (opcionSeleccionada.length && emailvalido && Name.length > 3
      && country.length > 3 && city.length > 3, texto.length>5
      //texto.trim() !== ''  //Inhabilito el texto
    ) {
      //Evaluo para habilitar boton de evaluacion

      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };



  // const handleRadioChange = (e) => {
  //   const opcion = e.target.value;
  //   // Si la opción ya está seleccionada, la removemos
  //   if (opcionSeleccionada==(opcion)) {
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


  const handleTextChange = (e) => {
    setTexto(e.target.value);
  };
  //Variables opcionales Email y Name
  const handleTextChangeName = (e) => {
    setName(e.target.value);
  };
  const handleCityChangeName = (e) => {
    setCity(e.target.value);
  };
  const handleCountryChangeName = (e) => {
    setCountry(e.target.value);
  };

  const handleTextChangeEmail = (e) => {
    setEmail(e.target.value);
    setemailvalido(validarEmail(e.target.value));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    // Aquí puedes enviar los datos del formulario a través de una API o realizar cualquier otra acción necesaria
    // console.log('Opción seleccionada:', opcionSeleccionada);
    // console.log('Opción seleccionada2:', opcionSeleccionada2);
    // console.log('Texto ingresado:', texto);
    // console.log('language:', language)

    //alert('tu puntaje es: '+ puntuacion)

    await fetch('/api/formulario/add3/',
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
          texto: texto,
          city:city,
          country:country,
          language: locale,
          Name: Name,
          Email: Email
        })

        //mando por el body la nueva clase
      }).then(response => setSuccessSend(true))

    setLoading(false)

  };

  //Para VALIDAR email en formulario y activar email en boton
  function validarEmail(email) {
    // Expresión regular para validar un email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Retorna true si el email es válido, de lo contrario retorna false
    return regex.test(email);
  }
  //Para VALIDAR que el email no este en la BD
  async function checkEmail() {

    await fetch('/api/formulario/' + Email,
      {  //redirect: 'follow',
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(response => response.json())
      .then(response2 => {
        if (response2.totalResults) {
          //  alert('existe');
          setshowMessage(true)
          setemailvalido(true)
          setshowForm(true)
          //setemailvalido(false)
          //setshowForm(false)
        }
        if (!response2.totalResults) {
          //  alert('NO EXISTE');
          setshowMessage(null)
          setemailvalido(true)
          setshowForm(true)
        }

        //  console.log(response2)
      })
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

            {/* Chequeo de Nome e EMAIL */}
            {showForm &&
              <div className="p-10 w-[768px] mx-auto    md:w-full md:m-0">
                {/* Nombre */}
                <div className='flex flex-col my-3'>

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
                {/* <div className='flex flex-col my-2'> */}
                <div className='flex flex-col'>
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

                  {/* CIUDAD */}
                  {/* <div className='flex flex-col my-2'> */}
                  <div className='flex flex-col pt-3'>
                    <label
                      className='mb-2 font-bold text-[21px] text-violet_dark
md:text-[19px]'
                      htmlFor="text">
                      {t('city')}
                    </label>

                    <input
                      className='p-2 rounded-[15px] border-2 outline-primary
md:text-[14px]'
                      type="text"
                      placeholder="City"
                      id="City"
                      value={city}
                      onChange={handleCityChangeName}
                      rows="1"
                      cols="30"
                    />
                  </div>

                  {/* PAIS */}
                  {/* <div className='flex flex-col my-2'> */}
                  <div className='flex flex-col pt-3'>
                    <label
                      className='mb-2 font-bold text-[21px] text-violet_dark
md:text-[19px]'
                      htmlFor="text">
                      {t('country')}
                    </label>

                    <input
                      className='p-2 rounded-[15px] border-2 outline-primary
md:text-[14px]'
                      type="text"
                      placeholder="Country"
                      id="Country"
                      value={country}
                      onChange={handleCountryChangeName}
                      rows="1"
                      cols="30"
                    />
                  </div>


                  {showMessage && <div className='pt-2 text-warning'><p>{t('showMessage1')}</p>
                    <p>{t('showMessage2')}
                      <a href='mailto:espanolconeacademy@gmail.com' ><span className='text-primary'> espanolconeacademy@gmail.com</span></a></p>
                  </div>}

                </div>
              </div>
            }

            {/* <iframe  src="https://wordwall.net/es/embed/50915df6f6e34b5f87e83fca1b8ba292?themeId=1&templateId=8&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe> */}
            {/* Formulario */}
            {showForm && <form className="pl-10 w-[768px] mx-auto
          md:w-full md:m-0" onSubmit={handleSubmit}>

              {/* PREGUNTA 1 */}
              <div className=''>
                {/* ¿Cuál de nuestros planes te interesa? */}
                <h3 className=' font-bold
              md:text-[19px]'>{t('pregunta1')}</h3>
                <h3 className=' pl-6 font-bold
              md:text-[19px]'>{t('pregunta1-2')}</h3>

                {/* Opciones */}
                <div className=' my-5 '>

                  {/* Opcion 1 */}
                  <div className="flex items-center">

                    <input
                      className="checkbox mr-2 my-2"
                      type="checkbox"
                      id="opcion1"
                      name="pregunta1"
                      value={t('p1op1')}
                      checked={opcionSeleccionada == (t('p1op1'))}
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
                      value={t('p1op2')}
                      checked={opcionSeleccionada == (t('p1op2'))}
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
                      checked={opcionSeleccionada == (t('p1op3'))}
                      onChange={handleRadioChange}
                    />
                    <label
                      className=' text-violet_dark font-medium
                  md:text-[14px]'
                      htmlFor="opcion3">{t('p1op3')}</label>
                  </div>

                </div>

              </div>



              {/* Horarios */}
              <div className='my-8'>


                <h3 className='font-bold
              md:text-[19px]'
                  htmlFor="¿Qué temas específicos te gustaría aprender?">
                  {t('temasespecific')}</h3>

                <textarea
                  className='mt-3 rounded-[15px] p-3 border-2 outline-primary w-full
                md:text-[14px]'
                  type="text"
                  placeholder={t('temasespecificPH')}
                  id="Horarios"
                  value={texto}
                  onChange={handleTextChange}
                  rows="4"
                  cols="50"
                />
              </div>


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

            </form>}

          </>
          :

          // Mensaje al enviar el formulario
          <div className='flex flex-col justify-center items-center w-full h-screen'>

            <Image
              test='taiwebs.com'
              width={385}
              height={393}
              alt='munecos'
              src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1694366456/images/promo_img_1_fnggbr.png"}
            />



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

export default FormularioLevel
