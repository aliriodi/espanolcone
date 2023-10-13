import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Inter } from "next/font/google"
import Logo from '../public/imgs/logo.png'
import Background from '../public/imgs/logIn-background.png'
import Vector1 from '../public/imgs/vector-1.png'
import Vector2 from '../public/imgs/vector-2.png'
import Vector3 from '../public/imgs/vector-3.png'
import Vector4 from '../public/imgs/vector-4.png'
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import nextI18NextConfig from "../next-i18next.config";
import { signIn, useSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faEye } from '@fortawesome/free-solid-svg-icons';

//para el idioma


// faChevronRight

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
  const [newUser, setNewUser] = useState({
    first_name:"",
    last_name:"",
    country:"",
    email:"",
    password:"",
    confirm_password:"",
    roles: ['student']
  })

  const [errorsForm, setErrorsForm] = useState({
    name:false,
    last_name:false,
    country:false,
    email:false,
    password:false,
    confirm_password:false,
    existing_user:false
  })

  const {data: session, status} = useSession();

  const [showConfirmPassword, setShowConfirmPassword]= useState(false)
  const [showPassword, setShowPassword]= useState(false)

  //Probando redux

  // const { locales, push } = useRouter()
  // const handleClickLan = l => () => {
  //   push('', undefined, { locale: l })
  // }
  const { t } = useTranslation('register');   

  // const { t } = useTranslation('landing', {
  //   options: { suppressHydrationWarning: true },
  // })

  // Next Auth
  useEffect(()=>{
    if(status == "authenticated")window.location.href='inicio/home';
  },[status])

  const handleSubmit = async (e) => {

    e.preventDefault()
    let isValid = true
    let errors = {
      name:false,
      last_name:false,
      country:false,
      email:false,
      password:false,
      confirm_password:false
    }

    // Expresión regular para validar un correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Haciendo validaciones
    if(newUser.first_name == ""){
      console.log(newUser.first_name == "")
      errors.name=true
      isValid = false
    }
    if(newUser.last_name.length <= 0){
      errors.last_name=true
      isValid = false
    }
    if(newUser.country.length <= 0){
      errors.country=true
      isValid = false
    }
    if(!emailPattern.test(newUser.email)){
      errors.email=true
      isValid = false
    }
    if(newUser.password.length < 8){
      errors.password=true
      isValid = false
    }
    if(newUser.confirm_password !== newUser.password){
      errors.confirm_password=true
      isValid = false
    }

    setErrorsForm(errors)

    if(!isValid)return
    try{
      await axios.post('/api/auth/signup', newUser);
      
      setErrorsForm({...errorsForm, existing_user: false})

      window.location.href='/';
    } catch (error) {

      // Usuario ya existente
      if(error.response.status == 409)setErrorsForm({...errorsForm, existing_user: true})
    }
  }

  return (
    <>
      <Head>
        <title>Español con E | Registro</title>
        <meta name="landing" content="welcome" />
      </Head>
      <Layout>
        <div className='w-full h-full flex relative
        md:overflow-hidden'
        style={{color:'#6e6b7b'}}>
          {/* Fondo */}
          <div
          className="loging-fondo bg-primary flex justify-evenly items-center flex-col h-screen w-full relative z-40 md:hidden"
          style={{background: 'radial-gradient(57.61% 52.49% at 42.81% 47.51%, #3CBBD6 0%, #05839D 100%)'}}>
            <Image src={Logo} style={{ width: '200px' }} alt='Logo' className='z-40' />
            <div className="loging-fondo_text z-40">
              <p className="text-white text-5xl font-semibold mb-4 text-center text-shadow">{t("img1")}</p>
              <p className="text-white text-5xl font-semibold mb-4 text-center text-shadow">{t("img2")}</p>
              <p className="text-white text-5xl font-semibold mb-4 text-center text-shadow">{t("img3")}</p>
            </div>
            <p className="end-text text-white border-b-2 border-warning text-shadow z-40">{t("img4")}</p>

            {/* <Image src={Vector1} alt='Vector1' className='z-20 absolute left-0 top-0 w-80' />
            <Image src={Vector2} alt='Vector2' className='z-20 absolute right-0 bottom-0 w-80' /> */}
            <Image src={Background} alt='Background' className='absolute w-full h-full z-10' priority={true}/>
          </div>

          {/* Formulario */}
          <div
            className='bg-gray_light flex flex-col justify-center px-[80px] min-w-[60%]
            md:px-[25px] md:w-[100%] md:py-[200px]'
            style={{ fontWeight: '400'}}>

            {/* <div className=' px-3 flex flex-row items-end'>
              {locales.map(l => (
                <div key={l} className='px-2'>
                  <button onClick={handleClickLan(l)}>{l}</button>
                </div>
              ))}
            </div> */}

            
            {/* Logo Responsive */}
            <div className='hidden absolute top-0  right-0 z-0 w-[100%] drop-shadow-[1px_4px_15px_#00000073]
              md:block'>
              {/* Vector 4 */}
              <Image alt='vector 4' src={Vector4} className=''/>

              {/* Logo  */}
              <div className='w-full h-full absolute top-0 flex items-center justify-center'>
                <Image src={Logo} alt='Logo' className='z-40 w-[95.04px] mx-auto flex'/>
              </div>
            </div>

            {/* Titulo */}
            <h3
              className='font-semibold text-violet_dark text-[24px]
              md:text-[21px]'
              style={{ width: '430px', marginBottom: '8px' }}>
              {t("title1")}
            </h3>

            {/* Texto */}
            <p className='md:text-[14px]'>
            {t("title2")}
            </p>

            {/* Error de Usuario ya exitente */}
            {
              errorsForm.existing_user && (
                <p className='text-danger p-3 bg-danger_clean' style={{borderRadius:'4px'}}>
                   {t("warninguser")}
                </p>
              )
            }

            <form action="" onSubmit={handleSubmit}>

                {/* Campos */}
                <div className='flex justify-between relative
                md:flex-col md:hidden'>

                  {/* Campo de la Izquierda */}
                  <div className='w-full pr-5 md:p-0'>
                    {/* Campo Nombre */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>
                        
                        <div style={{ margin: '8px 0' }}>
                            <label htmlFor="name" className="md:text-[12px]">{t("name")}</label>
                        </div>

                        <input
                          className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.name ? "border-danger" :"border-gray-clear"}
                          md:text-[12px]`}
                          type="text"
                          id="name"
                          placeholder='John'
                          value={newUser.first_name}
                          onChange={(e) => setNewUser({...newUser, first_name: e.target.value})}
                        />
                        
                        {/* Error de Nombre */}
                        {errorsForm.name && (
                            <p className='text-danger'>{t("warningname")}</p>
                        )}
                    </div>

                    {/* Campo Pais */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>

                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                            <label htmlFor="country" className="md:text-[12px]">{t("country")}</label>
                        </div>

                        <input
                          className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.country ? "border-danger" :"border-gray-clear"}
                          md:text-[12px]`}
                          type="text"
                          id="country"
                          placeholder='U.S.A.'
                          value={newUser.country}
                          onChange={(e) => setNewUser({...newUser, country: e.target.value})}
                        />

                        {/* Error de Pais */}
                        {errorsForm.country && (
                            <p className='text-danger'>{t("warningCountry")}</p>
                        )}
                    </div>
                    
                    {/* Campo Confirma Contraseña */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>
                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                            <label htmlFor="password" className="md:text-[12px]">{t("password")}</label>
                        </div>
                        
                        <div className='relative'>
                          <input
                            className={`p-2 rounded-md border focus-visible:outline-none w-full ${errorsForm.password ? "border-danger" :"border-gray-clear"}
                            md:text-[12px]`}
                            type={showConfirmPassword ? "text" : "password"}
                            id="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
                            
                            {/* Ojo */}
                            <FontAwesomeIcon 
                            onClick={()=> showConfirmPassword ? setShowConfirmPassword(false) : setShowConfirmPassword(true)}
                            className={`${showConfirmPassword ? "text-dark" : "text-dark_flat_hover"} absolute  top-1/2 transform -translate-y-1/2 right-0 mr-[13px] cursor-pointer max-w-[16px]`}
                            icon={faEye}/>
                        </div>
                        
                         <span className="toggle-password"></span>
                        {/* Error de Contraseña */}
                        {errorsForm.confirm_password && (
                            <p className='text-danger flex'>{t("warningPass")}</p>
                        )}
                    </div>   
                  </div>

                  {/* Campo de la Derecha */}
                  <div className='w-full pl-5 md:p-0'>
                    
                    {/* Campo Apellido */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>

                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                            <label htmlFor="last_name" className='md:text-[12px]'>{t("password")}</label>
                        </div>

                        <input
                          className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.last_name ? "border-danger" :"border-gray-clear"}
                          md:text-[12px]`}
                          type="text"
                          id="last_name"
                          placeholder='Doe'
                          value={newUser.last_name}
                          onChange={(e) => setNewUser({...newUser, last_name: e.target.value})}
                        />

                        {/* Error de Apellido */}
                        {errorsForm.last_name && (
                            <p className='text-danger md:text-[12px]'>{t("warningLastname")}</p>
                        )}
                    </div>

                    {/* Campo Email */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>

                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                            <label htmlFor="email" className='md:text-[12px]'>{t("email")}</label>
                        </div>

                        <input
                          className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.email ? "border-danger" :"border-gray-clear"}
                          md:text-[12px]`}
                          type="text"
                          id="email"
                          placeholder='johndoe@gmail.com'
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          />
                          
                        {/* Error de Email */}
                        {errorsForm.email && (
                            <p className='text-danger md:text-[12px]'>{t("warningEmail")}</p>
                        )}
                    </div>
                    
                    {/* Campo Contraseña */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>
                      
                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                            <label htmlFor="confirm_password" className='md:text-[12px]'>{t("confirmPaswword")}</label>
                        </div>

                        <div className='relative'>
                          <input
                            className={`p-2 rounded-md border focus-visible:outline-none w-full ${errorsForm.password ? "border-danger" :"border-gray-clear"}
                            md:text-[12px]`}
                            type={showPassword ? "text" : "password"}
                            id="confirm_password"
                            value={newUser.confirm_password}
                            onChange={(e) => setNewUser({...newUser, confirm_password: e.target.value})}/>
                            
                            {/* Ojo */}
                            <FontAwesomeIcon 
                            onClick={()=> showPassword ? setShowPassword(false) : setShowPassword(true)}
                            className={`${showPassword ? "text-dark" : "text-dark_flat_hover"} absolute  top-1/2 transform -translate-y-1/2 right-0 mr-[13px] cursor-pointer max-w-[16px]`}
                            icon={faEye}/>
                        </div>
                          
                        {/* Error de Contraseña */}
                        {errorsForm.password && (
                            <p className='text-danger md:text-[12px]'>{t("warningPassw")}</p>
                        )}
                    </div>
                  </div>

                </div>

                {/* Responsive Campos */}
                <div className='justify-between relative hidden
                md:flex-col md:flex'>

                  {/* Campo de la Izquierda */}
                  <div className='w-full pr-5 md:p-0'>
                    {/* Campo Nombre */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>
                        
                        <div style={{ margin: '8px 0' }}>
                            <label htmlFor="name" className="md:text-[12px]">{t("name")}</label>
                        </div>

                        <input
                          className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.name ? "border-danger" :"border-gray-clear"}
                          md:text-[12px]`}
                          type="text"
                          id="name"
                          placeholder='John'
                          value={newUser.first_name}
                          onChange={(e) => setNewUser({...newUser, first_name: e.target.value})}
                        />
                        
                        {/* Error de Nombre */}
                        {errorsForm.name && (
                            <p className='text-danger'>{t("warningname")}</p>
                        )}
                    </div>

                    {/* Campo Pais */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>

                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                            <label htmlFor="country" className="md:text-[12px]">{t("country")}</label>
                        </div>

                        <input
                          className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.country ? "border-danger" :"border-gray-clear"}
                          md:text-[12px]`}
                          type="text"
                          id="country"
                          placeholder='U.S.A.'
                          value={newUser.country}
                          onChange={(e) => setNewUser({...newUser, country: e.target.value})}
                        />

                        {/* Error de Pais */}
                        {errorsForm.country && (
                            <p className='text-danger'>{t("warningCountry")}</p>
                        )}
                    </div>
                    
                    {/* Campo Apellido */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>

                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                            <label htmlFor="last_name" className='md:text-[12px]'>{t("password")}</label>
                        </div>

                        <input
                          className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.last_name ? "border-danger" :"border-gray-clear"}
                          md:text-[12px]`}
                          type="text"
                          id="last_name"
                          placeholder='Doe'
                          value={newUser.last_name}
                          onChange={(e) => setNewUser({...newUser, last_name: e.target.value})}
                        />

                        {/* Error de Apellido */}
                        {errorsForm.last_name && (
                            <p className='text-danger md:text-[12px]'>{t("warningLastname")}</p>
                        )}
                    </div>

                    {/* Campo Email */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>

                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                            <label htmlFor="email" className='md:text-[12px]'>{t("email")}</label>
                        </div>

                        <input
                          className={`p-2 rounded-md border-2 focus-visible:outline-none ${errorsForm.email ? "border-danger" :"border-gray-clear"}
                          md:text-[12px]`}
                          type="text"
                          id="email"
                          placeholder='johndoe@gmail.com'
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          />
                          
                        {/* Error de Email */}
                        {errorsForm.email && (
                            <p className='text-danger md:text-[12px]'>{t("warningEmail")}</p>
                        )}
                    </div>
                    
                    {/* Campo Contraseña */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>
                      
                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                            <label htmlFor="confirm_password" className='md:text-[12px]'>{t("confirmPaswword")}</label>
                        </div>

                        <div className='relative'>
                          <input
                            className={`p-2 rounded-md border focus-visible:outline-none w-full ${errorsForm.password ? "border-danger" :"border-gray-clear"}
                            md:text-[12px]`}
                            type={showPassword ? "text" : "password"}
                            id="confirm_password"
                            value={newUser.confirm_password}
                            onChange={(e) => setNewUser({...newUser, confirm_password: e.target.value})}/>
                            
                            {/* Ojo */}
                            <FontAwesomeIcon 
                            onClick={()=> showPassword ? setShowPassword(false) : setShowPassword(true)}
                            className={`${showPassword ? "text-dark" : "text-dark_flat_hover"} absolute  top-1/2 transform -translate-y-1/2 right-0 mr-[13px] cursor-pointer max-w-[16px]`}
                            icon={faEye}/>
                        </div>
                          
                        {/* Error de Contraseña */}
                        {errorsForm.password && (
                            <p className='text-danger md:text-[12px]'>{t("warningPassw")}</p>
                        )}
                    </div>

                    {/* Campo Confirma Contraseña */}
                    <div className="flex flex-col mt-[18px]
                    md:mt-[10px]"
                    style={{ width:'100%', flexGrow:1}}>
                        <div className="flex justify-between" style={{ margin: '8px 0' }}>
                            <label htmlFor="password" className="md:text-[12px]">{t("password")}</label>
                        </div>
                        
                        <div className='relative'>
                          <input
                            className={`p-2 rounded-md border focus-visible:outline-none w-full ${errorsForm.password ? "border-danger" :"border-gray-clear"}
                            md:text-[12px]`}
                            type={showConfirmPassword ? "text" : "password"}
                            id="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
                            
                            {/* Ojo */}
                            <FontAwesomeIcon 
                            onClick={()=> showConfirmPassword ? setShowConfirmPassword(false) : setShowConfirmPassword(true)}
                            className={`${showConfirmPassword ? "text-dark" : "text-dark_flat_hover"} absolute  top-1/2 transform -translate-y-1/2 right-0 mr-[13px] cursor-pointer max-w-[16px]`}
                            icon={faEye}/>
                        </div>
                        
                         <span className="toggle-password"></span>
                        {/* Error de Contraseña */}
                        {errorsForm.confirm_password && (
                            <p className='text-danger flex'>{t("warningPass")}</p>
                        )}
                    </div>   
                  </div>

                </div>


              {/* Recordar Contraseña */}
              <div className='my-6 flex' style={{alignItems:"center"}}>  
                <input type="checkbox" id="remember" className=' checkbox' />
                <label htmlFor="remember" className='ml-3 md:text-[14px]'>{t("remember")}</label>
                
              </div>


              {/* Botones */}
              <div className='flex justify-between'>

                {/* Anterior */}
                <button
                type="button"
                onClick={()=>window.history.back()}
                className="px-8 py-2 btn-primary-border
                md:text-[14px]"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className='mr-2 w-2'/>
                  {t("backButton")}
                </button>

                {/* Siguiente */}
                <button
                className="px-8 py-2 btn-primary
                md:text-[14px]"
                type="submit"
                >
                  {t("forwardButton")}
                  <FontAwesomeIcon icon={faChevronRight} className='ml-2 w-2'/>
                </button>
              </div>

            </form>
          </div>

          {/* Vector 3 */}
          <Image src={Vector3} alt='Vector3' className='z-20 absolute right-0 bottom-0 w-40
          md:w-[8em]' />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing', 'navbar', 'common', 'menu', 'aboutus', 'index', 'footer','register'], nextI18NextConfig)),
    },
  }
}