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

    function sendEmail(e) {
        e.preventDefault();
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        console.log(e.target[2].value)
        console.log('name',name,'email',email,'message',message)

    }


    return (
        <>
            <Head>
                <title>Español con E | Bienvenidos</title>
                <meta name="landing" content="welcome" />
            </Head>


            <Layout className='bg-white relative overflow-x-hidden'>
                <Navbar light={true} />
                <section className='flex items-center justify-center flex-col bg-white px-[170px] min-h-screen py-[187px] relative
        md:px-[20px]'>

                    {/* Titulo */}
                    <h1 className='underlined-title mb-[111px] z-10'> {t("title")}</h1>

                    <div className="flex items-center justify-center z-10
          md:flex-col">

                        <section id="contact" className="ptb_150" style={{ background: '#F7F8FD' }}>
                            <div className="container" >
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-6">
                                        {/* Section Heading */}
                                        <div className="section-heading ">

                                            <p className="d-sm-block mt-4">{t("paragraph1")}</p>
                                            <p style={{ paddingBottom: "20px" }} className="d-sm-block mt-4">{t("paragraph2")}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ justifyContent: 'center' }} className="contact-section ">
                                    <div className="">
                                        {/* Contact Box */}
                                        <div className="contact-box text-center">
                                            {/* Contact Form */}
                                            <form ref={form} onSubmit={sendEmail} >
                                                <div style={{ margin: '0', justifyContent: 'center' }} className="">
                                                    <div className="">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="name"
                                                                value={name}
                                                                onChange={handleInputChange}
                                                                placeholder={t("fullname")}
                                                                required="required"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                name="email"
                                                                onChange={handleInputChange}
                                                                placeholder={t("email")}
                                                                value={email}
                                                                required="required"
                                                            />
                                                        </div>
                                                        <div className="">
                                                            <div className="form-group">
                                                                <textarea
                                                                    className="form-control"
                                                                    name="message"
                                                                    placeholder={t("message")}
                                                                    onChange={handleInputChange}
                                                                    value={message}
                                                                    required="required"
                                                                />
                                                            </div>

                                                            <button className={'btn-action bg-primary rounded-md text-white '} style={{ position: 'absolute', right: '33%', width: '78px', height: '40px' }} type="submit"  >{t("send")}</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <img style={{ position: 'absolute', top: '58%', left: '73%' }} src='https://res.cloudinary.com/dfddh08q8/image/upload/v1694366433/images/icon-profe-contact_seoqfp.png' className="teacher-contact" />
                                        <img style={{ position: 'absolute', top: '25%', transform: 'scaleX(-1)', left: "0%" }} src='/img/ellipse-70.png' className="ellipse-contact" />
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
