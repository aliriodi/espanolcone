import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Layout from "../../../components/Layout";
import { useTranslation, withTranslation } from "next-i18next";
import nextI18NextConfig from "../../../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../../../styles/blog.module.css";
import Footer from "../../../components/Footer/Footer";
import { useSession } from "next-auth/react";

export default function Post() {
  const { data: session, status } = useSession(); // necesito la sesion para saber el id y nombre del usuario
  const router = useRouter();
  const { locale } = router;
  const { slug } = router.query;

  const [post, setPost] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState(""); // estado para saber lo que escribe en el input
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => console.log(session));
  console.log("esto son las reviews", reviews);

  useEffect(() => {
    if (post) {
      setReviews(post.reviews || []);
    }
  }, [post]);

  useEffect(() => {
    if (slug) getPost();
  }, [slug]);

  useEffect(() => {
    // Español
    if (post && locale == "es") setCurrentPost(post?.es);

    // Ingles
    if (post && locale == "en") setCurrentPost(post?.en);

    // Portugues
    if (post && locale == "pt") setCurrentPost(post?.pt);
  }, [locale, post]);

  useEffect(() => {
    if (reviews.length > 0) {
      const total = reviews.reduce((acc, review) => acc + review.rating, 0);
      const average = total / reviews.length;
      setAverageRating(average.toFixed(1)); // Redondea a un decimal
    } else {
      setAverageRating(0); // Si no hay reseñas, el promedio es 0
    }
  }, [reviews]);

  async function getPost() {
    // Metodo encargado de obtener el post actual
    const devDotToPosts = await fetch(`/api/blog/posts/${slug}`);
    const res = await devDotToPosts.json();

    console.log(res?.postid);
    setPost(res?.postid);
  }

  function getDate() {
    const date = new Date(post?.published_at);
    const formatedDate = `${date.getDate()}/${
      parseInt(date.getMonth(), 10) + 1
    }/${date.getFullYear()}`;

    return formatedDate;
  }

  const handleAddReview = async () => {
    if (!session) {
      alert("Debes estar logueado para enviar una reseña."); // proteccion para el front para que no puedan usar otro usuario
      return;
    }

    const userId = session.user._id;
    const userName = session.user.first_name + " " + session.user.last_name;

    try {
      const response = await axios.post(`/api/blog/posts/addReview`, {
        // hago la llamada a la api addReview.js
        postId: post._id,
        userId: userId,
        userName: userName,
        text: reviewText,
        rating: 3.5,
      });

      if (response.status === 201) {
        setReviews((prevReviews) => [...prevReviews, response.data.review]); // seteo el estado con las reviews que estaban y agrego la nueva
        setReviewText(""); // limpio el estado y el imput
      }
    } catch (error) {
      console.error("Error al añadir la reseña:", error);
    }
  };

  return (
    <div id="nav">
      <Head>
        <meta
          property="og:type"
          content={post?.type_of}
        />
        <meta
          property="og:title"
          content={currentPost?.title}
        />
        <meta
          property="og:title"
          content={currentPost?.description}
        />
        <meta
          property="og:image"
          content={post?.social_image}
        />
        <meta
          name="description"
          content={currentPost?.description}
        />
        <title>{currentPost?.title}</title>
      </Head>
      <Layout className=" overflow-x-hidden relative min-h-screen">
        <Navbar
          light={true}
          className="bg-[transparent]"
          slug={`post?slug=${slug}`}
        />

        {currentPost != null && (
          <div
            className="flex justify-center my-[187px]
                    md:my-[100px]">
            <article
              className=" text-xs px-[8%] mx-auto
                        md:px-0">
              {/* Contenido Principal */}
              <div
                className="grid grid-cols-1  w-full gap-4 
                            sm:grid-cols-1 md:grid-cols-1">
                {/* Titulo */}
                <h1
                  className="underlined-subtitle mb-[100px]
                                md:mb-[70px]">
                  {currentPost?.title}
                </h1>

                {/* Contenido */}
                <div
                  className="flex justify-center gap-4 relative
                                md:flex-col-reverse">
                  {/* Parrafo */}
                  <div
                    className="mt-4 text-lg text-violet_dark font-medium w-[55%] md:w-full
                                    md:px-[25px] md:text-[14px]"
                    dangerouslySetInnerHTML={{ __html: currentPost?.body_html }}
                  />

                  {/* Imagen */}
                  <img
                    className="rounded-[15px] h-fit shadow-[0px_4px_24px_#18292F1A] w-[45%] object-cover
                                    md:w-full md:rounded-none md:h-[400px] md:shadow-none"
                    src={post?.social_image}
                    alt={currentPost?.title}
                  />

                  {/* Gradiente en imagen del responsive */}
                  <span
                    className="hidden h-[400px] w-full top-0 left-0 absolute bg-gradient-to-t from-gray_light to-transparent
                                    md:flex"
                  />
                </div>
              </div>

              {/* Datos finales */}
              <div className="flex  justify-end  ">
                <div className="flex items-center  text-gray-600">
                  <div className="flex flex-col gap-x-2">
                    <span className="font-semibold">{post?.user.name}</span>
                    <span className="text-lg">{getDate()}</span>
                  </div>

                  <img
                    className="rounded-full w-18 h-18 mr-2"
                    src={post?.user.profile_image_90}
                    alt={post?.user.name}
                  />
                </div>
              </div>
              {reviews.length > 0 && ( // si  no hay ninguna review este div no se muestra
                <div>
                  <h3>Reseñas</h3>
                  <h4>Promedio de Calificaciones: {averageRating}</h4>
                  {reviews.map((review, index) => (
                    <div key={index}>
                      <p>
                        {review.username}: {review.text} - Calificación:{" "}
                        {review.rating}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {status === "authenticated" ? ( // si esta logeado muestra esto
                <div>
                  <h3>Añadir una reseña</h3>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Escribe tu reseña aquí..."
                  />
                  <button onClick={handleAddReview}>Enviar reseña</button>
                </div>
              ) : (
                <div>loguea para hacer una reseña</div> // sino esto
              )}
            </article>
          </div>
        )}

        <Footer />
      </Layout>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["navbar", "footer"],
        nextI18NextConfig
      )),
    },
  };
}
