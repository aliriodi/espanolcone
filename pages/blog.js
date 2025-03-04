import BlogPost from "../components/landingComponents/blog/Blosgpost";
import TopButton from "../components/landingComponents/blog/TopButton";
import stylesblog from "../styles/blog.module.css";
import React, { useEffect, useState } from "react";
import ReactGA, { initialize } from "react-ga";
import { useTranslation, withTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NAVBAR from "../components/Navbar/Navbar";
import Head from "next/head";
import Layout from "../components/Layout";
import Footer from "../components/Footer/Footer";
import Image from "next/image";

import { useRouter } from "next/router";

function Blog({ devDotToPosts }) {
  const [blogs, setBlogs] = useState([]);
  const { locale, locales, push } = useRouter();
  const { t } = useTranslation(["navbar", "landing", "index", "register"]);
  useEffect(() => {
    async function blog() {
      const devDotToPosts = await fetch(`/api/blog/posts/get`);
      const res = await devDotToPosts.json();

      const postsWithRatings = res.posts.map((post) => {
        if (post.reviews?.length > 0) {
          const total = post.reviews.reduce(
            (acc, review) => acc + review.rating,
            0
          );
          const average = total / post.reviews.length;
          post.averageRating = average.toFixed(1); // Redondea a un decimal
        } else {
          post.averageRating = 0; // Si no hay reseñas, el promedio es 0
        }
        return post;
      });

      // setBlogs(res.posts.reverse());
      setBlogs(postsWithRatings.reverse());
    }
    blog();
  }, []);
  console.log("////////////////////", "blogs");

  return (
    <div id="nav">
      <Head>
        <title>Español con E | Bienvenidos</title>
        <meta
          name="landing"
          content="welcome"
        />
      </Head>
      <Layout className=" relative overflow-x-hidden">
        <NAVBAR className="bg-[transparent]" />
        <TopButton />
        <section
          className="flex items-center justify-center flex-col px-[130px] min-h-screen py-[107px] relative
                md:px-[20px]">
          <h1 className="underlined-title mb-[111px] z-10"> Posts</h1>

          <div className="flex flex-wrap sm:flex-col">
            <div
              className="grid grid-cols-3 w-full gap-4
                        lg:grid-cols-2 md:grid-cols-1">
              {blogs.map((post) => {
                return (
                  post.type_of === "article" &&
                  post.publish && (
                    <div
                      key={post._id}
                      className="p-1 relative">
                      <BlogPost
                        key={post._id}
                        id={post._id}
                        img={post.social_image}
                        createdAt={post.published_at}
                        title={post[locale].title}
                        desc={post[locale].description}
                        slug={post.slug}
                        likes={post.averageRating}
                        comments={post.reviews.length}
                        tagList={post[locale].tag_list}
                        locale={locale}
                        source="blog"
                      />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </section>
      </Layout>
      <Footer className="bg-[#F5F6FCCC]" />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  // const devDotToPosts = await fetch(`/api/blog/posts/get` );
  //const devDotToPosts = await fetch( `https://dev.to/api/articles?username=${process.env.DEV_USERNAME}` );
  //  const res = await devDotToPosts.json();

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        [
          "navbar",
          "footer",
          "landing",
          "common",
          "menu",
          "aboutus",
          "index",
          "register",
        ],
        nextI18NextConfig
      )),
      //     devDotToPosts: res.posts
    },
  };
}
export default withTranslation(["navbar", "footer", "aboutus", "landing"])(
  Blog
);
