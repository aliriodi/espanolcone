import Image from 'next/image'
import React from 'react'

//import nextI18NextConfig from "../../next-i18next.config";
//import { useTranslation , withTranslation} from 'next-i18next';
//import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

 export default function Three() {
  //function Three() {
  //const { t } = useTranslation('aboutus')
  return (
    <>
      <div className=' h-auto mb-[10em]'>

        <div className="grid grid-cols-3">
          <div className="bg-primary p-4 text-center relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mx-auto mb-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* <!-- Agrega aquí el código SVG de tu elección --> */}
            </svg>
            <h2 className="text-xl font-semibold text-white">{/*t("")*/}+Objetivo</h2>
          </div>
          <div className="bg-primary p-4 text-center relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mx-auto mb-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* <!-- Agrega aquí el código SVG de tu elección --> */}
            </svg>
            <h2 className="text-xl font-semibold text-white">Misión</h2>
          </div>
          <div className="bg-primary p-4 text-center relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mx-auto mb-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* <!-- Agrega aquí el código SVG de tu elección --> */}
            </svg>
            <h2 className="text-xl font-semibold text-white">Compromiso</h2>
          </div>
        </div>
        <div className="grid grid-cols-3 h-[15em] bg-[#dadbdf]">
          <div className=" py-4 mx-[220px] text-center flex items-center ">
            <p>Garantizar el aprendizaje del español de manera atractiva para todos las personas.</p>
          </div>
          <div className=" py-4 mx-[220px] text-center flex items-center">
            <p>Impulsar a los estudiantes hacia nuevos niveles de habilidad lingüística y comprensión cultural.</p>
          </div>
          <div className=" py-4 mx-[220px] text-center flex items-center">
            <p>Difundir la lengua y la cultura de los países hispanohablantes en todo el mundo.</p>

          </div>

        </div>
        <div className=' flex items-end justify-end mt-[-100px] w-full pr-[200px]'>
          <Image
            src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366429/images/icon_desc_about_wxyaz9.png"
            alt="buscador"
            width={150}
            height={300}
          />
        </div>

      </div>
    </>
  )
}
// export async function getStaticProps({ locale }) {

//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['landing', 'navbar', 'common', 'menu', 'aboutus','index'], nextI18NextConfig)),
//     },
//   }
// }

// export default withTranslation(['aboutus'])(Three);

