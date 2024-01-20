import BlogPost from '../components/landingComponents/blog/Blosgpost';
import TopButton from '../components/landingComponents/blog/TopButton';
import stylesblog from '../styles/blog.module.css'
import { useState } from "react";
import nextI18NextConfig from "../next-i18next.config";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';   
import NAVBAR from "../components/Navbar/Navbar"
import Head from 'next/head'
import Layout from '../components/Layout';
import Footer from "../components/Footer/Footer";
import Image from 'next/image';
import { useTranslation,withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

 function Blog({ devDotToPosts }) {
    const { locale, locales, push } = useRouter()
    const { t } = useTranslation(['landing', 'navbar', 'index','register'])
    return (
        <div id='nav'>
            <Head>
                <title>Español con E | Bienvenidos</title>
                <meta name="landing" content="welcome" />
            </Head>
            <Layout className='bg-white relative overflow-x-hidden'>
                <NAVBAR className="bg-[transparent]" />
                <TopButton />
                <section className='flex items-center justify-center flex-col bg-white px-[170px] min-h-screen py-[107px] relative
        md:px-[20px]'>
          
                <h1 className='underlined-title mb-[111px] z-10'> Posts</h1>
                
                <div className="flex flex-wrap sm:flex-col">
                <div className='grid grid-cols-4    w-full sm:grid-cols-1 md:grid-cols-1  gap-4'> 
                 {/* className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" */}
                    {devDotToPosts.map(
                        (post) => {
                            return (
                            
                                post.type_of === 'article' && (
                                    <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">    
                                    <BlogPost
                                        key={post.id}
                                        id={post.id}
                                        img={post.social_image}
                                        createdAt={post.published_at}
                                        title={post.title}
                                        desc={post.description}
                                        slug={post.slug}
                                        likes={post.positive_reactions_count}
                                        comments={post.comments_count}
                                        tagList={post.tag_list}
                                    />  </div>
                                )
                              
                            );
                        }
                    )}

                </div></div></section>
                </Layout>
            <Footer className='bg-[#F5F6FCCC]' />
        </div >
    );
}

export const getStaticProps2 = async () => {
    const devDotToPosts = await fetch(
        `https://dev.to/api/articles?username=${process.env.DEV_USERNAME}`
    );

    const res = await devDotToPosts.json();

    return {
        props: {
            devDotToPosts: res
        },

    };
};

export async function getStaticProps({ locale }) {
    const devDotToPosts = await fetch(
        `https://dev.to/api/articles?username=${process.env.DEV_USERNAME}`
    );

    const res = await devDotToPosts.json();

    return {
      props: {
        ...(await serverSideTranslations(locale, ['landing', 'navbar', 'common', 'menu', 'aboutus', 'index', 'footer','register'], nextI18NextConfig)),
        devDotToPosts: res
      },
    }
  }
  export default withTranslation(['navbar', 'aboutus'])(Blog);