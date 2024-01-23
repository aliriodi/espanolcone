import Head from 'next/head';
import Link from 'next/link';
import { useState ,useEffect } from "react";
import ReactGA, { initialize } from "react-ga";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useTranslation,withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import TopButton from '../../../components/landingComponents/blog/TopButton';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer/Footer';
import nextI18NextConfig from "../../../next-i18next.config";
import NAVBAR from "../../../components/Navbar/Navbar"


export default  function SLUG({ devDotToPost }) {
  const [post,setPost]=useState('')
  const { locale, locales, push,pathname } = useRouter()
  const { t } = useTranslation('navbar')

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
}, []);
useEffect(() => {
  const partesDeLaRuta = pathname.split('/');
  const ultimaParte = partesDeLaRuta[partesDeLaRuta.length - 1];
    async function blog(){
    const devDotToPosts = await fetch(`/api/blog/posts/${ultimaParte}` );
    const res = await devDotToPosts.json();
    console.log(res)
    setPost(res.postid)
    }
    blog()
}, []);

  const {
    title,
    published_at,
    social_image,
    body_html,
    es,
    en,
    pt,
    user,
    type_of,
    description,
    canonical_url
  } = post;
  
 const date = new Date(published_at);
 const formatedDate = `${date.getDate()}/${parseInt(date.getMonth(), 10) + 1
   }/${date.getFullYear()}`;



  return (
    <div id='nav'>
      <Head>
        <meta property="og:type" content={type_of} />
        {locale==='en'?<meta property="og:title" content={en.title} />:null}
        {locale==='es'?<meta property="og:title" content={es.title} />:null}
        {locale==='pt'?<meta property="og:title" content={pt.title} />:null}
        <meta property="og:description" content={description} />
        <meta property="og:image" content={social_image} />
        <meta property="og:url" content={canonical_url} />
      </Head>
      <Layout className='bg-white relative overflow-x-hidden'>
      <NAVBAR className="bg-[transparent]" />
      <TopButton />
      <div className="flex justify-center">
       
      <article className="text-xs w-full md:w-3/4">
  <div className="border-2 text-black bg-white md:rounded-lg overflow-hidden p-4 md:p-8">
    <div className='grid grid-cols-2  w-full sm:grid-cols-1 md:grid-cols-1  gap-4'>
      <img className=" max-h-15"   src={social_image} alt={en.title} />

      {locale==='en'?<h1 className="text-2xl font-bold mb-2">{en.title}</h1>:null}
      {locale==='pt'?<h1 className="text-2xl font-bold mb-2">{pt.title}</h1>:null}
      {locale==='es'?<h1 className="text-2xl font-bold mb-2">{es.title}</h1>:null}
    </div>
    
    <div className="mt-4">
      
      <div className="flex items-center text-gray-600">
        <img
          className="rounded-full w-8 h-8 mr-2"
          src={user?.profile_image_90}
          alt={user?.name}
        />
       
        <div className="flex flex-col">
          <span className="font-semibold">{user?.name}</span>
          <span className="text-sm">{formatedDate}</span>
        </div>
      </div>
      {locale==='pt'?<div className="mt-4 markdown" dangerouslySetInnerHTML={{ __html: pt?.body_html }} />:null}
      {locale==='en'?<div className="mt-4 markdown" dangerouslySetInnerHTML={{ __html: en?.body_html }} />:null}
      {locale==='es'?<div className="mt-4 markdown" dangerouslySetInnerHTML={{ __html: es?.body_html }} />:null}
      {/* <div className="mt-4 markdown" dangerouslySetInnerHTML={{ __html: body_html }} /> */}
    </div>
  </div>
</article>

        {/* <article className="text-xs w-full md:w-3/4 ">
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
           */}
          {/* <Link href="/blog" passHref legacyBehavior>
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
          </Link> */}

        {/* </article> */}
      </div>
      </Layout>
      <Footer className='bg-[#F5F6FCCC]' />
    </div>
  );
}


export const getStaticProps = async ({ params , locale }) => {

  const devDotToPost = await fetch(
    `https://dev.to/api/articles/${process.env.DEV_USERNAME}/what-is-language-tourism-4g6l`
  );
  const res = await devDotToPost.json();

  return {
    props: {
    ...(await serverSideTranslations(locale, ['navbar','footer'], nextI18NextConfig)),
      devDotToPost: res,
          }
  };
};
  
// export async function getStaticPaths() {
//   const devDotToPosts = await fetch(
//     `https://dev.to/api/articles?username=${process.env.DEV_USERNAME}`
//   );
//   const posts = await devDotToPosts.json();

//   return {
//     paths: posts.map((post, index) => {
//       return {
//         params: {
//           slug: post.slug,
          
//         }
//       };
//     }),
//     fallback: false
//   };
// }

//export default withTranslation(['navbar', 'footer','aboutus','landing'])(SLUG);