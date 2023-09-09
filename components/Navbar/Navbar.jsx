import React from 'react';
import Image from 'next/image';
import Logo from '../../public/imgs/logo.png';
import { Inter } from "next/font/google"
import Select from 'react-select';

import { useTranslation , withTranslation } from 'next-i18next';
//import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
//const inter = Inter({ subsets: ['latin'] })


// export async function getStaticProps({ locale }) {

//     return {
//       props: {
//         ...(await serverSideTranslations(locale, ['navbar'])),
//       },
//     }
//   }
  


 function Navbar() {
    const { locale, locales, push } = useRouter()
  const handleClickLan = l => () => {
    push('/', undefined, { locale: l })
  }

  const { t } = useTranslation('navbar')
  console.log(t('img12'))
  return (
    <div className="main-header-area">
                  
    <div className="container-fluid">
        <nav className="navbar navbar-expand-md">
            {/* Logo */}
           
            <a className="navbar-brand" href="/">
                <Image id='logo' className="logo" src={Logo} alt="logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ece-menu">
                {/* <AiOutlineMenu className="icon-header-menu"/> */}
                {t('img12')}
            </button>
          
            <div className=' px-3 flex flex-row items-end'>
              {locales.map(l => (
                <div key={l} className='px-2'>
                  <button onClick={handleClickLan(l)}>{l}</button>
                </div>
              ))}
            </div>
            <div className="collapse navbar-collapse" id="ece-menu">
                {/* Header Items */}
              <ul className="navbar-nav header-items ml-auto">
                <li className="nav-item">
                    {/* <a className="nav-link Home" href="/">{languageR.HOME} </a>  */}
                </li>
                     <li className="nav-item">
                         <a className="nav-link About Us" href="/about-us">
                         languageR.ABOUTUS
                        </a>
                   </li>
                <li className="nav-item">
                        <a className="nav-link scroll Team" href='#team'>
                        {/* {languageR.TEAM} */}
                        </a>
                </li>
                <li className="nav-item">
                        {/* <a className="nav-link scroll Plans" href="#pricing"> {languageR.COSTS} </a> */}
                </li>
                <li className="nav-item">
                        {/* <a className="nav-link " href="/maintenance">{languageR.BLOG}</a> */}
                </li>
                    <li className="nav-link">
                        {/* <a className="btn-nav Contact" href="/contact">{languageR.CONTACT}</a> */}
                    </li>
                    <li  className="nav-item" style={{paddingBotton:'10px'}}>
{/* <Select 
styles={customStyles}
value={defaultVSelect}
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
                 
                </ul>
            </div>
        </nav>
    </div>
</div>
  )
}
export default withTranslation(['navbar'])(Navbar);