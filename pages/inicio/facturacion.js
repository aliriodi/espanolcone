import React, { useEffect, useState } from 'react';
import ReactGA, { initialize } from "react-ga";
import { useTranslation, withTranslation } from 'next-i18next';
import nextI18NextConfig from "../../next-i18next.config";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'
import Layout from '../../components/Layout';
import Image from 'next/image';
import Menu from "../../components/Menu";
import { useRouter } from 'next/router';
import NombreEmail from "../../components/facturacion/Facturacion"
import NombreID from "../../components/facturacion/FacturacionID"

export default function Blog({ devDotToPosts }) {
    const [receipt, setReceipt] = useState([])
    const [ShowReceipt, setShowReceipt] = useState({ show: false, id: 0 })
    const [ammountPaypal, setammountPaypal] = useState(0)
    const [ammountZelle, setammountZelle] = useState(0)

    const { locale, locales, push } = useRouter()
    const router = useRouter();
    //   const { t } = useTranslation(['navbar', 'landing', 'index','register'])
       
    useEffect(() => {
        async function blog() {
            const devDotToPosts = await fetch(`/api/receipt/get`);
            const res = await devDotToPosts.json();
            setReceipt(res.receipt.reverse())
           
        }
        blog()
         }, []);
  
         useEffect(() => {
            let totalAmmountPaypal = 0;
            let totalAmmountZelle = 0;
        
            receipt.forEach(receipt => {
                if (receipt.dates.type === 'PAYPAL') {
                    totalAmmountPaypal += receipt.ammount;
                }
                if (receipt.dates.type === 'ZELLE') {
                    totalAmmountZelle += receipt.ammount;
                }
            });
        
            setammountPaypal(prevAmmount => prevAmmount + totalAmmountPaypal);
            setammountZelle(prevAmmount => prevAmmount + totalAmmountZelle);
        }, [receipt]);

         
         //console.log(receipt)

    function getname(id) {

        if (checkEmail(id)) {
            return <NombreEmail id={id} />
        }
        else { return <NombreID id={id} /> }

    }


    function checkEmail(email) {
        // Expresión regular para validar el formato de un correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function DateT(date) {

        const fecha = new Date(date);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses son base 0 en JavaScript
        const año = fecha.getFullYear().toString().substr(-2); // Obtener solo los últimos dos dígitos del año

        const fechaFormateada = `${dia}/${mes}/${año}`;

        return fechaFormateada; // Output: "09/02/24"


    }
    function Invert() {
        setammountPaypal(0)
        setammountZelle(0)
        setReceipt([...receipt].reverse())
    }

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


                    <div className='pt-20'>
                        <section className='grid grid-cols-3  justify-center flex-col bg-white px-[170px] py-[107px] relative   md:px-[20px]'>

                            <div onClick={() => router.push('/inicio/blog/Blog')} className='w-[200px]  mx-auto flex justify-center bg-white rounded-full p-3 mb-5 shadow-[0px_4px_24px_#0000002F] relative cursor-pointer'>
                                Crear Blog
                            </div>
                            <div onClick={() => router.push('/inicio/blog/BlogModify')} className='w-[200px]  mx-auto flex justify-center bg-white rounded-full p-3 mb-5 shadow-[0px_4px_24px_#0000002F] relative cursor-pointer'>
                                Modificar Blog Existente
                            </div>
                            <div onClick={() => router.push('/inicio/admin')} className='w-[200px]  mx-auto flex justify-center bg-white rounded-full p-3 mb-5 shadow-[0px_4px_24px_#0000002F] relative cursor-pointer'>
                                Panel Admin
                            </div>
                        </section>
                        <section id='Recibos'>

                            <div className="bg-white rounded-[7px] shadow-[0px_4px_24px_#0000000F] text-violet_dark">

                                {/* Encabezado */}
                                <button className='w-[140px] text-white mx-auto  bg-primary rounded-full p-2 mb-5 shadow-[0px_4px_24px_#0000002F] relative cursor-pointer' onClick={() => Invert()}>Invertir orden</button>
                                <p>Cantidad de recibos actuales: {' ' + receipt.length}</p>
                                <>Estos montos no toman en cuenta si estan validados los de Zelle</>
                                <p>Montos Paypal: {ammountPaypal}</p>
                                <p>Montos Zelle: {ammountZelle}</p>
                                <p>Monto Total: {ammountZelle+ammountPaypal}</p>

                                <ul className="bg-[#F3F2F7] w-full flex py-[19px] px-[35px] font-semibold justify-between">

                                    {/* Nombre y apellido */}
                                    <li className="w-[220px]">
                                        ITEM
                                    </li>

                                    {/* Email */}
                                    <li className="w-[220px]">
                                        FECHA
                                    </li>

                                    {/* NPMBRE */}
                                    <li className="w-[120px]">
                                        NOMBRE
                                    </li>

                                    {/* METODO DE PAGO */}
                                    <li>
                                        METODO DE PAGO
                                    </li>

                                    {/* MMONTO USD */}
                                    <li>
                                        MONTO USD$
                                    </li>
                                    {/* Validado */}
                                    <li>
                                        Validado
                                    </li>


                                    {/* Imagen */}
                                    <li>
                                        IMAGEN ZELLE
                                    </li>
                                </ul>

                                {/* Listado de Recibos */}
                                <ul className="relative min-h-[500px]">
                                    {
                                        receipt?.length > 0 ?

                                            // Recibos
                                            receipt?.map((receipt, index) =>
                                                <li key={receipt._id}
                                                    className="border-b-2 last-of-type:border-0">
                                                    <div className="flex py-[19px] px-[35px] justify-between">
                                                        {/* <div className='grid grid-cols-6' key={receipt._id}> */}
                                                        <div>{index + 1}</div>
                                                        <div>{DateT(receipt.createdAt)}</div>
                                                        <div>{getname(receipt.idUser)}</div>
                                                        <div>{receipt?.dates?.type}</div>
                                                        <div>{receipt.ammount}</div>
                                                        <div>{receipt?.dates?.type==='PAYPAL'?'Auto':receipt?.dates?.valid?'SI':'NO'}</div>
                                                        <div>{receipt?.dates?.type == 'ZELLE' ?
                                                            <><button onClick={() => setShowReceipt({ show: !ShowReceipt.show, id: index })}>Mostrar Zelle Imagen</button>
                                                                {ShowReceipt.id == index && ShowReceipt.show && <img src={receipt?.dates?.ImageUrl?.ImageZelle} />}</> : <div>No posee Imagen</div>}</div>

                                                    </div></li>
                                            )
                                            :

                                            // No se Encontraron usuarios
                                            // !isLoading &&
                                            <div className="h-full w-full justify-center items-center flex absolute top-0 left-0 text-light text-[18px]">
                                                No se encontraron recibos
                                            </div>
                                    }
                                </ul>
                            </div>
                        </section>
                    </div>
                </Layout>

            </div ></>
    );
}

export async function getStaticProps({ locale }) {
    //const devDotToPosts = await fetch(`/api/blog/posts/get` );
    //  const devDotToPosts = await fetch( `https://dev.to/api/articles?username=${process.env.DEV_USERNAME}` );
    // const res = await devDotToPosts.json();

    return {
        props: {
            ...(await serverSideTranslations(locale, ['navbar', 'footer', 'landing', 'common', 'menu', 'aboutus', 'index', 'register'], nextI18NextConfig)),
            //    devDotToPosts: res.posts
        },
    }
}
  //export default withTranslation(['navbar', 'footer','aboutus','landing'])(Blog);