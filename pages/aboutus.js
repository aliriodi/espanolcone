import React, { useEffect } from 'react';
import Head from 'next/head';
import ReactGA, { initialize } from "react-ga";
import Navbar from '../components/Navbar/Navbar';
import nextI18NextConfig from "../next-i18next.config";
import { useTranslation, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import Footer from '../components/Footer/Footer';
import Image from 'next/image';
import Aprende from '../components/aboutUSComponents/Aprende';
import Three from '../components/aboutUSComponents/Three';
import Forma from '../components/aboutUSComponents/Forma';
import FourAbout from '../components/aboutUSComponents/FourAbout'
import ExpertsAbout from '../components/aboutUSComponents/ExpertsAbout'
import { dropShadow } from '@cloudinary/url-gen/actions/effect';



function Aboutus() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  const { t } = useTranslation('aboutus')
  return (
    <>
      <Head>
        <title>Español con E | Bienvenidos</title>
        <meta name="landing" content="welcome" />
      </Head>


      <Layout className='bg-white relative overflow-x-hidden'>
        <Navbar light={true}/>
        <section className='flex items-center justify-center flex-col bg-white px-[170px] min-h-screen py-[187px] relative
        md:px-[20px]'>
          
          {/* Titulo */}
          <h1 className='underlined-title mb-[111px] z-10'> {t("aboutus")}</h1>

          <div className="flex items-center justify-center z-10
          md:flex-col">

            {/* Contenido */}
            <div className="w-[532px] flex flex-col mr-[25px]
            md:w-auto md:m-0" >

              {/* Subtitulo */}
              <h2 className='subtitle'>{t("card1.title1")}</h2>

              {/* Texto */}
              <div className='mt-10'>

                <p className='text-header mb-[50px]'>{t("card1.paragraph1")}</p>
                <p className='text-header '>{t("card1.paragraph2")}</p>

              </div>
              
            </div>

            {/* Imagen */}
            <div className="w-1/2 flex items-center justify-center ml-[25px]
            md:w-auto md:ml-0 md:mt-[48px]">
              <Image
                src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366361/images/about_hzdyib.png"
                alt="Teléfono"
                width={600}
                height={300}
                style={{filter:'drop-shadow( 0px 4px 43px #00000026)'}}
                className=''
              />
            </div>

          </div>

          {/* Ellipse */}
          <Image
          className='absolute z-0 right-0 w-[33vw] h-[80vh]
          md:w-1/2 md:bottom-20 md:h-auto'
          width={600}
          height={300}
          src='https://res.cloudinary.com/dfddh08q8/image/upload/v1694366401/images/ellipse-70_s1vmal.png'
          alt='curva a la izquierda'
          />
        </section>
        <Aprende />
        <Three />
        <Forma />
        <FourAbout />
        <div id="TEAM"> <ExpertsAbout /> </div>
        <Footer />

        
        {/* Ellipse Naranja */}
        <span
        className='rounded-full h-[157px] w-[157px] z-20 absolute right-[-75px] bottom-[803px] border-warning'
        style={{border: '27px solid #ff7438'}}></span>

        
        {/* Ellipse Verde */}
        <span
        className='rounded-full h-[70px] w-[70px] z-20 absolute bottom-[746px] bg-secondary left-[15%]
        md:hidden'></span>
      </Layout>
    </>
  )
}



export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing', 'navbar', 'common', 'menu', 'aboutus','index','footer','register'], nextI18NextConfig)),
    },
  }
}
export default withTranslation(['aboutus','index'])(Aboutus);
