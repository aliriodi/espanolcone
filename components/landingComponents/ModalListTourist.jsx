import React, { useState } from 'react';
import Logo from '../../public/imgs/logo-gradient.png';
import Image from 'next/image';
import { faCircleCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useTranslation } from 'next-i18next';

export default function ModalListTourist(props) {
    const { t } = useTranslation(['index','navbar']);

    // Definir el estado para almacenar la cadena
    const [name, setName] = useState('');
    const [inputString, setInputString] = useState('');
    const [validateEmail, setvalidateEmail] = useState(false);
    const [emailok, setEmailok] = useState(false);
    const [loading, setLoading] = useState(false)

    // Función para manejar cambios en el input
    const handleInputChange = (event) => {
        setInputString(event.target.value);
        // Expresión regular para validar un correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setvalidateEmail(regex.test(event.target.value))
    };

    async function sendList() {

        setLoading(true)
        
        try {

            await fetch('/api/email/add',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({ email: inputString, suscribe: true ,from:'tourist'}),
            })

            // Envia emails
            let email = {
                to: inputString,
                subject: `
                 "¡Descubre la Experiencia de Turismo Idiomático en Córdoba!":""}
                ${t("labelLanguage") == "En" ? "Discover the Language Tourism Experience in Córdoba!":""}
                ${t("labelLanguage") == "Pt" ? " Descubra a Experiência de Turismo Idiomático em Córdoba!":""}
                `,
                content:`
                ${t("labelLanguage") == "Es" ?
                    `
                    <p><b>¡Hola ${name}!</b></p>

                    <p>Esperamos que estés muy bien. Queríamos expresarte nuestro agradecimiento por haber mostrado interés en nuestra experiencia de turismo idiomático en Córdoba. ¡Nos alegra mucho la posibilidad de compartir contigo esta increíble aventura!</p>

                    <p>Córdoba es una ciudad llena de encanto, historia y cultura. Desde sus hermosos paisajes naturales hasta su rica gastronomía y su vibrante vida nocturna, hay tanto por descubrir y disfrutar. Te aseguramos que te enamorarás de cada rincón de esta maravillosa ciudad.</p>

                    <p>Nuestra experiencia de turismo idiomático te ofrece la oportunidad perfecta para sumergirte en el idioma español mientras exploras los tesoros de Córdoba. Durante una semana, del 17 al 22 de junio, tendrás la oportunidad de vivir una experiencia única que te permitirá tomar clases de español a diario bajo un contexto totalmente diferente al usual, mejorar tus habilidades lingüísticas, conocer gente nueva y sumergirte en la cultura local.</p>

                    <p>Si estás interesado en obtener más información sobre esta experiencia o si deseas agendar una videollamada para conversar sobre los detalles, no dudes en ponerte en contacto con nosotros a través de nuestro correo electrónico <a href="mailto:espanolconeacademy@gmail.com">espanolconeacademy@gmail.com</a>. Estamos aquí para responder a todas tus preguntas y ayudarte en cada paso del proceso.</p>

                    <p>Pronto te proporcionaremos más detalles sobre el viaje, incluyendo el itinerario, las actividades programadas y toda la información que necesitas para prepararte para esta aventura inolvidable.</p>

                    <p>Una vez más, te agradecemos por tu interés en nuestra experiencia de turismo idiomático en Córdoba. Sería un placer tenerte a bordo y de compartir esta experiencia contigo.</p>

                    <p>¡Esperamos poder saludarte personalmente en Córdoba pronto!</p>

                    <p>¡Saludos cordiales!</p>

                    <p><b>Equipo de Español con E</b></p>
                    `:``
                }

                ${t("labelLanguage") == "En" ?
                    `
                    <p>Hello ${name}!</p>

                    <p>We hope you are doing well. We want to thank you for showing interest in our language tourism experience in Córdoba. We are thrilled for sharing this incredible adventure with you!</p>

                    <p>Córdoba is a city full of charm, history, and culture. From its beautiful natural landscapes to its rich gastronomy and vibrant nightlife, there is so much to discover and enjoy. We assure you that you will fall in love with every corner of this wonderful city.</p>

                    <p>Our language tourism experience offers you the perfect opportunity to immerse yourself in the Spanish language while exploring the treasures of Córdoba. During one week, from June 17th to June 22nd, you will have the chance to live a unique experience that will allow you to take Spanish lessons daily in a completely different context from the usual, improve your language skills, meet new people, and immerse yourself in the local culture.</p>

                    <p>If you are interested in obtaining more information about this experience or if you would like to schedule a video call to discuss the details, please do not hesitate to contact us via our website espanolcone. We are here to answer all your questions and help you every step of the way.</p>

                    <p>Soon, we will provide you with more details about the trip, including the itinerary, scheduled activities, and all the information you need to prepare for this unforgettable adventure.</p>

                    <p>Once again, we thank you for your interest in our language tourism experience in Córdoba. It would be a pleasure to have you on board and to share this experience with you.</p>

                    <p>We look forward to greeting you in person in Córdoba soon!</p>

                    <p>Best regards,</p>

                    <p><b>Equipo de Español con E</b></p>
                    `:``
                }

                ${t("labelLanguage") == "Pt" ?
                `
                    <p>Olá ${name}!</p>

                    <p>Esperamos que esteja tudo bem contigo. Queremos expressar nosso agradecimento por mostrar interesse em nossa experiência de turismo idiomático em Córdoba. Ficamos muito felizes com a possibilidade de compartilhar essa incrível aventura com você!</p>

                    <p>Córdoba é uma cidade cheia de encanto, história e cultura. Desde suas belas paisagens naturais até sua rica gastronomia e sua vibrante vida noturna, há tanto para descobrir e desfrutar. Garantimos que você se apaixonará por cada canto desta maravilhosa cidade.</p>

                    <p>Nossa experiência de turismo idiomático oferece a oportunidade perfeita para se imergir no idioma espanhol enquanto explora os tesouros de Córdoba. Durante uma semana, de 17 a 22 de junho, você terá a chance de viver uma experiência única que lhe permitirá ter aulas de espanhol diárias em um contexto totalmente diferente do habitual, melhorar suas habilidades linguísticas, conhecer novas pessoas e mergulhar na cultura local.</p>

                    <p>Se estiver interessado em obter mais informações sobre esta experiência ou se desejar agendar uma videochamada para discutir os detalhes, não hesite em entrar em contato conosco através de nosso site espanolcone.com. Estamos aqui para responder a todas as suas perguntas e ajudá-lo em cada etapa do processo.</p>

                    <p>Em breve, forneceremos mais detalhes sobre a viagem, incluindo o itinerário, as atividades programadas e todas as informações que você precisa para se preparar para esta aventura inesquecível.</p>

                    <p>Mais uma vez, agradecemos pelo seu interesse em nossa experiência de turismo idiomático em Córdoba. Seria um prazer tê-lo a bordo e compartilhar esta experiência com você.</p>

                    <p>Esperamos poder cumprimentá-lo pessoalmente em Córdoba em breve!</p>

                    <p>Saudações cordiais!</p>

                    <p><b>Equipo de Español con E</b></p>
                    `:``
                }

                `
            }

            await axios.post('/api/mail/template/1', email)
            setLoading(false)


        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        setEmailok(true)

    }
    return (


        <div>
            <div
            onClick={() => props.open(false)}
            className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-[999]'>

                {
                !emailok ?
                <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-[20px] p-[50px] flex flex-col justify-between w-[475px] h-[551px] relative
                md:w-full md:rounded-none'>
                    {/* Boton de cerrar modal */}
                    <FontAwesomeIcon
                    onClick={() => props.open(false)}
                    icon={faX}
                    className='absolute right-5 top-5 text-violet_dark w-[12px] z-50 ursor-pointer'/>
                    

                    {/* Anotate en la lista */}
                    <div className=' font-semibold text-[24px] text-[#4F4F4F] text-center mb-[25px]
                    md:text-[21px]'>

                      {t("card4.2.trip")}  

                        {/* Text */}
                        <p className='text-[16px] font-medium'>
                            {!emailok && t("card4.2.messageModal")}
                        </p>
                    </div>

                    {/* Input */}
                    {
                    !emailok &&
                    <>
                        <input
                        placeholder= {t("card4.2.name")}  
                        className='rounded-md border-2 border-primary outline-primary_hover p-3 w-full mb-3'
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)} />

                        <input
                        placeholder= {t("card4.2.holder")}  
                        className='rounded-md border-2 border-primary outline-primary_hover p-3 w-full mb-3'
                        type="text"
                        value={inputString}
                        onChange={handleInputChange} />
                    </>
                    }

                    {/* Email Invalido o valido message */}
                    {/* {inputString.length > 6 && !validateEmail && <div className='text-red-500'> {t("card4.2.emailInvalid")}</div>} */}


                    <div>
                        {/* Boton de enviar */}
                        {
                        <div className='flex justify-center  text-center mb-[20px]'>
                            <button 
                            className={`bg-primary rounded-full text-white w-full p-2 text-[20px] ${(!validateEmail || name == "") && 'hidden'} transition-all
                            hover:bg-[#4ED5F2] hover:shadow-[0px_4px_14px_0px_#3CBBD661]`}
                            onClick={() => sendList()}>

                                {
                                    !loading ?
                                    `${t("card4.2.send")}`
                                    :
                                    <div
                                    className="inline-block  h-4 w-4 animate-spin rounded-full border-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status"
                                    ></div>
                                }
                                
                            </button>
                                    
                            <div
                            className={`bg-primary rounded-full text-white w-full p-2 text-[20px] ${validateEmail && name.length > 0 && 'hidden'} opacity-50 pointer-events-none`}>
                                {t("card4.2.send")}
                            </div>
                        </div>}


                        {/* Mostrar mensaje email agendado */}
                        {emailok && <div>{t("card4.2.sendOK")}</div>}

                        <button
                        className={`border-2 border-primary rounded-full text-primary w-full p-2 text-[20px] transition-all font-medium
                        hover:bg-primary_flat_hover hover:shadow-[0px_4px_14px_0px_#3CBBD661]`}
                        onClick={() => props.open(false)}>
                            {t("card4.2.cancel")}
                        </button>

                    </div>
                    
                </div>
                :
                // Email enviado
                <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-[20px] p-[50px] flex flex-col justify-center items-center w-[475px] h-[551px] relative
                md:w-full md:rounded-none'>

                    {/* Boton de cerrar modal */}
                    <FontAwesomeIcon
                    onClick={() => props.open(false)}
                    icon={faX}
                    className='absolute right-5 top-5 text-violet_dark w-[12px] z-50 ursor-pointer'/>

                    {/* Imagen */}
                    <Image
                    src="https://res.cloudinary.com/dfddh08q8/image/upload/v1707320677/images/jfiusky8gpmn9cu8qkfw.png"
                    width={141}
                    height={140}
                    />

                    {/* Texto */}
                    <div className=' font-semibold text-[24px] text-[#4F4F4F] text-center mb-[25px] mt-[37px]
                    md:text-[21px]'>

                        {"You're on the list! "}

                        {/* Text */}
                        <p className='text-[16px] font-medium mt-[20px]'>
                            {"We'll keep you posted on all the latest news."}
                            {/* {t("card4.2.sendOK")} */}
                        </p>

                        {/* Boton */}
                        <button 
                        className={`bg-primary rounded-full text-white w-full p-2 text-[20px] transition-all mt-[37px]
                        hover:bg-[#4ED5F2] hover:shadow-[0px_4px_14px_0px_#3CBBD661]`}
                        onClick={() => props.open(false)}>
                            Great!
                        </button>
                    </div>


                </div>
                }
                
            </div>
        </div>
    )
}
