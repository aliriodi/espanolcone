import Head from 'next/head';
import Link from 'next/link';
import { useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useTranslation, withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import TopButton from '../../../components/landingComponents/blog/TopButton';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer/Footer';
import nextI18NextConfig from "../../../next-i18next.config";
import NAVBAR from "../../../components/Navbar/Navbar"

export default function SLUG({ devDotToPost }) {

  const { locale, locales, push } = useRouter()
  const { t } = useTranslation('navbar')

  const {
    title,
    published_at,
    social_image,
    body_html,
    user,
    type_of,
    description,
    canonical_url
  } = devDotToPost;
  const date = new Date(published_at);
  const formatedDate = `${date.getDate()}/${parseInt(date.getMonth(), 10) + 1
    }/${date.getFullYear()}`;



  return (
    <div id='nav'>
      <Head>
        <meta property="og:type" content={type_of} />
        <meta property="og:title" content={t('title')} />
        {/* <meta property="og:title" content={title} /> */}
        <meta property="og:description" content={description} />
        <meta property="og:image" content={social_image} />
        <meta property="og:url" content={canonical_url} />
      </Head>
      <Layout className='bg-white relative overflow-x-hidden'>
        <NAVBAR className="bg-[transparent]" />
        <TopButton />
        <div className="flex justify-center">

          <article className=" text-xs w-full md:w-3/4">
            <div className=" border-2 text-black bg-white md:rounded-lg overflow-hidden p-4 md:p-8">
              <div className='grid grid-cols-1  w-full sm:grid-cols-1 md:grid-cols-1  gap-4'>
              <h1 className="flex items-center justify-center text-gray-600 h-full text-5x5 font-bold mb-8">{title }</h1>
              <div className='grid grid-cols-2   justify-center gap-4'>
                {social_image?<img className="border rounded  max-h-15" src={social_image} alt={title} />:null}
              
              <div className="mt-4 markdown text-lg list-disc" dangerouslySetInnerHTML={{ __html: body_html }} />
              </div>
              {console.log( body_html)}
              </div>

              <div className="flex  justify-end  ">
                
                <div className="flex items-center  text-gray-600">
                  <img
                    className="rounded-full w-18 h-18 mr-2"
                    src={user.profile_image_90}
                    alt={user.name}
                  />
                  <div className="flex flex-col gap-x-2">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-lg">{formatedDate}</span>
                  </div>
                </div>
              
              </div>
            </div>
          </article>

        
        </div>
      </Layout>
      <Footer className='bg-[#F5F6FCCC]' />
    </div>
  );
}


export const getStaticProps = async ({ locale }) => {

  const devDotToPost = await fetch(
    `https://dev.to/api/articles/${process.env.DEV_USERNAME}/why-learn-spanish-1iji`
  );
  const res = await devDotToPost.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbar', 'footer'], nextI18NextConfig)),
      devDotToPost: res,


    }
  };
};
