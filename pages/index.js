import Head from 'next/head'
import React, { useEffect } from "react";
import { Inter } from "next/font/google"
import nextI18NextConfig from "../next-i18next.config";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import NAVBAR from "../components/Navbar/Navbar"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const { locale, locales, push } = useRouter()
  const { t } = useTranslation(['landing','navbar'] )
  
  return (
    <div>
      <Head>
        <title>Español con E | Bienvenidos</title>
        <meta name="landing" content="welcome" />
      </Head>

      <NAVBAR/>

      <Layout>
       <div>{locale +'  '+ t("img1")} </div>
       <>"paragraph2":"Él <span style={{color:'orange'}}>se llama</span> David, <span style={{color:'orange'}}>es</span> estadounidense, hace más de 10 años que vive en Córdoba, <span style={{color:'orange'}}>se siente</span> muy bien viviendo allí y no <span style={{color:'orange'}}>piensa</span> volver a su país. “<span style={{ textDecoration: 'underline' }}>Me gusta</span> la vida aquí:  la gente, la comida, el clima, el mate …”. <span style={{color:'orange'}}>Es</span> el director de una academia de idiomas y <span style={{color:'orange'}}>trabaja</span> muchas horas al día. Los fines de semana <span style={{color:'orange'}}>conduce</span> su auto para visitar diferentes partes de Córdoba, le gusta recorrer la provincia. <span style={{color:'orange'}}>Está</span> casado con una cordobesa, así que  <span style={{color:'orange'}}>domina</span> bastante bien el español porque <span style={{color:'orange'}}>habla</span> español en casa. Sin embargo, David dice: “<span style={{color:'orange'}}>reconozco</span> que aún <span style={{color:'orange'}}>tengo</span> problemas con la lengua. Mi principal problema <span style={{color:'orange'}}>es</span> que después de 10 años, todavía <span style={{color:'orange'}}>confundo</span> los tiempos del pasado” </>
      </Layout>
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
