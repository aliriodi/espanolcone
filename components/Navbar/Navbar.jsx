import React,  { useState , useEffect} from 'react';
import Image from 'next/image';
import Select from 'react-select';
import Link from 'next/link';
import { useTranslation , withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import styles from '../../styles/navbar.module.css';
 function Navbar() {
 
  
  const { locale, locales, push } = useRouter()
  function handleClickLan(l) {
      push('/', undefined, { locale: l });
  }
  function handleOnChange(lang){
    push('/', undefined, { locale: lang.value });
    setLanguage(languages2.find(objeto => objeto.value === lang.value))                      
  }

  const { t } = useTranslation('navbar')
  //Me traigo las imagenes banderas de los Json 
  ///public/locales/ idiomas que son lo mismo para los 3

  const languages2 = [{value:'es', label:'ESPAÑOL',   image:t("flages")},
                      {value:'en', label:'INGLÉS',    image:t("flagen")},
                      {value:'pt', label:'PORTUGUÉS', image:t("flagpt")}];

  const [language, setLanguage] = useState(languages2.find(objeto => objeto.value === locale));
  //estilos React-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor:  'rgba(60, 187, 214, 0.2)',  // Cambiar el color de fondo a "inherit"
      width: '210px', // Ancho específico
      height: '40px', // Alto específico
      borderRadius: '8px', // Curvatura de bordes
      borderColor: 'white',
      outline: 'none', // Remove the blue outline when focused
     
      borderWidth: '2px', // Cambiar el grosor del borde a 2px
      boxShadow:  '0 0 0 0px white' , // Utilizar box-shadow en lugar de outline al enfocar
      '&:hover': {
        backgroundColor: 'rgba(60, 187, 214, 0.4)',
        color:'red',
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
      border: ' white',
      width: '200px', // Ancho específico
      height: '40px', // Alto específico
      '&:hover': {backgroundColor: 'rgba(60, 187, 214, 0.4)',
                  color: 'black',
                  borderRadius: '0px' },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(60, 187, 214, 0.0)', // Change the background color of the menu to translucent
      border: '2px solid white', // Eliminar el borde del menú desplegable
      boxShadow: 'none', // Eliminar la sombra del menú desplegable
      
       }),
  };
    return (
        <nav className={styles["nav"]}>
        
        <div >
            <div >
               <Image className={styles["navbar-logo"]} width={'100'} height={'100'} src={t("logo")} alt="Logo" /> 
            </div>
        </div>

        <ul className={styles["ul"]}>
            <li className={styles["li"]}>
                <Select 
                      styles={customStyles}
                      value={language}
                      classNamePrefix="items-dropdown-obj"
                      options={languages2}
                      onChange={handleOnChange}
                       formatOptionLabel={(languages2) => (
                       <div className="country-option" style={{ display: 'flex', alignItems: 'center' }}>
                       <img src={languages2.image} alt="country-image" 
                           style={{ width: '18%', height: 'auto' }}/>
                       <span style={{padding: '0px 6px'}} >{languages2.label}</span>
                       </div>
                    )} />
          </li>
          <li className={styles["li"]}><Link href="/">{t('BEGIN')}</Link></li>
          <li className={styles["li"]}><Link href="/">{t('ABOUTUS')}</Link></li>
          <li className={styles["li"]}><Link href="/">{t('TEAM')}</Link></li>
          <li className={styles["li"]}><Link href="/">{t('SIGNIN')}</Link></li>
        </ul>
      </nav>


//     <div className={styles['main-header-area']}>
                  
//     <div className={styles['container-fluid']}>
//         <nav className={styles["navbar navbar-expand-md"]}>
//             {/* Logo */}
           
//             <Link className={styles['navbar-brand']} href="/">
//                 <Image id='logo' className={styles.logo} src={Logo} alt="logo" />
//             </Link>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ece-menu">
//                 {/* <AiOutlineMenu className="icon-header-menu"/> */}
//                 {t('img12')}
//             </button>
          
        
//             <div className="collapse navbar-collapse" id="ece-menu">
//                 {/* Header Items */}
//               <ul className={styles["navbar-nav header-items ml-auto"]}>
//                 <li className="nav-item">
//                     <Link className="nav-link Home" href="/">{t('BEGIN')} </Link>
//                     {/* <a className="nav-link Home" href="/">{languageR.HOME} </a>  */}
//                 </li>
//                      <li className="nav-item">
//                          <a className="nav-link About Us" href="/about-us">
//                          languageR.ABOUTUS
//                         </a>
//                    </li>
//                 <li className="nav-item">
//                         <a className="nav-link scroll Team" href='#team'>
//                         {/* {languageR.TEAM} */}
//                         </a>
//                 </li>
//                 <li className="nav-item">
//                         {/* <a className="nav-link scroll Plans" href="#pricing"> {languageR.COSTS} </a> */}
//                 </li>
//                 <li className="nav-item">
//                         {/* <a className="nav-link " href="/maintenance">{languageR.BLOG}</a> */}
//                 </li>
//                     <li className="nav-link">
//                         {/* <a className="btn-nav Contact" href="/contact">{languageR.CONTACT}</a> */}
//                     </li>
//                     <li  className="nav-item" style={{paddingBotton:'10px'}}>
// <Select 
// styles={customStyles}
// value={locale}
// classNamePrefix="items-dropdown-obj"
// options={languages2}
// //onChange={handleOnChange}
// formatOptionLabel={(languages2) => (
// <div className="country-option">
//   <img src={languages2.image} alt="country-image" 
//        style={{ width: '58%', height: 'auto' }}/>
//   <span style={{padding: '0px 5px'}} >{languages2.label}</span>
// </div>
// )} />
                
// </li> 
                 
//                 </ul>
//             </div>
//         </nav>
//     </div>
// </div>
  )
}
export default withTranslation(['navbar'])(Navbar);