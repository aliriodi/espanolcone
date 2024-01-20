import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Select from 'react-select';
import Link from 'next/link';
import { useTranslation, withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import styles from '../../styles/navbar.module.css';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

function Navbar(props) {

  // Nav Bar Scoll
  const [scrollNavBar, setScrollNavBar] = useState(false);

  // Modo Oscuro/Claro

  const [lightNavBar, setLightNavBar] = useState(false);
  const { light } = props;
  
  // Menus
  const [showMenuLanguage, setShowMenuLanguage] = useState(false)
  const [showMenuResponsive, setShowMenuResponsive] =useState(false)

  //Traduccion
  const { locale, locales, push } = useRouter()

  function handleClickLan(l) {
    push('/', undefined, { locale: l });
  }
  function handleOnChange(lang) {
    push('', undefined, { locale: lang.value });
    setLanguage(languages2.find(objeto => objeto.value === lang.value))
  }

  const { t } = useTranslation(['navbar', 'aboutus'])
  //Me traigo las imagenes banderas de los Json 
  ///public/locales/ idiomas que son lo mismo para los 3

  const languages2 = [{ value: 'es', label: 'ESPAÑOL', image: t("flages") },
  { value: 'en', label: 'INGLÉS', image: t("flagen") },
  { value: 'pt', label: 'PORTUGUÉS', image: t("flagpt") }];

  const [language, setLanguage] = useState(languages2.find(objeto => objeto.value === locale));

  // Cambio de color del NavBar 
  useEffect(() => {
    setLightNavBar(light)
  }, [light])

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

  function handleOnChangeLanguage() {
    showMenuLanguage ? setShowMenuLanguage(false) : setShowMenuLanguage(true)
    console.log(lightNavBar)
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

  //#region Menu Responsive
  const menuResponsive = useRef(null);

  function handleOnChangeResponsive() {
    showMenuResponsive ? setShowMenuResponsive(false) : setShowMenuResponsive(true)
  }

  // Detecta si se cliquea fuera del Menu 
  useEffect(() => {
    function handleClickOutsideResponsive(event) {
      if (menuResponsive.current &&
          !menuResponsive.current.contains(event.target)&&
          !menuLanguage.current.contains(event.target)) {
        setShowMenuResponsive(false)
        console.log("ref ",menuLanguage.current)
        console.log("contain ",menuLanguage.current.contains(event.target))
        console.log("current ",event.target)
      }
    }

    // Agregar un event listener al documento para detectar clics
    document.addEventListener('click', handleClickOutsideResponsive);

    return () => {
      // Remover el event listener al desmontar el componente
      document.removeEventListener('click', handleClickOutsideResponsive);
    };
  }, []);
  //#endregion

  //#region Cambio de Nav Bar al hacer Scroll
  useEffect(()=>{
    function changeNavBarToScroll(){
      if(window.scrollY >= 80)setScrollNavBar(true)
      else setScrollNavBar(false)
    }
    window.addEventListener('scroll', changeNavBarToScroll)
  }, [])
  //#endregion
  
  return (
    <>
      {/* Nav Bar */}
      <nav className={`${styles["navbar"]} ${lightNavBar && styles["light"]}`}>

      {/* Logo */}
      <Link href='/'>
        <Image
          className={styles["navbar-logo"]}
          width={'100'}
          height={'100'}
          src={lightNavBar ? "https://res.cloudinary.com/dfddh08q8/image/upload/v1694520319/images/logo-gradient_ssl8cl.png" : t("logo")} alt="Español con E" />
      </Link>

      {/* Menu */}
      <div className={`${styles["navbar-menu"]} ${showMenuResponsive && styles['active']}`}>

        {/* Botones Baner */}
        <ul
        className={`${styles["navbar-btns"]}`}
        style={language.label==='INGLÉS'?{ minWidth: '680px' }:{ minWidth: '800px' }}>

          <li className={styles["select-languages"]} onClick={handleOnChangeLanguage} ref={scrollNavBar ? menuLanguage : null}>

            <div className={styles["select-languages_button"]}>
              {/* Icono */}
              <Image
                width={25}
                height={17}
                src={language?.image}
                alt={language?.label}
                className={styles["select-languages_img"]}/>

              {/* Label */}
              <label
                className={styles["select-languages_label"]}>
                {language?.label}
              </label>

              {/* Flecha del Responsive */}
              <FontAwesomeIcon icon={showMenuLanguage? faCaretUp : faCaretDown} className={styles["select-languages_icon"]}/>
            </div>


            {/* Menu Desplegable */}
            <ul className={`${styles['select-languages_menu']} ${showMenuLanguage && styles['active']}`}>
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
                    <label style={{ marginLeft: "8px" }}>
                      {language2.label}
                    </label>
                  </li>
                )
                )
              }
            </ul>

          </li>
          <li>
            <Link href={"/"}>{t('BEGIN').toUpperCase()}</Link>
          </li>
          <li>
            <Link href={"/aboutus"}>{t('ABOUTUS').toUpperCase()}</Link>
          </li>
          <li>
            <Link href={"#TEAM"}>{t('TEAM').toUpperCase()}</Link>
          </li>
          <li>
            <Link href={"/contactus"}>{t('CONTACTUS').toUpperCase()}</Link>
          </li>
          <li>
            <Link href={"/blog"}>{'blog'.toUpperCase()}</Link>
          </li>
        </ul>

        {/* Iniciar Secion */}
        <Link className={styles['btn-signUp']} href='/login'>{t('SIGNIN').toUpperCase()}</Link>


      </div>

      {/* Boton de Menu */}
      <button
      className={`${styles["navbar-menu_btn"]}`}
      onClick={handleOnChangeResponsive}
      ref={scrollNavBar ? menuResponsive : null}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      </nav>

      {/* Nav Bar Scroll */}
      <nav className={`${styles["navbar"]} ${lightNavBar && styles["light"]} ${styles["scroll"]} ${scrollNavBar && styles["active"]}`}>

      {/* Logo */}
      <Link href='/'>
        <Image
          className={styles["navbar-logo"]}
          width={'100'}
          height={'100'}
          src={lightNavBar ? "https://res.cloudinary.com/dfddh08q8/image/upload/v1694520319/images/logo-gradient_ssl8cl.png" : t("logo")} alt="Español con E" />
      </Link>

      {/* Menu */}
      <div className={`${styles["navbar-menu"]} ${showMenuResponsive && styles['active']}`}>

        {/* Botones Baner */}
        <ul
        className={`${styles["navbar-btns"]}`}
        style={language.label==='INGLÉS'?{ minWidth: '680px' }:{ minWidth: '800px' }}>

          <li className={styles["select-languages"]} onClick={handleOnChangeLanguage} ref={scrollNavBar ? menuLanguage : null}>

            <div className={styles["select-languages_button"]}>
              {/* Icono */}
              <Image
                width={25}
                height={17}
                src={language?.image}
                alt={language?.label}
                className={styles["select-languages_img"]}/>

              {/* Label */}
              <label
                className={styles["select-languages_label"]}>
                {language?.label}
              </label>

              {/* Flecha del Responsive */}
              <FontAwesomeIcon icon={showMenuLanguage? faCaretUp : faCaretDown} className={styles["select-languages_icon"]}/>
            </div>

            {/* Menu Desplegable */}
            <ul className={`${styles['select-languages_menu']} ${showMenuLanguage && styles['active']}`}>
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
                    <label style={{ marginLeft: "8px" }}>
                      {language2.label}
                    </label>
                  </li>
                )
                )
              }
            </ul>

          </li>
          <li>
            <Link href={"/"}>{t('BEGIN').toUpperCase()}</Link>
          </li>
          <li>
            <Link href={"/aboutus"}>{t('ABOUTUS').toUpperCase()}</Link>
          </li>
          <li>
            <Link href={"#TEAM"}>{t('TEAM').toUpperCase()}</Link>
          </li>
          <li>
            <Link href={"/contactus"}>{t('CONTACTUS').toUpperCase()}</Link>
          </li>
          <li>
            <Link href={"/blog"}>{'blog'.toUpperCase()}</Link>
          </li>
        </ul>

        {/* Iniciar Secion */}
        <Link className={styles['btn-signUp']} href='/login'>{t('SIGNIN').toUpperCase()}</Link>


      </div>

      {/* Boton de Menu */}
      <button
      className={`${styles["navbar-menu_btn"]}`}
      onClick={handleOnChangeResponsive}
      ref={scrollNavBar ? menuResponsive : null}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      </nav>
    </>
  )
}
export default withTranslation(['navbar', 'aboutus'])(Navbar);
