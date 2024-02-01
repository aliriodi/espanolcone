import BlogPostModify from '../../../components/landingComponents/blog/BlosgpostModify';
import TopButton from '../../../components/landingComponents/blog/TopButton';
import React, { useEffect , useState} from 'react';
import ReactGA, { initialize } from "react-ga";
import { useTranslation,withTranslation } from 'next-i18next';
import nextI18NextConfig from "../../../next-i18next.config";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';   
import Head from 'next/head'
import Layout from '../../../components/Layout';
import Footer from "../../../components/Footer/Footer";
import Image from 'next/image';
import Menu from "../../../components/Menu";
import { useRouter } from 'next/router';

 export default function Blog({ devDotToPosts }) {
    const [blogs,setBlogs]=useState([])
    const { locale, locales, push } = useRouter()
    const router = useRouter();
 //   const { t } = useTranslation(['navbar', 'landing', 'index','register'])
    useEffect(() => {
        async function blog(){
        const devDotToPosts = await fetch(`/api/blog/posts/get` );
        const res = await devDotToPosts.json();
        setBlogs(res.posts.reverse())}
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
               
                <section className='flex items-center justify-center flex-col bg-white px-[170px] min-h-screen py-[107px] relative
        md:px-[20px]'>
             <div onClick={()=>router.push('/inicio/blog/')} className='w-[100px]  mx-auto flex justify-center bg-white rounded-full p-3 mb-5 shadow-[0px_4px_24px_#0000002F] relative cursor-pointer'>
                        BLOGS
                    </div>
          
                <h1 className='underlined-title mb-[111px] z-10'> Posts</h1>
                
                <div className="flex flex-wrap sm:flex-col">
                <div className='grid grid-cols-4    w-full sm:grid-cols-1 md:grid-cols-1  gap-4'> 
                
                 {/* className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" */}
                    {blogs.map(
                        (post) => {
                            return (
                            
                                post?.type_of === 'article' && (
                                    <div key={post._id} className="bg-white hover:shadow-[0px_4px_14px_0px_#9156F0] p-4 rounded-lg shadow-md"> 
                                       {/* hover:shadow-[0px_4px_14px_0px_#9156F0] */}
                                       {/* hover:shadow-[0px_4px_14px_0px_#4ED5F2] */}
                                    <BlogPostModify
                                        key={post._id}
                                        id={post._id}
                                        img={post.social_image}
                                        createdAt={post.published_at}
                                        title={post[locale].title}
                                        desc={post[locale].description}
                                        slug={post.slug}
                                        likes={post.positive_reactions_count}
                                        comments={post.comments_count}
                                        tagList={post[locale].tag_list}
                                        locale={locale}
                                        publish={post.publish}
                                    />  </div>
                                )
                              
                            );
                        }
                    )}

                </div></div></section>
                </Layout>
            <Footer className='bg-[#F5F6FCCC]' />
        </div ></>
    );
}

export async function getStaticProps({ locale }) {
   //const devDotToPosts = await fetch(`/api/blog/posts/get` );
  //  const devDotToPosts = await fetch( `https://dev.to/api/articles?username=${process.env.DEV_USERNAME}` );
  // const res = await devDotToPosts.json();
   
   return  {
     props: {
       ...(await serverSideTranslations(locale, ['navbar', 'footer','landing', 'common', 'menu', 'aboutus','index','register'], nextI18NextConfig)),
   //    devDotToPosts: res.posts
     },
   }
}
  //export default withTranslation(['navbar', 'footer','aboutus','landing'])(Blog);