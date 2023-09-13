import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'next-i18next';


 export default function Three() {
  
  const { t } = useTranslation('aboutus')
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
            <h2 className="text-xl font-semibold text-white">{t("card3.0.title.0")}</h2>
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
            <h2 className="text-xl font-semibold text-white">{t("card3.0.title.1")}</h2>
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
            <h2 className="text-xl font-semibold text-white">{t("card3.0.title.2")}</h2>
          </div>
        </div>
        <div className="grid grid-cols-3 bg-[#dadbdf]">
          <div className=" py-4 mx-[220px] text-center ">
            <p>{t("card3.0.paragraph.0")}</p>
          </div>
          <div className=" py-4 mx-[220px] text-center">
            <p>{t("card3.0.paragraph.1")}</p>
          </div>
          <div className=" py-4 mx-[220px] text-center">
            <p>{t("card3.0.paragraph.2")}</p>
            <div className=' flex items-center justify-end mt-[50px] z-20'>
              <Image
                src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366429/images/icon_desc_about_wxyaz9.png"
                alt="Teléfono"
                width={150}
                height={300}
              />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}


