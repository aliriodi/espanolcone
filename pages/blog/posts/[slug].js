import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from "react";
import ReactGA, { initialize } from "react-ga";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useTranslation, withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import TopButton from '../../../components/landingComponents/blog/TopButton';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer/Footer';
import nextI18NextConfig from "../../../next-i18next.config";
import NAVBAR from "../../../components/Navbar/Navbar"
import styles from '../../../styles/blog.module.css';
import Reviews from './Reviews'
import { AiOutlineMan } from 'react-icons/ai';


function SLUG({ devDotToPost }) {
  const [post, setPost] = useState('')
  const { locale, locales, push, pathname } = useRouter()
  const { t } = useTranslation('navbar')

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  // useEffect(() => {
  //   const partesDeLaRuta = pathname.split('/');
  //   const ultimaParte = partesDeLaRuta[partesDeLaRuta.length - 1];
  //     async function blog(){
  //     const devDotToPosts = await fetch(`/api/blog/posts/${ultimaParte}` );
  //     const res = await devDotToPosts.json();
  //    // console.log(res)
  //     setPost(res.postid)
  //     }
  //     blog()
  // }, []);

  let createdAt = '';
  let es = '';
  let pt = '';
  let en = '';
  let social_image = '';
  let user = '';
  let type_of = '';
  if (devDotToPost) {
    createdAt = devDotToPost.createdAt;
    es = devDotToPost.es;
    en = devDotToPost.en;
    pt = devDotToPost.pt;
    social_image = devDotToPost.social_image;
    user = devDotToPost.user;
    type_of = devDotToPost.type_of;
  }



  const date = new Date(createdAt);
  const formatedDate = `${date.getDate()}/${parseInt(date.getMonth(), 10) + 1
    }/${date.getFullYear()}`;
  return (
    <div id='nav'>
      <Head>
        <meta property="og:type" content={type_of ? type_of : post.type_of} />
        {locale === 'en' ? <meta property="og:title" content={en?.title} /> : null}
        {locale === 'es' ? <meta property="og:title" content={es?.title} /> : null}
        {locale === 'pt' ? <meta property="og:title" content={pt?.title} /> : null}
        {locale === 'en' ? <meta property="og:title" content={en?.description} /> : null}
        {locale === 'es' ? <meta property="og:title" content={es?.description} /> : null}
        {locale === 'pt' ? <meta property="og:title" content={pt?.description} /> : null}
        <meta property="og:image" content={social_image} />

      </Head>
      <Layout className='bg-white relative overflow-x-hidden'>
        <NAVBAR className="bg-[transparent]" />
        <TopButton />
        <div className="flex justify-center">

          <article className="text-xs w-full md:w-3/4">
            <div className=" border-2 text-black bg-white md:rounded-lg overflow-hidden p-4 md:p-8">
              <div className='grid grid-cols-1  w-full sm:grid-cols-1 md:grid-cols-1  gap-4'>

                {locale === 'en' ? <h1 className="flex items-center justify-center text-gray-600 h-full text-5x5 font-bold mb-8">{en?.title}</h1> : null}
                {locale === 'pt' ? <h1 className="flex items-center justify-center text-gray-600 h-full text-5x5 font-bold mb-8">{pt?.title}</h1> : null}
                {locale === 'es' ? <h1 className="flex items-center justify-center text-gray-600 h-full text-5x5 font-bold mb-8">{es?.title}</h1> : null}
                <div className=' grid grid-cols-2  md:grid-cols-1 sm:grid-cols-1  gap-4'>
                  <div className=' '> {/*className= flex justify-center */}
                    <img className="border rounded max-h-15" src={social_image} alt={en?.title} />
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1  justify-center '>
                    <div className={styles['principal']}>
                      {locale}
                      {locale === 'pt' ? <div className="mt-2  markdown text-justify text-lg md:text-lg sm:text-xs " dangerouslySetInnerHTML={{ __html: pt?.body_html }} /> : null}
                      {locale === 'en' ? <div className="mt-2  markdown text-justify text-lg md:text-lg sm:text-xs " dangerouslySetInnerHTML={{ __html: en?.body_html }} /> : null}
                      {locale === 'es' ? <div className="mt-2  markdown text-justify text-lg md:text-lg sm:text-xs " dangerouslySetInnerHTML={{ __html: es?.body_html }} /> : null}
                    </div></div>
                </div>

              </div>

              <div className="mt-4 flex  justify-end ">

                <div className="flex items-center text-gray-600">
                  <img
                    className="rounded-full w-16 h-16 mr-2"
                    src={user?.profile_image_90}
                    alt={user?.name}
                  />

                  <div className="flex flex-col">
                    <span className="font-semibold">{user?.name}</span>
                    <span className="text-sm">{formatedDate}</span>
                  </div>
                </div>


              </div>
              <section>
                {/* Resenas */}
                {false && <Reviews reviews={reviews} slug={slug} />}

              </section>
            </div>

          </article>

        </div>
      </Layout>
      <Footer className='bg-[#F5F6FCCC]' />
    </div>
  );
}


export const getStaticProps = async ({ params, locale }) => {
  console.log('slug 181', params.slug)
  //const partesDeLaRuta = pathname.split('/');
  //const ultimaParte = partesDeLaRuta[partesDeLaRuta.length - 1];
  const devDotToPost = await fetch(
    `${process.env.URLPOST}/api/blog/posts/${params.slug}`
  );

  const res = await devDotToPost.json();
  console.log('188')
  //console.log(res)
  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbar', 'footer'], nextI18NextConfig)),
      devDotToPost: res.postid,
    }
  };
};


export async function getStaticPaths(locale) {
  const devDotToPost = await fetch(
    `${process.env.URLPOST}/api/blog/posts/get`
  );
  const res = await devDotToPost.json();
  console.log('161')
  console.log(res.posts.map(post => {
    return post.slug
  }))
  const aux = [];
  

  locale.locales.map(l => aux.push(l));
  aux.push(false);

    console.log(166)
  
    const slugs = res.posts.map(post => post.slug);

    const paths =  slugs.map(slug => ({ params: { slug:slug }}));
      
     
   return {

    paths,
    fallback: true,
  }
}

export default withTranslation(['navbar', 'footer', 'aboutus', 'landing'])(SLUG);