import React, {useEffect} from 'react';
import Head from 'next/head';
import ReactGA, { initialize } from "react-ga";
import Navbar from '../components/Navbar/Navbar';
import nextI18NextConfig from "../next-i18next.config";
import { useTranslation , withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
   function Aboutus() {
    useEffect(()=> {
      ReactGA.pageview(window.location.pathname);
    },[]);
     const { t } = useTranslation('aboutus')
  return (
    <div>
        <Head>
        <title>Español con E | Bienvenidos</title>
        <meta name="landing" content="welcome" />
        </Head>
        <Navbar /> 
        <div>{t('aboutus')}</div>
             <p>aboutus</p>
  </div>
  )
}
export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing','navbar','common','menu','aboutus'],nextI18NextConfig)),
    },
  }
}
export default withTranslation(['aboutus'])(Aboutus);