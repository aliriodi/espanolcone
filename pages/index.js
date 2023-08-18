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
import { getuser } from "../redux/ECEActions";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useDispatch();
  const handleClick = () => {
    // go to the home
    window.location.href = '/home';
  };

  //Probando redux
  useEffect(() => { dispatch(getuser()); }, [dispatch]);

  const { userL } = useSelector((state) => state.datos);

  const { locale, locales, push } = useRouter()
  const handleClickLan = l => () => {

    push('/', undefined, { locale: l })

  }

  const { t } = useTranslation('landing', {
    options: { suppressHydrationWarning: true },
  })

  return (
    <>
      <Head>
        <title>Español con E | Bienvenidos</title>
        <meta name="landing" content="welcome" />
      </Head>
      <Layout>
        <div className='w-full h-screen flex'>
          {/* Fondo */}
          <div className="loging-fondo bg-primary flex justify-evenly items-center flex-col h-screen w-full relative z-40">
            <Image src={Logo} style={{ width: '200px' }} alt='Logo' className='z-40' />
            <div className="loging-fondo_text z-40">
              <p className="text-white text-5xl font-semibold mb-4 text-center text-shadow">{t("img1")}</p>
              <p className="text-white text-5xl font-semibold mb-4 text-center text-shadow">{t("img2")}</p>
              <p className="text-white text-5xl font-semibold mb-4 text-center text-shadow">{t("img3")}</p>
            </div>
            <p className="end-text text-white border-b-2 border-warning text-shadow z-40">{t("img4")}</p>

            <Image src={Vector1} alt='Vector1' className='z-20 absolute left-0 top-0 w-80' />
            <Image src={Vector2} alt='Vector2' className='z-20 absolute right-0 bottom-0 w-80' />
            <Image src={Background} alt='Background' className='absolute w-full h-full z-10' />
          </div>

          {/* Formulario */}
          <div
            className='bg-gray_light flex flex-col justify-center'
            style={{ fontWeight: '400', padding: '0 80px' }}>
            <div className=' px-3 flex flex-row items-end'>
              {locales.map(l => (
                <div key={l} className='px-2'>
                  <button onClick={handleClickLan(l)}>{l}</button>
                </div>
              ))}
            </div>
            <h3
              className='font-semibold text-violet_dark'
              style={{ fontSize: '28px', width: '430px', marginBottom: '8px' }}>
              {t("p1")}
            </h3>
            <p>
              {t("p2")}
            </p>

            <form action="">

              {/* Campo Email */}
              <div className="flex flex-col" style={{ margin: '25px 0' }}>
                <div style={{ margin: '8px 0' }}>
                  <label htmlFor="email">{t("p3")}</label>
                </div>
                <input
                  className='p-2 rounded-md border border-gray-clear'
                  type="text"
                  id="email"
                  placeholder={userL.email} />
              </div>

              {/* Campo Contraseña */}
              <div className="flex flex-col" style={{ margin: '25px 0' }}>
                <div className="flex justify-between" style={{ margin: '8px 0' }}>
                  <label htmlFor="password">{t("p4")}</label>
                  <a href="#" className='text-success'>{t("p5")}</a>
                </div>
                <input
                  className='p-2 rounded-md border border-gray-clear'
                  type="text"
                  id="password"
                  placeholder={userL.email} />
                <p>{t("p6")}</p>
              </div>

              {/* Recordar Contraseña */}
              <input type="checkbox" id="remember" className='mr-1' />
              <label htmlFor="remember">{t("p7")}</label>

              {/* Ingresar */}
              {/* <input
              style={{padding:'10px', margin:'20px 0', borderRadius:'8px'}}
              className="w-full bg-primary text-white cursor-pointer"
              type="submit"
              value="Ingresar"/> */}

              <button
                style={{ padding: '10px', margin: '20px 0', borderRadius: '8px' }}
                className="w-full bg-primary text-white cursor-pointer"
                // type="submit"
                value="Ingresar">
                <Link href="/home">{t("b1")}</Link>
              </button>

              {/* Crear Cuenta */}
              <div className="flex justify-around">
                <p>{t("p8")}</p>
                <a href="#" className='text-primary'>{t("p9")}</a>
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

              {/* Crear Cuenta con Redes Sociales */}
              <div className="flex justify-center">
                <a
                  style={{ margin: '0 9px', borderRadius: '8px' }}
                  className='bg-primary h-8 w-8'
                  href="#"></a>
                <a
                  style={{ margin: '0 9px', borderRadius: '8px' }}
                  className='bg-primary h-8 w-8'
                  href="#"></a>
                <a
                  style={{ margin: '0 9px', borderRadius: '8px' }}
                  className='bg-primary h-8 w-8'
                  href="#"></a>
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
      ...(await serverSideTranslations(locale, ['landing'])),
    },
  }
}
