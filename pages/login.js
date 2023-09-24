import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Inter } from "next/font/google"
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Logo from '../public/imgs/logo.png'
import Background from '../public/imgs/logIn-background.png'
import Vector1 from '../public/imgs/vector-1.png'
import Vector2 from '../public/imgs/vector-2.png'
import Vector3 from '../public/imgs/vector-3.png'
import { getuser , getuseremail} from "../redux/ECEActions";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useSession, signIn, signOut } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai'
import { redirect } from 'next/dist/server/api-utils';
import { dropShadow } from '@cloudinary/url-gen/actions/effect';
import { color } from '@cloudinary/url-gen/qualifiers/background';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // /api/auth/signin
  // /api/auth/signout
  // https://us02web.zoom.us/j/4427876024  govtech
  // binance NE  ->  181702029
  // binance Hans -> 165410471
  // binance Alirio -> 120083470
  // binance Eucaris -> 105904746 
  // binance Marie -> 784824318 Pay ID -> 784858334 
  
  // webrtc nextjs para video streamin no limitativo a usuarios

  // import {useSession} from 'next-auth/react'
  
  // useSseion()
  const {data: session,status} = useSession();
 // console.log(session)
  const dispatch = useDispatch();
  const handleClick = () => {
    // go to the home
    window.location.href = 'inicio/home';
  };  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError]= useState(false)
  const [passwordError, setPasswordError]= useState(false)


  //Probando redux
  useEffect(() => { dispatch(getuser());
  }, [dispatch]);
  
  const { userL } = useSelector((state) => state.datos);

  const { locale, locales, push } = useRouter()
  const handleClickLan = l => () => {

    push('/login', undefined, { locale: l })

  }

  const { t } = useTranslation('landing', {
    options: { suppressHydrationWarning: true },
  })

  // Next Auth
  useEffect(()=>{
    if(status == "authenticated")window.location.href='inicio/home';
  },[status])
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    
    // Comprueba que la contraseña y email sean validos 
    if (response.error) {
      if(response.error == "incorrect email")setEmailError(true)
      if(response.error == "incorrect password"){
        setEmailError(false)
        setPasswordError(true)
      }
    } else {
      setEmailError(false)
      setPasswordError(false)
      window.location.href='inicio/home';
    }
  }

  return (
    <>
      <Head>
        <title>Español con E | Bienvenidos</title>
        <meta name="landing" content="welcome" />
      </Head>

      <Layout>
        <div className='w-full h-screen flex' style={{color:'#6e6b7b'}}>
          {/* Fondo */}
          <div className="loging-fondo bg-primary flex justify-evenly items-center flex-col h-screen w-full relative z-40">
            <Image src={Logo} style={{ width: '200px'}} alt='Logo' className='z-40' />
            <div className="loging-fondo_text z-40">
              <p className="text-white text-5xl font-semibold mb-4 text-center text-shadow">{t("img1")}</p>
              <p className="text-white text-5xl font-semibold mb-4 text-center text-shadow">{t("img2")}</p>
              <p className="text-white text-5xl font-semibold mb-4 text-center text-shadow">{t("img3")}</p>
            </div>
            <p className="end-text text-white border-b-2 border-warning text-shadow z-40">{t("img4")}</p>

            <Image src={Vector1} alt='Vector1' className='z-20 absolute left-0 top-0 w-80 filter vector-shadow'/>
            <Image src={Vector2} alt='Vector2' className='z-20 absolute right-0 bottom-0 w-80' />
            <Image src={Background} alt='Background' className='absolute w-full h-full z-10' />
          </div>

          {/* Formulario */}
          <div
            className='bg-gray_light flex flex-col justify-center'
            style={{ fontWeight: '400', padding: '0 80px' }}>
            <div className=' px-3 flex flex-row items-end'>
              {/* {locales.map(l => (
                <div key={l} className='px-2'>
                  <button onClick={handleClickLan(l)}>{l}</button>
                </div>
              ))} */}
            </div>
            <h3
              className='font-semibold text-violet_dark'
              style={{ fontSize: '28px', width: '430px', marginBottom: '8px' }}>
              {t("p1")}
            </h3>
            <p>
              {t("p2")}
            </p>

            <form action="" onSubmit={handleSubmit}>

              {/* Campo Email */}
              <div className="flex flex-col" style={{ margin: '25px 0' }}>
                <div style={{ margin: '8px 0' }}>
                  <label htmlFor="email">{t("errorEmail")}</label>
                </div>
                <input
                  className={`p-2 rounded-md border focus-visible:outline-none ${emailError ? "border-danger" :"border-gray-clear"}`}
                  type="email"
                  id="email"
                  placeholder='johndoe@gmail.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                  
                  {/* Error de contraseña */}
                  {emailError && (
                    <p className='text-danger'>{t("errorEmail")}</p>
                  )}
              </div>

              {/* Campo Contraseña */}
              <div className="flex flex-col" style={{ margin: '25px 0' }}>
                <div className="flex justify-between" style={{ margin: '8px 0' }}>
                  <label htmlFor="password">{t("p4")}</label>
                  <a href="#" className='text-success'>{t("p5")}</a>
                </div>
                <input
                  className={`p-2 rounded-md border focus-visible:outline-none ${passwordError ? "border-danger" :"border-gray-clear"}`}
                  type="text"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>

                  {/* Error de contraseña */}
                  {passwordError && (
                    <p className='text-danger'>{t("errorPassaword")}</p>
                  )}
              </div>
 
              {/* Recordar Contraseña */}
              <div className='flex items-center'>
                <input type="checkbox" id="remember" className='checkbox' />
                <label htmlFor="remember" className='ml-2'>{t("p7")}</label>
              </div>

              {/* Ingresar */}
              <input
              style={{padding:'10px', margin:'20px 0'}}
              className="w-full btn-primary"
              type="submit"
              value="Ingresar"/>

              {/* Crear Cuenta */}
              <div className="flex justify-around">
                <p>{t("p8")}</p>
                <Link href="/register" className='text-primary'>{t("p9")}</Link>
              </div>

              <div className="w-full flex justify-center items-center relative">
                <p
                  className='z-50 bg-white'
                  style={{ padding: '4px 15px', margin: '25px 0' }}>o</p>
                <span
                  className='w-full absolute z-10'
                  style={{ borderBottom: '1px #e1e0e6 solid' }}
                ></span>
              </div>

              {/* Cuenta con Redes Sociales */}
              <div className="flex justify-center">
                <span
                  onClick={()=>signIn('google',{ callbackUrl: '/inicio/home' })}
                  style={{ margin: '0 9px', borderRadius: '8px', background: "#DB3236", padding: '7px'}}
                  className='relative'
                  href="#">
                    <AiOutlineGoogle className='text-white cursor-pointer icon-white ' style={{fontSize:'1.6em'}}/>
                  </span>
                {/* <span
                  onClick={()=>signOut('google',{ callbackUrl: '/' })}
                  style={{ margin: '0 9px', borderRadius: '8px' }}
                  className='bg-primary h-8 w-8'
                  href="#"></span> */}
                {/* <a
                  style={{ margin: '0 9px', borderRadius: '8px' }}
                  className='bg-primary h-8 w-8'
                  href="#"></a> */}
              </div>
            </form>
            <Image src={Vector3} alt='Vector3' className='z-20 absolute right-0 bottom-0 w-40' />
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing','navbar'])),
    },
  }
}
