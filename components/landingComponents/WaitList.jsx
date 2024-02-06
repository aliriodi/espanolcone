import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ModalListTourist from './ModalListTourist';

export default function WaitList(){
    let [List, setList] = useState(false);
    const { t } = useTranslation('index');

    return(
        <section className="py-[200px] px-[164px] relative">
            {/* Titulo */}
            <div className=' mb-[50px] flex flex-col justify-center items-center z-10 relative max-w-[654px] mx-auto'>

                {/* Titulo */}
                <div className='flex justify-center items-center flex-col'>

                <h2 className='underlined-title'>
                    {t("card43Title")}
                </h2>

                </div>

                {/* Subtitulo */}
                <p className='flex flex-col items-center my-[36px] text-center font-medium max-w-[535px] text-[24px] text-[#676767]'>
                    {t("card43SubTitle")}
                </p>
            </div>

            {/* Contenido */}
            <div className='w-full flex justify-center items-center'>

                {/* Imagen */}
                <Image
                height={555}
                width={628}
                src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1707252084/images/tjr3druswjkupftx0yay.png"}/>

                {/* Texto */}
                <div className='text-[#5F5A5A] text-[18px] font-medium w-[483px]'>
                    <p>{t("card43Paragraph0")}</p>

                    <ul className='my-[36px]'>
                        <li className='flex items-start'> <span className=' w-1 h-1 bg-[#5f5a5a] rounded-full flex m-2'/> {t("card43List.0")}</li>

                        <li className='flex items-start'> <span className=' w-1 h-1 bg-[#5f5a5a] rounded-full flex m-2'/> {t("card43List.1")}</li>

                        <li className='flex items-start'> <span className=' w-1 h-1 bg-[#5f5a5a] rounded-full flex m-2'/> {t("card43List.2")}</li>

                        <li className='flex items-start'> <span className=' w-1 h-1 bg-[#5f5a5a] rounded-full flex m-2'/> {t("card43List.3")}</li>
                    </ul>

                    <p>{t("card43Paragraph1")}</p>

                    {/* Boton */}
                    <button
                    className="min-w-[255px] px-[20px] bg-primary rounded-full text-white py-[13px] transition-all text-[20px] mt-[35px]
                    hover:shadow-[0px_4px_14px_0px_#8438FFA6]" onClick={() => setList(!List)}>
                        {t("card43Button")}
                    </button>

                </div>

            </div>

            {/* Lista blanca */}
            {List && <ModalListTourist open={setList} />}
            
            {/* Ellipse Violeta */}
            <span
            className='rounded-full h-[143px] w-[143px] z-20 absolute left-[-73px] border-success top-[50%] '
            style={{border: '27px solid #8438ff'}}></span>

            
            {/* Ellipse Naranja */}
            <span
            className='rounded-full h-[110px] w-[110px] z-20 absolute  border-warning right-[-43px] bottom-0
            md:hidden'
            style={{border: '20px solid #ff7438'}}></span>

        </section>
    )
}