import Head from 'next/head';
import Link from 'next/link';
import { useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import TopButton from '../../../components/landingComponents/blog/TopButton';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer/Footer';
import nextI18NextConfig from "../../../next-i18next.config";
import NAVBAR from "../../../components/Navbar/Navbar"

export default function Post({ devDotToPost }) {

  const { locale, locales, push } = useRouter()
  const { t } = useTranslation(['landing', 'navbar', 'index', 'register'])

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
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={social_image} />
        <meta property="og:url" content={canonical_url} />
      </Head>
      <Layout className='bg-white relative overflow-x-hidden'>
      <NAVBAR className="bg-[transparent]" />
      <TopButton />
      <div className="flex justify-center">
       
        
        <article className="text-xs w-full md:w-3/4 ">
          <div className="border-2 text-black bg-white md:rounded-lg overflow-hidden">
            <img className="w-full" src={social_image} alt={title} />
            <div className="p-4 md:p-32">
              <h1>{title}</h1>
              <div className="flex items-center text-gray-600">
                <img
                  className="rounded-full w-12"
                  src={user.profile_image_90}
                  alt={user.name}
                  width='100'
                  height='500'
                />
                <div className="mx-4">{user.name}</div>
                <div className="text-sm">{formatedDate}</div>
              </div>
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: body_html }}
              />
            </div>
          </div>
          <Link href="/blog" passHref legacyBehavior>
            <a className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer text-base pb-8">
              <svg
                className="w-4 h-4 mr-2"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </a>
          </Link>

        </article>
      </div>
      </Layout>
      <Footer className='bg-[#F5F6FCCC]' />
    </div>
  );
}

export const getStaticProps = async ({ params, locale }) => {

  const devDotToPost = await fetch(
    `https://dev.to/api/articles/${process.env.DEV_USERNAME}/${params.slug}`
  );
  const res = await devDotToPost.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing', 'navbar', 'common', 'menu', 'aboutus', 'index', 'footer', 'register'], nextI18NextConfig)),
      devDotToPost: res
    }
  };
};

export async function getStaticPaths() {
  const devDotToPosts = await fetch(
    `https://dev.to/api/articles?username=${process.env.DEV_USERNAME}`
  );
  const posts = await devDotToPosts.json();

  return {
    paths: posts.map((post, index) => {
      return {
        params: {
          slug: post.slug
        }
      };
    }),
    fallback: false
  };
}
