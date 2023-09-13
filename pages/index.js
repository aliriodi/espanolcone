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
import Ofrece from './../components/landingComponents/Ofrece';
import Experts from '../components/landingComponents/Experts';
import Image from 'next/image';
import Testimonials from '../components/landingComponents/Testimonials';
import Footer from "../components/Footer/Footer";
import pelota from '../styles/pelota.module.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { locale, locales, push } = useRouter()
  const { t } = useTranslation(['landing', 'navbar', 'index'])

  return (
    <>
      <Head>
        <title>Español con E | Bienvenidos</title>
        <meta name="landing" content="welcome" />
      </Head>
      <Layout>
        <div className={pelota["pelota"]}>
          <div className={pelota["navbar"]}>
            {/* <div className='rounded-full w-[2600px] h-[2600px] mt-[-1800px] ml-[-650px] absolute bg-primary' /> */}
            <NAVBAR className={pelota["navbar"]} />
            {/* //todo alienar esto bien */}

            <div className="flex items-center justify-center relative " style={{ zIndex: -0 }}>

              <div className="w-1/2 flex flex-col " >

                <div className='mx-[10em] flex items-start  flex-col'>
                  <div className='my-10  text-6xl text-white font-bold' style={{ fontSize: '56px', textShadow: '0px 1px 2px #00000040' }}>
                    {t("index:card1Title")}
                  </div>
                  <div className='my-10  text-3xl text-white font-semibold' style={{ textShadow: '0px 1px 2px #00000040' }}>
                    {t("index:card1Text")}
                  </div>

                  {/* Iniciar secion */}
                  <button
                    type="button"
                    className="text-primary bg-white font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 active:bg-primary active:text-white focus:outline-none"
                    style={{ fontSize: '20px', padding: '18px 28px', boxShadow: '0px 2px 8px 0px #00000040' }}          >
                    {t("index:card1Button")}
                  </button>


                </div>

              </div>

              <div className="w-1/2">
                <div className='h-[600px] flex justify-center items-end'>
                  {/* <div className='mt-[50px] mr-40 bg-slate-500 flex items-center justify-center rounded-full w-[500px] h-[500px]'> */}
                  {/* <h1 className='text-white '>poner imagen 1 aqui</h1> */}
                  {/* "cascade":"", */}
                  <Image
                    src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366393/images/banner-principal_pqirib.png"
                    alt="Teléfono"
                    width={600}
                    height={300}
                    className='mr-[200px]'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Four />
        <Conoce />
        <Ofrece />
        <div id="TEAM">
          <Experts />
        </div>
        <Testimonials />
      </Layout>

      <Footer />
    </>
  )
}

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing', 'navbar', 'common', 'menu', 'aboutus', 'index', 'footer'], nextI18NextConfig)),
    },
  }
}
