import Head from 'next/head';
import Link from 'next/link';
import { useState ,useEffect } from "react";
import { useSession } from "next-auth/react";
import ReactGA, { initialize } from "react-ga";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useTranslation,withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import TopButton from '../../../components/landingComponents/blog/TopButton';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer/Footer';
import nextI18NextConfig from "../../../next-i18next.config";
import styles from '../../../styles/blog.module.css';
import NAVBAR from '../../../components/Navbar/Navbar';


//Este componente muestra el Blog a modificar y se trae el NAV para cambiar los idiomas
//tambien muestra una previsual de como va a quedar antes de ser publicado otra vez

export default  function SLUG({ devDotToPost ,slug}) {
    const router = useRouter()
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
        console.log('28',router.query)
        console.log('29',router.params)
        console.log('30',router)
        console.log('31',slug)
    const devDotToPosts = await fetch(`/api/blog/posts/${router.query.slug}` );
    const res = await devDotToPosts.json();
   // console.log(res)
    setPost(res.postid)
    }
    blog()
}, []);

//seccion de datos a cargar formulario
    //Habilitacion de secciones para visualizar que vamos a cargar
    const [seccionES, setSeccionES] = useState(false)
    const [seccionEN, setSeccionEN] = useState(false)
    const [seccionPT, setSeccionPT] = useState(false)

    //Variables del formulario que va a mostrar el blog
    // Verdadero si se desea publicar o falso si no se desea publicar
    const [publish, setPublish] = useState(false);
    //Tipo
    const [type_of, setType_of] = useState('article');
    //Commentarios contados
    const [comments_count, setComment_counts] = useState(0);
    const [public_rections_counts, setPublicrectionscounts] = useState(0);
    const [positive_reactions_count, setPositive_reactions_count] = useState(0);
    //Imagenes del anuncio
    const [cover_image, setCover_image] = useState('');
    const [social_image, setSocial_image] = useState('');
    //Titulo
    const [tituloES, setTituloEs] = useState('');
    const [tituloEN, setTituloEN] = useState('');
    const [tituloPT, setTituloPT] = useState('');
    //Resumen de la primera pagina
    const [descriptionES, setDescriptionES] = useState('');
    const [descriptionEN, setDescriptionEN] = useState('');
    const [descriptionPT, setDescriptionPT] = useState('');
    //Descripcion
    const [body_htmlPT, setBody_htmlPT] = useState('');
    const [body_htmlES, setBody_htmlES] = useState('');
    const [body_htmlEN, setBody_htmlEN] = useState('');
    // Tags
    const [tagsES, setTagES] = useState('');
    const [tagsEN, setTagEN] = useState('');
    const [tagsPT, setTagPT] = useState('');
    const [tags_ListES, setTags_ListES] = useState('');
    const [tags_ListEN, setTags_ListEN] = useState('');
    const [tags_ListPT, setTags_ListPT] = useState('');
    //Usuario que hace el post
    const [name, setName] = useState('Español con E');
    const [username, setUseraname] = useState('');
    const [user_id, setUser_id] = useState('');
    const [profile_image, setProfile_image] = useState('https://res.cloudinary.com/dfddh08q8/image/upload/s--LSRn8RfV--/c_thumb,w_200,g_face/v1/images/rc6firxrtnaj16l0i1kt.png');
    const [profile_image_90, setProfile_image_90] = useState('https://res.cloudinary.com/dfddh08q8/image/upload/s--LSRn8RfV--/c_thumb,w_200,g_face/v1/images/rc6firxrtnaj16l0i1kt.png');

    const { data: session, status } = useSession();

    useEffect(() => {
        session?.user?._id ? setUser_id(session.user._id) : null
    }, [])

    useEffect(() => {
        if (status && status != "loading" && !session?.user?.role?.includes('admin')) window.location.href = "/inicio/home";
    }, [status])

    function handleChange(value, cb) { cb(value) }

    function Imageurl(data) {
        setSocial_image(data);
        setCover_image(data);
    }

    function newSLUG(cadena) {
        // Eliminar espacios en blanco y caracteres especiales
        let limpiada = cadena.replace(/\s+/g, '-') // Reemplazar espacios en blanco por guiones
            .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales excepto letras, números y guiones
            .toLowerCase(); // Convertir todo a minúsculas
        return limpiada;
    }















  const {
    title,
    published_at,
   // social_image,
    body_html,
    es,
    en,
    pt,
    user,
   // type_of,
    description,
    canonical_url,
    pusblis
  } = post;
  
 const date = new Date(published_at);
 const formatedDate = `${date.getDate()}/${parseInt(date.getMonth(), 10) + 1
   }/${date.getFullYear()}`;



  return (
    <div id='nav'>
      <Head>
        <meta property="og:type" content={type_of} />
        {locale==='en'?<meta property="og:title" content={en?.title} />:null}
        {locale==='es'?<meta property="og:title" content={es?.title} />:null}
        {locale==='pt'?<meta property="og:title" content={es?.title} />:null}
        <meta property="og:description" content={description} />
        <meta property="og:image" content={social_image} />
        <meta property="og:url" content={canonical_url} />
      </Head>
      <Layout className='bg-white relative overflow-x-hidden'>
        <>TESTE</>
      <NAVBAR className="bg-[transparent]" />
      <TopButton />
      <div className="flex justify-center">
       
      <article className="text-xs w-full md:w-3/4">
      {post.publish?<div className='bg-success text-white'>PUBLICADO</div>:
              <div className='bg-warning text-white'>NO PUBLICADO</div>    }
      <div className=" border-2 text-black bg-white md:rounded-lg overflow-hidden p-4 md:p-8">
              <div className='grid grid-cols-1  w-full sm:grid-cols-1 md:grid-cols-1  gap-4'>
              
      {locale==='en'?<h1 className="flex items-center justify-center text-gray-600 h-full text-5x5 font-bold mb-8">{en?.title}</h1>:null}
      {locale==='pt'?<h1 className="flex items-center justify-center text-gray-600 h-full text-5x5 font-bold mb-8">{pt?.title}</h1>:null}
      {locale==='es'?<h1 className="flex items-center justify-center text-gray-600 h-full text-5x5 font-bold mb-8">{es?.title}</h1>:null}
      <div className='grid grid-cols-2   justify-center gap-4'>
      <img className=" border rounded  max-h-15"   src={social_image} alt={title} />
      <div className={styles['principal']}>
      {locale==='pt'?<div className="mt-4 markdown text-lg list-disc" dangerouslySetInnerHTML={{ __html: pt?.body_html }} />:null}
      {locale==='en'?<div className="mt-4 markdown text-lg list-disc" dangerouslySetInnerHTML={{ __html: en?.body_html }} />:null}
      {locale==='es'?<div className="mt-4 markdown text-lg list-disc" dangerouslySetInnerHTML={{ __html: es?.body_html }} />:null}
      </div>
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
  </div>
</article>

      </div>
      </Layout>
      <Footer className='bg-[#F5F6FCCC]' />
    </div>
  );
}


export const getStaticProps = async ({ params , locale,slug }) => {
console.log(params)
console.log(slug)
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
  