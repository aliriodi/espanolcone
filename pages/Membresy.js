import React from 'react'
import Membresy from '../components/Formularios/Membresy'
import nextI18NextConfig from '../next-i18next.config';
import { useTranslation, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function FormLevel3() {
  const { t } = useTranslation(['form4', 'aboutus'])
  return (
    <div><Membresy t={t}/></div>
  )

}

//export default Formulario;
export default withTranslation(['form4', 'footer', 'landing', 'form'])(FormLevel3);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['form4', 'footer', 'common', 'menu', 'aboutus', 'index', 'register'], nextI18NextConfig)),

    },
  }
}

