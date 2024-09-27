import React from 'react'
import FormularioLevel from '../components/Formularios/FormularioLevelCollege'
import nextI18NextConfig from '../next-i18next.config';
import { useTranslation, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function FormLevel3() {
  const { t } = useTranslation(['form3', 'aboutus'])
  return (
    <div><FormularioLevel t={t}/></div>
  )

}

//export default Formulario;
export default withTranslation(['form2', 'footer', 'landing', 'form'])(FormLevel3);

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['form2', 'footer', 'common', 'menu', 'aboutus', 'index', 'register'], nextI18NextConfig)),

    },
  }
}

