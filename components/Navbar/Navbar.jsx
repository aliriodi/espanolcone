import React,  { useState , useEffect} from 'react';
import Image from 'next/image';
import Select from 'react-select';
import Link from 'next/link';
import { useTranslation , withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import styles from '../../styles/navbar.module.css';
import { useRef } from 'react';
//import LogoGradient from '../../public/imgs/Logo-gradient.png'
 function Navbar(props) {
  const [lightNavBar, setLightNavBar] = useState(false);
  const { light } = props;
  const [showMenuLanguage, setShowMenuLanguage] = useState(false)
  const { locale, locales, push } = useRouter()
  function handleClickLan(l) {
      push('/', undefined, { locale: l });
  }
  function handleOnChange(lang){
    push('', undefined, { locale: lang.value });
    setLanguage(languages2.find(objeto => objeto.value === lang.value))                      
  }

  const { t } = useTranslation(['navbar','aboutus'])
  //Me traigo las imagenes banderas de los Json 
  ///public/locales/ idiomas que son lo mismo para los 3
  
  const languages2 = [{value:'es', label:'ESPAÑOL',   image:t("flages")},
                      {value:'en', label:'INGLÉS',    image:t("flagen")},
                      {value:'pt', label:'PORTUGUÉS', image:t("flagpt")}];

  const [language, setLanguage] = useState(languages2.find(objeto => objeto.value === locale));

  // Cambio de color del NavBar 
  useEffect(()=>{
    setLightNavBar(light)
  },[light])
  
  // Estilos React-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor:  '#f00',  // Cambiar el color de fondo a "inherit"
      width: '210px', // Ancho específico
      height: '40px', // Alto específico
      borderRadius: '8px', // Curvatura de bordes
      borderColor: 'white',
      outline: 'none', // Remove the blue outline when focused
     
    //  borderWidth: '2px', // Cambiar el grosor del borde a 2px
      boxShadow:  '0 0 0 0px white' , // Utilizar box-shadow en lugar de outline al enfocar
      '&:hover': {
        backgroundColor: 'rgba(60, 187, 214, 0.4)',
     
        },
   
      //border-radius: 6px,
      padding: '0px 0px',
      
    }), 
      singleValue: (provided,state) => ({
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
      '&:hover': {backgroundColor: 'rgba(60, 187, 214, 0.4)',
                  color: 'black',
                  borderRadius: '0px' },
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

  function handleOnChangeLanguage(){
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

    return (
      <nav className={`${styles["navbar"]} ${lightNavBar && styles["light"]}`}>
   
        {/* Logo */}
        <Link href='/'>
          <Image
          className={styles["navbar-logo"]} 
          width={'100'} 
          height={'100'} 
          src={lightNavBar ? "https://res.cloudinary.com/dfddh08q8/image/upload/v1694520319/images/logo-gradient_ssl8cl.png" : t("logo")} alt="Español con E" /> 
        </Link>

        <div className='flex'>
          {/* Botones Baner */}
          <ul className={styles["navbar-btns"]} style={{minWidth: '610px'}}>
            <li className={styles["select-languages"]} onClick={handleOnChangeLanguage} ref={menuLanguage}>

              {/* Icono */}
              <img
              src={language?.image}
              alt={language?.label}
              className={styles["select-languages_img"]}/>

              {/* Label */}
              <label
              className={styles["select-languages_label"]}>
                {language?.label}
              </label>

              {/* Menu Desplegable */}
              {/* <ul className={`${styles['select-languages_menu']} ${showMenuLanguage && 'active'}`}> */}
              <ul className={`${styles['select-languages_menu']} ${showMenuLanguage && styles['active']}`}>
                {
                  languages2.length > 0 &&
                  languages2.map((language2)=>(
                      <li
                      onClick={()=>handleOnChange(language2)}
                      value={language2}
                      className={styles["select-languages_languages"]}
                      key={language2.value}>
                        {/* Icono */}
                        <img
                        src={language2.image}
                        alt={language2.label}
                        className={styles["select-languages_img"]}/>

                        {/* Label */}
                        <label style={{marginLeft: "8px"}}>
                          {language2.label}
                        </label>
                      </li>
                    )
                  )
                }
              </ul>


              
              {/* <Select 
                styles={customStyles}
                value={locale}
                classNamePrefix="items-dropdown-obj"
                options={languages2}
                onChange={handleOnChange}
                formatOptionLabel={(languages2) => (
                <div className="country-option">
                  <img src={languages2.image} alt="country-image" 
                      style={{ width: '58%', height: 'auto' }}/>
                  <span style={{padding: '0px 5px'}} >{languages2.label}</span>
                </div>
                )} /> */}

            </li>
            <li>
              <Link href={"/#"}>{t('BEGIN')}</Link>
            </li>
            <li>
              <Link href={"/#"}>{t('ABOUTUS')}</Link>
            </li>
            <li>
              <Link href={"/#"}>{t('TEAM')}</Link>
            </li>
          </ul>
          {/* Iniciar Secion */}
          <Link className={styles['btn-signUp']} href='/login'>{t('SIGNIN')}</Link>

        </div>


      </nav>
      
      //   <nav className={styles["nav"]}>
        
      //   <div >
      //       <div >
      //          <Image className={styles["navbar-logo"]} width={'100'} height={'100'} src={t("logo")} alt="Logo" /> 
      //       </div>
      //   </div>

      //   <ul className={styles["ul"]}>
      //       <li className={styles["li"]}>
      //           <Select 
      //                 styles={customStyles}
      //                 value={language}
      //                 classNamePrefix="items-dropdown-obj"
      //                 options={languages2}
      //                 onChange={handleOnChange}
      //                  formatOptionLabel={(languages2) => (
      //                  <div className="country-option" style={{ display: 'flex', alignItems: 'center' }}>
      //                  <img src={languages2.image} alt="country-image" 
      //                      style={{ width: '18%', height: 'auto' }}/>
      //                  <span style={{padding: '0px 6px'}} >{languages2.label}</span>
      //                  </div>
      //               )} />
      //     </li>
      //     <li className={styles["li"]}><Link href="/">{t('BEGIN')}</Link></li>
      //     <li className={styles["li"]}><Link href="/">{t('ABOUTUS')}</Link></li>
      //     <li className={styles["li"]}><Link href="/">{t('TEAM')}</Link></li>
      //     <li className={styles["li"]}><Link href="/">{t('SIGNIN')}</Link></li>
      //   </ul>
      // </nav>
  )
}
export default withTranslation(['navbar','aboutus'])(Navbar);