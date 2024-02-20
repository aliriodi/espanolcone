import React, { useEffect, useState } from 'react';
import ReactGA, { initialize } from "react-ga";
import { useTranslation, withTranslation } from 'next-i18next';
import nextI18NextConfig from "../../../next-i18next.config";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head'
import Layout from '../../../components/Layout';
import Image from 'next/image';
import Menu from "../../../components/Menu";
import { useRouter } from 'next/router';
import NombreEmail from "../../../components/facturacion/Facturacion"
import NombreID from "../../../components/facturacion/FacturacionID"
import NavBarAdmin from '../../../components/admin/NavBarAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

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

                <Layout className=''>
                    
                    <Menu />


                    <div className='px-[60px] py-[119px]
                    md:px-[25px]'>
                        <NavBarAdmin/>

                        {/* Estadisticas */}
                        <div className='h-[220px] w-full flex justify-between'>

                            <div className=' flex'>

                                {/* Monto Total */}
                                <div className='h-full w-[220px] bg-white rounded-[7px] shadow-[0px_4px_24px_#0000000F] flex justify-center items-center'>

                                    <div className='flex flex-col justify-center items-center'>
                                        {/* Icono */}
                                        <span className='w-[60px] h-[60px] rounded-full bg-secondary_flat flex justify-center items-center'>
                                            <FontAwesomeIcon
                                            className='text-secondary text-[30px]'
                                            icon={faCoins}/>
                                        </span>

                                        {/* Cantidad */}
                                        <p className=' text-[24px] text-violet_dark font-semibold mt-[15px]'>{ammountZelle + ammountPaypal}</p>

                                        {/* Tipo */}
                                        <p className=' text-light text-[14px]'>Monto Total</p>

                                    </div>
                                
                                </div>

                                {/* Montos de medios de Pago */}
                                <div className='flex flex-col justify-between ml-5'>
                                    
                                    {/* Paypal */}
                                    <div className=' bg-white h-[92px] min-w-[267px] shadow-[0px_4px_24px_#0000000F] p-[20px] rounded-[7px] flex justify-between items-center'>

                                        {/* Descripcion */}
                                        <div>

                                            {/* Monto */}
                                            <p className=' text-violet_dark text-[24px] font-semibold'>{ammountPaypal}</p>

                                            {/* Tipo */}
                                            <p className=' text-light text-[14px]'>Monto Paypal</p>

                                        </div>

                                        {/* Icono */}
                                        <div className=' w-[50px] h-[50px] bg-primary_flat_hover flex justify-center items-center rounded-full'>
                                            <span className=' italic font-black text-[25px] text-primary'>P</span>
                                        </div>

                                    </div>
                                    
                                    {/* Zeller */}
                                    <div className=' bg-white h-[92px] min-w-[267px] shadow-[0px_4px_24px_#0000000F] p-[20px] rounded-[7px] flex justify-between items-center'>

                                        {/* Descripcion */}
                                        <div>

                                            {/* Monto */}
                                            <p className=' text-violet_dark text-[24px] font-semibold'>{ammountZelle}</p>

                                            {/* Tipo */}
                                            <p className=' text-light text-[14px]'>Monto Zelle</p>

                                        </div>

                                        {/* Icono */}
                                        <div className=' w-[50px] h-[50px] bg-success_light flex justify-center items-center rounded-full'>
                                            <span className=' font-black text-[25px] text-success'>Z</span>
                                        </div>

                                    </div>

                                </div>

                            </div>


                        </div>


                        
                        {/* Resivos */}
                        <section id='Recibos' className='mt-5'>

                            <p className='text-light my-2'>Cantidad de recibos actuales: {' ' + receipt.length}</p>

                            <div className="bg-white rounded-[7px] shadow-[0px_4px_24px_#0000000F] text-violet_dark">

                                {/* Titulo */}
                                <p className="text-[18px] text-title_color font-medium border-b-2 pb-[25px] pt-[26px] px-[35px]">Administracion de resivos</p>

                                {/* Encabezado */}
                                <button className='w-[140px] text-white   bg-primary rounded-[7px] mx-[35px] p-2 my-3 shadow-[0px_4px_24px_#0000002F] relative cursor-pointer' onClick={() => Invert()}>Invertir orden</button>
                                {/* <>Estos montos no toman en cuenta si estan validados los de Zelle</> */}

                                <ul className="bg-[#F3F2F7] w-full flex py-[19px] px-[35px] font-semibold justify-between">

                                    {/* Nombre y apellido */}
                                    <li className="w-[80px]">
                                        ITEM
                                    </li>

                                    {/* Email */}
                                    <li className="w-[100px]">
                                        FECHA
                                    </li>

                                    {/* NPMBRE */}
                                    <li className="w-[180px]">
                                        NOMBRE
                                    </li>

                                    {/* METODO DE PAGO */}
                                    <li className="w-[158px]">
                                        METODO DE PAGO
                                    </li>

                                    {/* MMONTO USD */}
                                    <li className="w-[120px]">
                                        MONTO USD$
                                    </li>
                                    {/* Validado */}
                                    <li className="w-[120px]">
                                        Validado
                                    </li>


                                    {/* Imagen */}
                                    <li className="w-[180px]">
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
                                                        <p className='w-[80px]'>{index + 1}</p>
                                                        <p className='w-[100px]'>{DateT(receipt.createdAt)}</p>
                                                        <p className="w-[180px]">{getname(receipt.idUser)}</p>
                                                        <p className="w-[158px]">{receipt?.dates?.type}</p>
                                                        <p className="w-[120px]">{receipt.ammount}</p>
                                                        <p className="w-[120px]">{receipt?.dates?.type === 'PAYPAL' ? 'Auto' : receipt?.dates?.valid ? 'SI' : 'NO'}</p>
                                                        <div className="w-[180px]">{receipt?.dates?.type == 'ZELLE' ?
                                                            <><button onClick={() => setShowReceipt({ show: !ShowReceipt.show, id: index })}>Mostrar Zelle Imagen</button>
                                                                {ShowReceipt.id == index && ShowReceipt.show && <img src={receipt?.dates?.ImageUrl?.ImageZelle} />}</> : <div>No posee Imagen</div>}</div>

                                                    </div>
                                                </li>
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