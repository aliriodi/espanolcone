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


      <Layout>
        {/* <div>{t('aboutus')}</div>
        <p>aboutus</p> */}
        <Navbar />
        <div className='h-[800px] flex items-center justify-center flex-col'>
          <h1 className='flex items-center justify-center mb-[150px] text-6xl'> {t("aboutus")}</h1>
          <div className="flex items-center justify-center">

            <div className="w-1/2 flex flex-col" >
              <div className='flex flex-col items-center justify-center mx-[250px]'>
                <h1 className='text-4xl mb-[100px]'>{t("card1.title1")}</h1>
                <p className='mb-[50px]'>{t("card1.paragraph1")}
                </p>
                <p>{t("card1.paragraph2")}</p>
              </div>
            </div>

            <div className="w-1/2 flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366361/images/about_hzdyib.png"
                alt="Teléfono"
                width={600}
                height={300}
                className='mr-[200px]'
              />
            </div>
          </div>
        </div>
        <Aprende />
        <Three />
        <Forma />
        <FourAbout />
        <ExpertsAbout />
        <Footer />
      </Layout>
    </>
  )
}



export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing', 'navbar', 'common', 'menu', 'aboutus','index'], nextI18NextConfig)),
    },
  }
}
export default withTranslation(['aboutus','index'])(Aboutus);
