import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ReactGA, { initialize } from "react-ga";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useTranslation, withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import TopButton from '../../../components/landingComponents/blog/TopButton';
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer/Footer';
import nextI18NextConfig from "../../../next-i18next.config";
import styles from '../../../styles/blog.module.css';
import NAVBAR from '../../../components/Navbar/Navbar';
//section de importaciones para modificar post
import Cloudinary from '../../../components/cloudinary/cloudinary';
import Spinner from "../../../components/Spinner";
import Menu from "../../../components/Menu";
import { formatISO, parseISO } from 'date-fns';

//Este componente muestra el Blog a modificar y se trae el NAV para cambiar los idiomas
//tambien muestra una previsual de como va a quedar antes de ser publicado otra vez

export default function SLUG({ devDotToPost, slug }) {
    const router = useRouter()
    const [post, setPost] = useState('')
    const { locale, locales, push, pathname } = useRouter()
    const { t } = useTranslation('navbar')

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);
    useEffect(() => {
        const partesDeLaRuta = pathname.split('/');
        const ultimaParte = partesDeLaRuta[partesDeLaRuta.length - 1];

        async function blog() {
            console.log('28', router.query)
            console.log('29', router.params)
            console.log('30', router)
            console.log('31', slug)
            const devDotToPosts = await fetch(`/api/blog/posts/${router.query.slug}`);
            const res = await devDotToPosts.json();
            // console.log(res)
            setPost(res.postid)
            setSocial_image(res.postid.social_image)
            setPublished_at(res.postid.createdAt)
            setBody_htmlPT(res.postid.pt.body_html)
            setBody_htmlES(res.postid.es.body_html)
            setBody_htmlEN(res.postid.en.body_html)
            setTagES(res.postid.es.tags)
            setTagEN(res.postid.en.tags)
            setTagPT(res.postid.pt.tags)
            console.log(res.postid.pt)
            setComment_counts(res.postid.comments_count)
            setPublicrectionscounts(res.postid.public_rections_counts)
            setPositive_reactions_count(res.postid.positive_reactions_count)
            setTituloES(res.postid.es.title)
            setTituloEN(res.postid.en.title)
            setTituloPT(res.postid.pt.title)
            setDescriptionES(res.postid.es.description)
            setDescriptionEN(res.postid.en.description)
            setDescriptionPT(res.postid.pt.description)
            setPublish(res.postid.publish)
            setProfile_image(res.postid.user.profile_image)
            setProfile_image_90(res.postid.user.profile_image_90)
            setName(res.postid.user.name)
            setTags_ListEN(res.postid.en.tag_list)
            setTags_ListES(res.postid.es.tag_list)
            setTags_ListPT(res.postid.pt.tag_list)
            setUseraname(res.postid.user.username)

            console.log(res)
        }
        blog()

    }, []);

    //seccion de datos a cargar formulario
    //Habilitacion de secciones para visualizar que vamos a cargar
    const [seccionES, setSeccionES] = useState(false)
    const [seccionEN, setSeccionEN] = useState(false)
    const [seccionPT, setSeccionPT] = useState(false)
    const [ShowPOST, setShowPOST] = useState(true)

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
    const [tituloES, setTituloES] = useState('');
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
    const [published_at, setPublished_at] = useState('')
    const { data: session, status } = useSession();

    useEffect(() => {
        session?.user?._id ? setUser_id(session.user._id) : null
    }, [])

    useEffect(() => {
        if (status && status != "loading" && !session?.user?.role?.includes('admin')) window.location.href = "/inicio/home";
    }, [status])

    //seccion de funciones modificacion de BLOG
    function handleChange(value, cb) { cb(value) }

    function Imageurl(data) {
        setSocial_image(data);
        setCover_image(data);
    }

    function newSLUG(cadena) {
        // Eliminar espacios en blanco y caracteres especiales
        let limpiada = cadena.replace(/\s+/g, '-') // Reemplazar espacios en blanco por guiones
            .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales excepto letras, números y guiones
         
        return limpiada.toLowerCase();
    }


    const date = new Date(published_at);
    const formatedDate = `${date.getDate()}/${parseInt(date.getMonth(), 10) + 1
        }/${date.getFullYear()}`;
    function gotoPanelAdmin() {
        router.push('/inicio/admin')
    }
    async function actualizarContenido() {
        const fechaActual = new Date();
        try {
            await fetch('/api/blog/posts/update/',
                {  //redirect: 'follow',
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({
                        slug: newSLUG(tituloEN),
                        updates: {
                            type_of: type_of,
                            slug: newSLUG(tituloEN),
                            comments_count: comments_count,
                            public_rections_counts: public_rections_counts,
                            positive_reactions_count: positive_reactions_count,
                            cover_image: cover_image,
                            social_image: social_image,
                            published_at: formatISO(fechaActual, { representation: 'complete' }),
                            last_comment_at: formatISO(fechaActual, { representation: 'complete' }),
                            es: {
                                tags: tagsES,
                                tag_list: tags_ListES,
                                title: tituloES,
                                description: descriptionES,
                                body_html: body_htmlES,
                                body_markdown: body_htmlES
                            },
                            en: {
                                tags: tagsEN,
                                tag_list: tags_ListEN,
                                title: tituloEN,
                                description: descriptionEN,
                                body_html: body_htmlEN,
                                body_markdown: body_htmlEN
                            },
                            pt: {
                                tags: tagsPT,
                                tag_list: tags_ListPT,
                                title: tituloPT,
                                description: descriptionPT,
                                body_html: body_htmlPT,
                                body_markdown: body_htmlPT
                            },
                            user: {
                                name: name,
                                username: username,
                                user_id: user_id,
                                profile_image: profile_image,
                                profile_image_90: profile_image_90
                            },
                            publish: publish
                        }
                    })
                }).then(response => { response.json(); console.log('Blog actualizado') })
        }
        catch (error) { console.log('Error al cargar el Blog:', error) }
    }
    //Fin seccion


    return (
        <div id='nav'>
            <Head>
                <meta property="og:type" content={type_of} />
                {locale === 'en' ? <meta property="og:title" content={tituloEN} /> : null}
                {locale === 'es' ? <meta property="og:title" content={tituloES} /> : null}
                {locale === 'pt' ? <meta property="og:title" content={tituloPT} /> : null}
                <meta property="og:description" content={descriptionEN} />
                <meta property="og:image" content={social_image} />
                <meta property="og:url" content={'https://espanolcone.com/blog'} />
            </Head>
            <Layout className='bg-white relative overflow-x-hidden'>

                <div className=""> <section>
                    <Menu />
                </section>
                    {!session?.user ?
                        <div className='pt-24'><div className="flex justify-center w-ful mx-auto p-6 rounded-md "><Spinner /></div></div>
                        :
                        <div className='pt-24'>
                            <button type="button" onClick={() => gotoPanelAdmin()} className='w-[200px] mx-auto flex justify-center bg-white rounded-full p-3 mb-5 shadow-[0px_4px_24px_#0000002F] relative cursor-pointer'>Ir Panel Admin</button>
                            <div className="w-3/4 mx-auto bg-white p-6 rounded-md shadow-md">
                                <h2 className="text-2xl font-semibold mb-4">Cargar Contenido de Blog</h2>
                                <form id="bloghtmlForm">
                                    {/* <!-- Tipo de contenido --> */}
                                    <div className="mb-4">
                                        <label htmlFor="type_of" className="block text-sm font-medium text-gray-600">Tipo de Contenido</label>
                                        <input type="text" id="type_of" name="type_of" className="mt-1 p-2 w-full border rounded-md"
                                            value={type_of}
                                            onChange={() => handleChange(document.getElementById('type_of').value, setType_of)} />
                                    </div>

                                    <div className='p-2'>  <Cloudinary imageurl={Imageurl} /></div>
                                    <div className=''>

                                        {/* <!-- Título en Español --> */}
                                        <div className='pt-0'>
                                            <div className=' border-primary w-1/5 border-solid border-2 rounded-[5px] flex  justify-center mx-1 text-white bg-primary cursor-pointer' onClick={() => setSeccionES(!seccionES)}>SECCION ESPAÑOL</div>
                                            {seccionES && <>   <div className="mb-4">
                                                <label htmlFor="titulo_es" className="block text-sm font-medium text-gray-600">Título</label>
                                                <input type="text" id="titulo_es" name="titulo_es" className="mt-1 p-2 w-full border rounded-md"
                                                    value={tituloES}
                                                    onChange={() => handleChange(document.getElementById('titulo_es').value, setTituloES)} />
                                            </div>
                                                {/* <!-- tags --> */}
                                                <div className="mb-4">
                                                    <label htmlFor="tagsES" className="block text-sm font-medium text-gray-600">Tags separados por comas (,)</label>
                                                    <textarea id="tagsES" name="tagsES" rows="1" className="mt-1 p-2 w-full border rounded-md"
                                                        value={tagsES}
                                                        onChange={() => {
                                                            handleChange(document.getElementById('tagsES').value, setTagES);
                                                            handleChange(document.getElementById('tagsES').value.split(','), setTags_ListES)
                                                        }} > </textarea>
                                                </div>
                                                {/* <!-- Descripción --> */}
                                                <div className="mb-4">
                                                    <label htmlFor="descriptionES" className="block text-sm font-medium text-gray-600">Resumen (1 linea)</label>
                                                    <textarea id="descriptionES" name="descriptionES" rows="1" className="mt-1 p-2 w-full border rounded-md"
                                                        value={descriptionES}
                                                        onChange={() => {
                                                            handleChange(document.getElementById('descriptionES').value, setDescriptionES);
                                                        }} ></textarea>
                                                </div>
                                                {/* <!-- Body html para el detalle --> */}
                                                <div className="mb-4">
                                                    <label htmlFor="body_htmlES" className="block text-sm font-medium text-gray-600">Descripción para el detalle</label>
                                                    <textarea id="body_htmlES" name="body_htmlES" rows="4" className="mt-1 p-2 w-full border rounded-md"
                                                        value={body_htmlES}
                                                        onChange={() => handleChange(document.getElementById('body_htmlES').value, setBody_htmlES)}
                                                    ></textarea>
                                                </div>
                                            </>}</div>

                                        {/* <!-- Título en Inglés --> */}
                                        <div className='pt-2'>
                                            <div className=' border-primary w-1/5 border-solid border-2 rounded-[5px] flex  justify-center mx-1 text-white bg-primary cursor-pointer' onClick={() => setSeccionEN(!seccionEN)}>SECCION INGLES</div>
                                            {seccionEN && <> <div className="mb-4">
                                                <label htmlFor="titulo_en" className="block text-sm font-medium text-gray-600">Title in English</label>
                                                <input type="text" id="titulo_en" name="titulo_en" className="mt-1 p-2 w-full border rounded-md"
                                                    value={tituloEN}
                                                    onChange={() => handleChange(document.getElementById('titulo_en').value, setTituloEN)} />
                                            </div>
                                                <div className="mb-4">
                                                    <label htmlFor="tagsEN" className="block text-sm font-medium text-gray-600">Comma separated tags (,)</label>
                                                    <textarea id="tagsEN" name="tagsEN" rows="1" className="mt-1 p-2 w-full border rounded-md"
                                                        value={tagsEN}
                                                        onChange={() => {
                                                            handleChange(document.getElementById('tagsEN').value, setTagEN);
                                                            handleChange(document.getElementById('tagsEN').value.split(','), setTags_ListEN)
                                                        }} > </textarea>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="descriptionEN" className="block text-sm font-medium text-gray-600">Abstract (1 line)</label>
                                                    <textarea id="descriptionEN" name="descriptionEN" rows="1" className="mt-1 p-2 w-full border rounded-md"
                                                        value={descriptionEN}
                                                        onChange={() => {
                                                            handleChange(document.getElementById('descriptionEN').value, setDescriptionEN);
                                                        }} ></textarea>
                                                </div>
                                                {/* <!-- Body html para el detalle INGLES--> */}
                                                <div className="mb-4">
                                                    <label htmlFor="body_htmlEN" className="block text-sm font-medium text-gray-600">Description detail</label>
                                                    <textarea id="body_htmlEN" name="body_htmlEN" rows="4" className="mt-1 p-2 w-full border rounded-md"
                                                        value={body_htmlEN}
                                                        onChange={() => handleChange(document.getElementById('body_htmlEN').value, setBody_htmlEN)}
                                                    ></textarea>
                                                </div>
                                            </>}</div>
                                        {/* <!-- Título en Portugués --> */}
                                        <div className='pt-2'>
                                            <div className=' border-primary w-1/5 border-solid border-2 rounded-[5px] flex  justify-center mx-1 text-white bg-primary cursor-pointer' onClick={() => setSeccionPT(!seccionPT)}>SECCION PORTUGUES</div>
                                            {seccionPT && <>
                                                <div className="mb-4">
                                                    <label htmlFor="titulo_pt" className="block text-sm font-medium text-gray-600">Título em português</label>
                                                    <input type="text" id="titulo_pt" name="titulo_pt" className="mt-1 p-2 w-full border rounded-md"
                                                        value={tituloPT}
                                                        onChange={() => handleChange(document.getElementById('titulo_pt').value, setTituloPT)} />
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="tagsPT" className="block text-sm font-medium text-gray-600">Tags separadas por vírgula (,)</label>
                                                    <textarea id="tagsPT" name="tagsPT" rows="1" className="mt-1 p-2 w-full border rounded-md"
                                                        value={tagsPT}
                                                        onChange={() => {
                                                            handleChange(document.getElementById('tagsPT').value, setTagPT);
                                                            handleChange(document.getElementById('tagsPT').value.split(','), setTags_ListPT)
                                                        }} > </textarea>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="descriptionPT" className="block text-sm font-medium text-gray-600">Resumo (1 linha)</label>
                                                    <textarea id="descriptionPT" name="descriptionPT" rows="1" className="mt-1 p-2 w-full border rounded-md"
                                                        value={descriptionPT}
                                                        onChange={() => {
                                                            handleChange(document.getElementById('descriptionPT').value, setDescriptionPT);
                                                        }} ></textarea>
                                                </div>
                                                {/* <!-- Body html para el detalle Portugues--> */}
                                                <div className="mb-4">
                                                    <label htmlFor="body_htmlPT" className="block text-sm font-medium text-gray-600">Detalhe da descrição</label>
                                                    <textarea id="body_htmlPT" name="body_htmlPT" rows="4" className="mt-1 p-2 w-full border rounded-md"
                                                        value={body_htmlPT}
                                                        onChange={() => handleChange(document.getElementById('body_htmlPT').value, setBody_htmlPT)}
                                                    ></textarea>
                                                </div>
                                            </>}

                                        </div>
                                    </div>

                                    {/* Publicar Blog  */}
                                    <div className='pt-2'>
                                        <div className="mb-4">
                                            <label htmlFor="publish" className="block text-sm font-medium text-gray-600 ">Publicar Blog {'  '}
                                                <input type="checkbox" id="publish" name="publish" className="border rounded-md"
                                                    value={publish}
                                                    checked={publish}
                                                    onChange={() => handleChange(!publish, setPublish)} />
                                            </label>
                                        </div>
                                        {/* {publish ? 'verdad' : 'falso'} */}
                                    </div>

                                    {/* <!-- Botón de enviar --> */}
                                    <div className="text-center">
                                        <button type="button" onClick={() => actualizarContenido()} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ">Actualizar Contenido</button>

                                    </div>
                                </form>
                            </div>


                        </div>}
                </div>
                {/*seccion modificacion de POST */}


                {/* Section de POST COMO VA QUEDANDO */}
                <div>
                    {ShowPOST && <section className='pt-36'>
                        <NAVBAR className="bg-[transparent]" />
                        <TopButton />
                        <div className="flex justify-center">

                            <article className="text-xs w-full md:w-3/4">
                                {publish ? <div className='bg-success text-white'>PUBLICADO</div> :
                                    <div className='bg-warning text-white'>NO PUBLICADO</div>}
                                <div className=" border-2 text-black bg-white md:rounded-lg overflow-hidden p-4 md:p-8">
                                    <div className='grid grid-cols-1  w-full sm:grid-cols-1 md:grid-cols-1  gap-4'>

                                        {locale === 'en' ? <h1 className="flex items-center justify-center text-gray-600 h-full text-5x5 font-bold mb-8">{tituloEN}</h1> : null}
                                        {locale === 'pt' ? <h1 className="flex items-center justify-center text-gray-600 h-full text-5x5 font-bold mb-8">{tituloPT}</h1> : null}
                                        {locale === 'es' ? <h1 className="flex items-center justify-center text-gray-600 h-full text-5x5 font-bold mb-8">{tituloES}</h1> : null}
                                        <div className='grid grid-cols-2   justify-center gap-4'>
                                            <img className=" border rounded  max-h-15" src={social_image} alt={tituloEN} />
                                            <div className={styles['principal']}>
                                                {locale === 'pt' ? <div className="mt-4 markdown text-lg list-disc" dangerouslySetInnerHTML={{ __html: body_htmlPT }} /> : null}
                                                {locale === 'en' ? <div className="mt-4 markdown text-lg list-disc" dangerouslySetInnerHTML={{ __html: body_htmlEN }} /> : null}
                                                {locale === 'es' ? <div className="mt-4 markdown text-lg list-disc" dangerouslySetInnerHTML={{ __html: body_htmlES }} /> : null}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mt-4 flex  justify-end ">

                                        <div className="flex items-center text-gray-600">
                                            <img
                                                className="rounded-full w-16 h-16 mr-2"
                                                src={profile_image_90}
                                                alt={name}
                                            />

                                            <div className="flex flex-col">
                                                <span className="font-semibold">{name}</span>
                                                <span className="text-sm">{formatedDate}</span>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </article>

                        </div>
                        <Footer className='bg-[#F5F6FCCC]' />
                    </section>
                    }</div>
            </Layout>

        </div>
    );
}


export const getStaticProps = async ({ params, locale, slug }) => {
    console.log(params)
    console.log(slug)
    const devDotToPost = await fetch(
        `https://dev.to/api/articles/${process.env.DEV_USERNAME}/what-is-language-tourism-4g6l`
    );
    const res = await devDotToPost.json();

    return {
        props: {
            ...(await serverSideTranslations(locale, ['navbar', 'footer'], nextI18NextConfig)),
            devDotToPost: res,
        }
    };
};
