import React from 'react'
import FormularioLevel from '../components/Formularios/FormularioLevel'
import nextI18NextConfig from '../next-i18next.config';
import { useTranslation, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function FormLevel() {
  const { t } = useTranslation(['form2', 'aboutus'])
  return (
    <div><FormularioLevel t={t}/></div>
  )

}

//export default Formulario;
export default withTranslation(['form2', 'footer', 'landing', 'form'])(FormLevel);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['form2', 'footer', 'common', 'menu', 'aboutus', 'index', 'register'], nextI18NextConfig)),

    },
  }
}

