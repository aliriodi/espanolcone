import Head from 'next/head'
import React, { useEffect } from "react";
import { Inter } from "next/font/google"
import nextI18NextConfig from "../next-i18next.config";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NAVBAR from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const { locale, locales, push } = useRouter()
  const { t } = useTranslation(['landing','navbar'] )
  
  return (
    <>
      <Head>
        <title>Español con E | Bienvenidos</title>
        <meta name="landing" content="welcome" />
      </Head>

      <NAVBAR/>

      <Layout>
       <div>{locale +'  '+ t("img1")} </div>
      </Layout>

      <Footer/>
    </>
  )
}

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing','navbar','common','menu','aboutus'],nextI18NextConfig)),
    },
  }
}
