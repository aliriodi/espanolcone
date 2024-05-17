import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ModalGeneric from "../../../components/GenericsElements/ModalGeneric";

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar"; // esto se saca tmb
import Layout from "../../../components/Layout";
import { useTranslation, withTranslation } from "next-i18next"; // esto lo puedo sacar
import nextI18NextConfig from "../../../next-i18next.config"; // esto lo puedo sacar
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../../../styles/blog.module.css";
import Footer from "../../../components/Footer/Footer"; // esto se saca
import { useSession } from "next-auth/react";
import Menu from "../../../components/Menu";
import Image from "next/image";

export default function Post() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [reviewPoint, setReviewPoint] = useState(0);
  console.log("esto es un review point", reviewPoint);
  const { data: session, status } = useSession(); // necesito la sesion para saber el id y nombre del usuario
  const router = useRouter(); // testear para sacarlo
  const { locale } = router; // testear para sacarlo
  const { slug, source } = router.query;

  const [post, setPost] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState(""); // estado para saber lo que escribe en el input
  const [averageRating, setAverageRating] = useState(0);
  console.log("esto es user", session);

  // useEffect(() => console.log(session));
  console.log("esto son las reviews.user", reviews);
  console.log("///////////////", post);

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
    setLoading(true);
    if (!session) {
      alert("Debes estar logueado para enviar una reseña.");
      return;
    }

    const userId = session.user._id;
    const postId = post._id;

    try {
      const response = await axios.post(
        `/api/blog/posts/addReview`,
        {
          postId: postId,
          userId: userId,
          text: reviewText,
          rating: reviewPoint,
        },
        {
          withCredentials: true,
        }
      );

      console.log("////////////// la respuesta", response);

      if (response.status === 200 || response.status === 201) {
        const newReview = response.data.review;
        console.log("esto es un newReview", newReview);

        // Asegúrate de que los datos del usuario se obtengan correctamente
        const updatedReview = {
          ...newReview,
          user: {
            _id: userId,
            first_name: session.user?.first_name,
            last_name: session.user?.last_name,
            image: { url: session.user.image?.url },
          },
        };

        setReviews((prevReviews) => {
          const index = prevReviews.findIndex(
            (review) => review.user._id === userId
          );
          if (index !== -1) {
            return prevReviews.map((review, idx) =>
              idx === index ? updatedReview : review
            );
          } else {
            return [...prevReviews, updatedReview];
          }
        });

        setReviewText(""); // Limpia el texto de la reseña
        setReviewPoint(0); // Limpia la puntuación de la reseña
        setIsOpen(false); // Cierra el modal
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al añadir la reseña:", error);
    }
  };

  useEffect(() => {
    // Trigger to update the component when reviews are updated
  }, [reviews]);

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
      {source === "blog" ? (
        <Navbar
          light={true}
          className="bg-[transparent]"
          slug={`post?slug=${slug}`}
        />
      ) : (
        <Menu />
      )}

      <Layout className=" overflow-x-hidden relative min-h-screen">
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
                  className="flex justify-center gap-4 relative min-h-screen
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

              {/* Blanco */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                {reviews.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Reseñas
                    </h3>

                    <div className="text-info flex">
                      {[...Array(5)].map((star, i) => (
                        <span
                          key={i}
                          className={`fa fa-star ${
                            i < averageRating ? "text-info" : "text-gray-300"
                          }`}></span>
                      ))}
                    </div>
                    <h4 className="text-lg text-gray-700 mb-4">
                      Promedio de Calificaciones: {averageRating}
                    </h4>
                    {reviews.map((review, index) => (
                      <div
                        key={index}
                        className="border-b last:border-b-0 py-4 flex items-start space-x-4">
                        <Image
                          width={100}
                          height={100}
                          src={review.user?.image?.url}
                          alt={review.user?.first_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />

                        <div className="flex flex-col justify-center">
                          <div className="text-gray-800 font-semibold">
                            {review.user
                              ? `${review.user.first_name} ${review.user.last_name}`
                              : "Usuario Desconocido"}
                          </div>

                          <div className="text-info flex">
                            {[...Array(5)].map((star, i) => (
                              <span
                                key={i}
                                className={`fa fa-star ${
                                  i < review.rating
                                    ? "text-info"
                                    : "text-gray-300"
                                }`}></span>
                            ))}
                          </div>
                          <div className="text-sm text-gray-600">
                            {review.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {status === "authenticated" ? (
                  <>
                    <ModalGeneric
                      open={isOpen}
                      changeModal={() => setIsOpen(false)}>
                      {/* si esta logeado muestra esto*/}
                      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                        <h3 className="text-lg font-semibold">
                          Añadir una reseña
                        </h3>
                        <div className=" text-light text-[15px] flex w-[200px] justify-between mt-[37px] pb-[15px]">
                          {/* Estrella 1 */}
                          <FontAwesomeIcon
                            icon={faStar}
                            onClick={() => setReviewPoint(1)}
                            className={`transition-all duration-75 cursor-pointer ${
                              1 <= reviewPoint && "text-info"
                            }`}
                          />

                          {/* Estrella 2 */}
                          <FontAwesomeIcon
                            icon={faStar}
                            onClick={() => setReviewPoint(2)}
                            className={`transition-all duration-75 cursor-pointer ${
                              2 <= reviewPoint && "text-info"
                            }`}
                          />

                          {/* Estrella 3 */}
                          <FontAwesomeIcon
                            icon={faStar}
                            onClick={() => setReviewPoint(3)}
                            className={`transition-all duration-75 cursor-pointer ${
                              3 <= reviewPoint && "text-info"
                            }`}
                          />

                          {/* Estrella 4 */}
                          <FontAwesomeIcon
                            icon={faStar}
                            onClick={() => setReviewPoint(4)}
                            className={`transition-all duration-75 cursor-pointer ${
                              4 <= reviewPoint && "text-info"
                            }`}
                          />

                          {/* Estrella 5 */}
                          <FontAwesomeIcon
                            icon={faStar}
                            onClick={() => setReviewPoint(5)}
                            className={`transition-all duration-75 cursor-pointer ${
                              5 <= reviewPoint && "text-info"
                            }`}
                          />
                        </div>
                        <textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Escribe tu reseña aquí..."
                          className="mt-4 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                        <button
                          onClick={handleAddReview}
                          className={`btn-primary w-full p-2 font-semibold ${
                            reviewText?.length === 0 &&
                            reviewPoint?.length === 0
                              ? "opacity-[70%] pointer-events-none"
                              : ""
                          }`}
                          disabled={
                            (reviewText?.length === 0 &&
                              reviewPoint?.length === 0) ||
                            loading
                          }>
                          {loading ? (
                            <span className="inline-block h-5 w-5 animate-spin rounded-full border-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
                          ) : reviews.some(
                              (review) => review.user === session?.user?._id
                            ) ? (
                            "Editar reseña"
                          ) : (
                            "Enviar reseña"
                          )}
                        </button>
                      </div>
                    </ModalGeneric>

                    {source === "inicio" && (
                      <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                        {reviews.some(
                          (review) => review.user === session?.user?._id
                        )
                          ? "Editar reseña"
                          : "Enviar reseña"}
                      </button>
                    )}
                  </>
                ) : (
                  <Link href="/es/login">
                    <div className="text-blue-500 hover:text-blue-600 underline pl-4 py-2 inline-block">
                      Loguea para hacer una reseña
                    </div>
                  </Link>
                )}
              </div>
            </article>
          </div>
        )}

        <Footer />
      </Layout>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  // esta funcion se puede sacar
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
