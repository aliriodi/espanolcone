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

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { locale, locales, push } = useRouter()
  const { t } = useTranslation(['landing', 'navbar'])

  return (
    <div>
      <Head>
        <title>Español con E | Bienvenidos</title>
        <meta name="landing" content="welcome" />
      </Head>

      <Layout>
        <div className='rounded-full w-[2600px] h-[2600px] mt-[-1800px] ml-[-650px] absolute bg-primary' />
        <NAVBAR className="" />
        {/* //todo alienar esto bien */}
        <div class="flex items-center justify-center relative z-20">
          <div class="w-1/2 flex flex-col">
            {/* <h1>{locale + '  ' + t("img1")}</h1> */}
            <div className='my-10 mx-40 text-6xl text-white'>
              Descubre el mundo del español
            </div>
            <div className='my-10 mx-20 text-3xl text-white'>
              Experimenta el idioma y la cultura en primera persona
            </div>
          </div>

          <div class="w-1/2">
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
        <Four />
        <Conoce />
        <Ofrece />
        <Experts />
        <Testimonials />
      </Layout>
    </div>
  )
}

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing', 'navbar', 'common', 'menu', 'aboutus'], nextI18NextConfig)),
    },
  }
}
