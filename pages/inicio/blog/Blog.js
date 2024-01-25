import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"

export default function Blogcargar() {

    //Habilitacion de secciones para visualizar que vamos a cargar
    const [seccionES, setSeccionES] = useState(false)
    const [seccionEN, setSeccionEN] = useState(false)
    const [seccionPT, setSeccionPT] = useState(false)

    //Variables del formulario que va a mostrar el blog
    // Verdadero si se desea publicar o falso si no se desea publicar
    const [publish, setPublish] = useState(false);
    //Tipo
    const [type_of, setType_of] = useState('article');
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
    const [body_htmlES, setBody_htmlEN] = useState('');
    const [body_htmlEN, setBody_htmlES] = useState('');
    // Tags
    const [tagsES, setTagES] = useState('');
    const [tagsEN, setTagEN] = useState('');
    const [tagsPT, setTagPT] = useState('');
    const [tags_ListES, setTags_ListES] = useState('');
    const [tags_ListEN, setTags_ListEN] = useState('');
    const [tags_ListPT, setTags_ListPT] = useState('');

    function handleChange(value, cb) { cb(value) }


    function newSLUG(cadena) {
        // Eliminar espacios en blanco y caracteres especiales
        let limpiada = cadena.replace(/\s+/g, '-') // Reemplazar espacios en blanco por guiones
            .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales excepto letras, números y guiones
            .toLowerCase(); // Convertir todo a minúsculas
        return limpiada;
    }

    function cargarContenido() {
        newSLUG(tituloEN)


        // Recuperar los valores del htmlFormulario

        // Aquí puedes realizar acciones como enviar los datos a un servidor o agregarlos a la página
        console.log('slug', newSLUG(tituloEN))
        console.log("Tipo de Contenido:", type_of);
        console.log("tags_ListES", tags_ListES);
        console.log("tagsES", tagsES);
        console.log("tags_ListPT", tags_ListPT);
        console.log("tagsPT", tagsPT);
        console.log("DescripciónES:", descriptionES);
        console.log("DescripciónEn:", descriptionEN);
        console.log("DescripciónPT:", descriptionPT);
        console.log("body_htmlES", body_htmlES);
        console.log("body_htmlEN", body_htmlEN);
        console.log("body_htmlPT", body_htmlPT);
        console.log("Título en Español:", tituloES);
        console.log("Título en Inglés:", tituloEN);
        console.log("Título en Portugués:", tituloPT);

        // Puedes agregar lógica adicional aquí según tus necesidades
    }
    return (
        <div>

            <div className="w-3/4 mx-auto bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Cargar Contenido de Blog</h2>
                <htmlForm id="bloghtmlForm">
                    {/* <!-- Tipo de contenido --> */}
                    <div className="mb-4">
                        <label htmlFor="type_of" className="block text-sm font-medium text-gray-600">Tipo de Contenido</label>
                        <input type="text" id="type_of" name="type_of" className="mt-1 p-2 w-full border rounded-md"
                         value={type_of}
                         onChange={() => handleChange(document.getElementById('type_of').value, setType_of)} />
                    </div>

                    <div className=''>

                        {/* <!-- Título en Español --> */}
                        <div className='pt-0'>
                            <div className=' border-primary w-1/5 border-solid border-2 rounded-[5px] flex-grow-[1] mx-1 text-white bg-primary ' onClick={() => setSeccionES(!seccionES)}>SECCION ESPAÑOL</div>
                            {seccionES && <>   <div className="mb-4">
                                <label htmlFor="titulo_es" className="block text-sm font-medium text-gray-600">Título</label>
                                <input type="text" id="titulo_es" name="titulo_es" className="mt-1 p-2 w-full border rounded-md"
                                    value={tituloES}
                                    onChange={() => handleChange(document.getElementById('titulo_es').value, setTituloEs)} />
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
                                    <label htmlFor="descriptionES" className="block text-sm font-medium text-gray-600">Descripción General</label>
                                    <textarea id="descriptionES" name="descriptionES" rows="4" className="mt-1 p-2 w-full border rounded-md"></textarea>
                                </div>
                                {/* <!-- Body html para el detalle --> */}
                                <div className="mb-4">
                                    <label htmlFor="body_htmlES" className="block text-sm font-medium text-gray-600">Descripción para el detalle</label>
                                    <textarea id="body_htmlES" name="body_htmlES" rows="4" className="mt-1 p-2 w-full border rounded-md"></textarea>
                                </div>
                            </>}</div>

                        {/* <!-- Título en Inglés --> */}
                        <div className='pt-2'>
                            <div className=' border-primary w-1/5 border-solid border-2 rounded-[5px] flex-grow-[1] mx-1 text-white bg-primary ' onClick={() => setSeccionEN(!seccionEN)}>SECCION INGLES</div>
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
                                    <label htmlFor="descriptionEN" className="block text-sm font-medium text-gray-600">Description</label>
                                    <textarea id="descriptionEN" name="descriptionEN" rows="4" className="mt-1 p-2 w-full border rounded-md"></textarea>
                                </div>
                                {/* <!-- Body html para el detalle INGLES--> */}
                                <div className="mb-4">
                                    <label htmlFor="body_htmlEN" className="block text-sm font-medium text-gray-600">Description detail</label>
                                    <textarea id="body_htmlEN" name="body_htmlEN" rows="4" className="mt-1 p-2 w-full border rounded-md"></textarea>
                                </div>
                            </>}</div>
                        {/* <!-- Título en Portugués --> */}
                        <div className='pt-2'>
                            <div className=' border-primary w-1/5 border-solid border-2 rounded-[5px] flex-grow-[1] mx-1 text-white bg-primary ' onClick={() => setSeccionPT(!seccionPT)}>SECCION PORTUGUES</div>
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
                                    <label htmlFor="descriptionPT" className="block text-sm font-medium text-gray-600">Descrição</label>
                                    <textarea id="descriptionPT" name="descriptionPT" rows="4" className="mt-1 p-2 w-full border rounded-md"></textarea>
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
                                    onChange={() => handleChange(!publish, setPublish)} />
                            </label>
                        </div></div>

                    {/* <!-- Botón de enviar --> */}
                    <div className="text-center">
                        <button type="button" onClick={() => cargarContenido()} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Cargar Contenido</button>
                    </div>
                </htmlForm>
            </div>


        </div>
    )
}
