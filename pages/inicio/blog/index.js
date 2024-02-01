import BlogPostModify from '../../../components/landingComponents/blog/BlosgpostModify';
import TopButton from '../../../components/landingComponents/blog/TopButton';
import React, { useEffect, useState } from 'react';
import ReactGA, { initialize } from "react-ga";
import { useTranslation, withTranslation } from 'next-i18next';
import nextI18NextConfig from "../../../next-i18next.config";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'
import Layout from '../../../components/Layout';
import Footer from "../../../components/Footer/Footer";
import Image from 'next/image';
import Menu from "../../../components/Menu";
import { useRouter } from 'next/router';

export default function Blog({ devDotToPosts }) {
    const [blogs, setBlogs] = useState([])
    const { locale, locales, push } = useRouter()
    const router = useRouter();
    //   const { t } = useTranslation(['navbar', 'landing', 'index','register'])
    useEffect(() => {
        async function blog() {
            const devDotToPosts = await fetch(`/api/blog/posts/get`);
            const res = await devDotToPosts.json();
            setBlogs(res.posts.reverse())
        }
        blog()
    }, []);

    return (
        <>
            <div id='nav'>

                <Head>
                    <title>Español con E | Bienvenidos</title>
                    <meta name="landing" content="welcome" />

                </Head>

                <Layout className='bg-white relative overflow-x-hidden'>
                    {/* <NAVBAR className="bg-[transparent]" /> */}
                    <Menu />
                    <TopButton />

                    <section className='grid grid-cols-2  justify-center flex-col bg-white px-[170px] py-[107px] relative   md:px-[20px]'>

                        <div onClick={() => router.push('/inicio/blog/Blog')} className='w-[200px]  mx-auto flex justify-center bg-white rounded-full p-3 mb-5 shadow-[0px_4px_24px_#0000002F] relative cursor-pointer'>
                            Crear Blog
                        </div>
                        <div onClick={() => router.push('/inicio/blog/BlogModify')} className='w-[300px]  mx-auto flex justify-center bg-white rounded-full p-3 mb-5 shadow-[0px_4px_24px_#0000002F] relative cursor-pointer'>
                            Modificar Blog Existente
                        </div>


                    </section>
                </Layout>
                <Footer className='bg-[#F5F6FCCC]' />
            </div ></>
    );
}

export async function getStaticProps({ locale }) {
    //const devDotToPosts = await fetch(`/api/blog/posts/get` );
    //  const devDotToPosts = await fetch( `https://dev.to/api/articles?username=${process.env.DEV_USERNAME}` );
    // const res = await devDotToPosts.json();

    return {
        props: {
            ...(await serverSideTranslations(locale, ['navbar', 'footer', 'landing', 'common', 'menu', 'aboutus', 'index', 'register'], nextI18NextConfig)),
            //    devDotToPosts: res.posts
        },
    }
}
  //export default withTranslation(['navbar', 'footer','aboutus','landing'])(Blog);