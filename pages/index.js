import Head from 'next/head'
import React, { useEffect } from "react";
import { Inter } from "next/font/google"
import nextI18NextConfig from "../next-i18next.config";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NAVBAR from "../components/Navbar/Navbar"
import Four from '../components/landingComponents/Four';
import Conoce from '../components/landingComponents/Conoce';
import Ofrece from '../components/landingComponents/Ofrece';
import Experts from '../components/landingComponents/Experts';
import Image from 'next/image';
import Testimonials from '../components/landingComponents/Testimonials';
import Footer from "../components/Footer/Footer";
import pelota from '../styles/pelota.module.css';
import WaitList from '../components/landingComponents/WaitList';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { locale, locales, push } = useRouter()
  const { t } = useTranslation(['landing', 'navbar', 'index','register'])

  return (
    <>
      <Head>
        <title>Español con E | Bienvenidos</title>
        <meta name="landing" content="welcome" />
      </Head>
      <Layout className='bg-white relative overflow-x-hidden'>
        
        <NAVBAR className="bg-[transparent]"/>

        {/* Encabezado */}
        <header className="flex items-center justify-center relative overflow-hidden min-h-screen px-[170px]
        md:px-[20px] md:flex-col"
        style={{ zIndex: -0 }}>
          
          {/* Contenido */}
          <div className="w-1/2 flex flex-col z-10 items-start mr-[20px] max-w-[533px]
          md:w-full md:mr-0" >

              {/* Titulo */}
              <div className='mb-[20px]  text-6xl text-white font-bold text-[56px] leading-[68.26px]
              md:text-[35px] md:leading-normal md:mb-0'
              style={{ textShadow: '0px 1px 2px #00000040'}}>
                {t("index:card1Title")}
              </div>

              {/* Texto */}
              <div className='my-[20px] text-3xl text-white font-semibold text-[36px] leading-[43.88px]
              md:text-[21px] md:leading-normal'
              style={{ textShadow: '0px 1px 2px #00000040'}}>
                {t("index:card1Text")}
              </div>

              {/* Iniciar secion */}
              <button
                type="button"
                id={"RegistrateAhora"}
                className="text-primary bg-white rounded-full w-[308px] h-[80px] mt-[20px] text-[20px] font-semibold active:bg-primary active:text-white focus:outline-none"
                style={{  boxShadow: '0px 2px 8px 0px #00000040' }}         
                onClick={()=>push('/login')} >
                {t("index:card1Button")}
              </button>

          </div>

          {/* Imagen */}
          <div className="w-1/2 z-10 ml-[20px]
          md:w-full md:ml-0 md:mb-[90px] md:mt-[40px]">
            <div className=' justify-center items-end relative'>

              <Image
                src= {t("index:ImageRueda")}
                alt="Rueda"
                width={600}
                height={300}
                style={{filter:'drop-shadow(0px 4px 43px #00000026)'}}
                className='relative z-20 min-w-[315.56px]'
              />

              {/* Nube */}
              <Image
                src="https://res.cloudinary.com/dfddh08q8/image/upload/v1695133390/images/imagen_2023-09-19_112311344_m8ivae.png"
                width={121.85}
                height={44.67} 
                className='absolute top-[23px] z-20'
                alt='montanas'
              />

              {/* Nube Tracera */}
              <Image
                src="https://res.cloudinary.com/dfddh08q8/image/upload/v1695133390/images/imagen_2023-09-19_112311344_m8ivae.png"
                width={169}
                height={62} 
                className='absolute top-0 z-10 left-[196px]'
                style={{transform:'scaleX(-1)'}}
                alt='montanitas'
              />

              {/* Sol */}
              {/* <span className='absolute h-[38px] w-[38px] rounded-full bg-[#F3BE34] top-[79px] left-[85%] z-20'/> */}
            </div>
          </div>

          {/* Pelota */}
          <span className='absolute w-full h-full z- bg-[#4BCFEA] right-[10%] scale-x-[-1.2]
          md:scale-x-[3] md:left-[-50%]'  
          style={{borderRadius:'0 0 50% 50% /0 0 100% 100% '}}/>
        </header>

        {/* Cuatro Iconos */}
        <Four />
        
        {/* Descubre nuestros planes */}
       
        <Ofrece  />

        {/* Explora nuestra App */}
        <Conoce />

        {/* Lista Blanca */}
        <WaitList/>

        {/* Equipo de Expertos */}
        <div id="TEAM">
          <Experts />
        </div>

        {/* Testimonnos */}
        <Testimonials />

      </Layout>

      <Footer className='bg-[#F5F6FCCC]' />
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
