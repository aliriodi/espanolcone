import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import ReactGA, { initialize } from "react-ga";
import Navbar from '../components/Navbar/Navbar';
import nextI18NextConfig from "../next-i18next.config";
import { useTranslation, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import Footer from '../components/Footer/Footer';


function ContactUS() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);
    const form = useRef();
    const { t } = useTranslation('contactus')


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'message') {
            setMessage(value);
        }
    };

    async function sendEmail(e) {
        e.preventDefault();
      //  console.log(e.target[0].value)
      //  console.log(e.target[1].value)
      //  console.log(e.target[2].value)
      //  console.log('name',name,'email',email,'message',message)
        let massage = `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
            *{
                font-family: 'Montserrat', sans-serif;
                color: #fff;
            }
            body {
            /* background-color: #f4f4f4; */
            margin: 0;
            padding: 0;
            }

            .container{
              background: linear-gradient(to left bottom, #4CCFEB 70%, #33bb99);
            }

            header {
            padding: 25px;
            text-align: center;
            background-color: #fff;
            border-radius: 0 0 60px;
            /*border-radius: 0 0 60% 60%;*/
            position: relative;
            }
            header img{
              width: 123px;
              height: 78.25px;
              margin-bottom: 15px;
              position: relative;
              z-index: 90;
            }
            header h1{
              position: relative;
              font-size: 28px;
              color: #4CCFEB;
              margin: 0;
            }

            .main {   
              text-align: center;
              padding: 25px;
              font-weight: 500;
            }
            .main p{
                margin: 0;
            }
            .main .mt{
                margin-top: 12px;
            }

            footer {
            /* background-color: #007bff; */
            color: #fff;
            padding: 10px;
            font-weight: 500;
            text-align: center;
            }
        </style>
        </head>
        <body>

          <div class="container">
            <header>
              <img src="https://espanolcone-five.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdfddh08q8%2Fimage%2Fupload%2Fs--4NefY4Ug--%2Fv1701173990%2Fimages%2Fl9hxqqm6urwlk6x8qdih.png&w=384&q=75"/>
            
            </header>
            
            <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
              <p>El posible cliente <strong>${name}</strong> ha enviado el siguiente mensaje:</p>
              <br>
              <p ><strong>"${message}"</strong></p>
              <br>
              <p>El email a ser respondido es: ${email}</p>
              
            </div>
            
            <footer style="font-size: 18px;">
            
            </footer>
          </div>
        </body>
        </html>
        `
        try {
            //envio email a teacher
            await
              fetch('/api/mail/',
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    to: 'espanolconeacademy@gmail.com',
                    subject: 'Email desde el Home de: ' + name,
                    html: massage
                  })
                })}
                catch (error) {
                    console.error(error);
                  }
    }


    return (
        <>
            <Head>
                <title>Español con E | Bienvenidos</title>
                <meta name="landing" content="welcome" />
            </Head>


            <Layout className='bg-white relative overflow-x-hidden'>
                <Navbar light={true} />
                <section className='flex items-center justify-center flex-col bg-white  min-h-screen py-[187px] relative
                md:px-[25px]'>

                    {/* Titulo */}
                    <h1 className='underlined-title mb-[40px] z-10'> {t("title")}</h1>

                    <div className="flex items-center justify-center z-10
                    md:flex-col">

                        <section id="contact" className="ptb_150">

                            <div className="container" >

                                <div className="row justify-content-center mb-8">
                                    <div className="col-12 col-md-10 col-lg-6">
                                        {/* Section Heading */}
                                        <div className="section-heading text-center text-violet_dark">

                                            <p className="text-violet_dark mt-2 text-[18px]">{t("paragraph1")}</p>
                                            <p className="text-violet_dark mt-2 text-[18px]">{t("paragraph2")}</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ justifyContent: 'center' }} className="contact-section ">
                                    <div className="">

                                        {/* Contact Box */}
                                        <div className="">
                                            
                                            {/* Contact Form */}
                                            <form ref={form} onSubmit={sendEmail} >

                                                <div>

                                                    <div className="">

                                                        {/* Nombre */}
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="w-full border-2 rounded-[7px] p-2 my-2 outline-primary"
                                                                name="name"
                                                                value={name}
                                                                onChange={handleInputChange}
                                                                placeholder={t("fullname")}
                                                                required="required"
                                                            />
                                                        </div>

                                                        {/* Email */}
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                className="w-full border-2 rounded-[7px] p-2 my-2 outline-primary"
                                                                name="email"
                                                                onChange={handleInputChange}
                                                                placeholder={t("email")}
                                                                value={email}
                                                                required="required"
                                                            />
                                                        </div>

                                                        {/* Mensaje */}
                                                        <div className="">
                                                            <div className="form-group">
                                                                <textarea
                                                                    className="w-full border-2 rounded-[7px] p-2 my-2 outline-primary"
                                                                    name="message "
                                                                    placeholder={t("message")}
                                                                    onChange={handleInputChange}
                                                                    value={message}
                                                                    required="required"
                                                                />
                                                            </div>

                                                            <button className={'btn-primary rounded-md w-full py-2 font-medium'} type="submit"  >{t("send")}</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                        <img style={{ position: 'absolute', top:'80%', right: '10%' }} src='https://res.cloudinary.com/dfddh08q8/image/upload/v1694366433/images/icon-profe-contact_seoqfp.png' className="teacher-contact" />
                                        <div style={{ position: 'absolute', top: '20%', left: '96%', borderColor: '#33BB99' }} className='shape-2'>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>



                    </div>
                </section>
                <Footer />

                {/* Ellipse Naranja */}
                <span
                    className='rounded-full h-[157px] w-[157px] z-20 absolute right-[-75px] bottom-[803px] border-warning'
                    style={{ border: '27px solid #ff7438' }}></span>


                {/* Ellipse Verde */}
                <span
                    className='rounded-full h-[70px] w-[70px] z-20 absolute bottom-[746px] bg-secondary left-[15%]
        md:hidden'></span>
            </Layout>
        </>
    )
}


export async function getStaticProps({ locale }) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ['landing', 'navbar', 'common', 'menu', 'contactus', 'index', 'footer', 'register'], nextI18NextConfig)),
        },
    }
}
export default withTranslation(['aboutus', 'index'])(ContactUS);
