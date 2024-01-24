import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"

export default function Blogcargar() {


    function cargarContenido() {
        // Recuperar los valores del formulario
        const type_of = document.getElementById('type_of').value;
        const description = document.getElementById('description').value;
        const titulo_es = document.getElementById('titulo_es').value;
        const titulo_en = document.getElementById('titulo_en').value;
        const titulo_pt = document.getElementById('titulo_pt').value;
  
        // Aquí puedes realizar acciones como enviar los datos a un servidor o agregarlos a la página
        console.log("Tipo de Contenido:", type_of);
        console.log("Descripción:", description);
        console.log("Título en Español:", titulo_es);
        console.log("Título en Inglés:", titulo_en);
        console.log("Título en Portugués:", titulo_pt);
  
        // Puedes agregar lógica adicional aquí según tus necesidades
      }
  return (
    <div>

<div class="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Cargar Contenido de Blog</h2>
    <form id="blogForm">
      {/* <!-- Tipo de contenido --> */}
      <div class="mb-4">
        <label for="type_of" class="block text-sm font-medium text-gray-600">Tipo de Contenido</label>
        <input type="text" id="type_of" name="type_of" class="mt-1 p-2 w-full border rounded-md">entrada</input>
      </div>

      {/* <!-- Descripción --> */}
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-600">Descripción</label>
        <textarea id="description" name="description" rows="4" class="mt-1 p-2 w-full border rounded-md"></textarea>
      </div>

      {/* <!-- Título en Español --> */}
      <div class="mb-4">
        <label for="titulo_es" class="block text-sm font-medium text-gray-600">Título en Español</label>
        <input type="text" id="titulo_es" name="titulo_es" class="mt-1 p-2 w-full border rounded-md"></input>
      </div>

      {/* <!-- Título en Inglés --> */}
      <div class="mb-4">
        <label for="titulo_en" class="block text-sm font-medium text-gray-600">Título en Inglés</label>
        <input type="text" id="titulo_en" name="titulo_en" class="mt-1 p-2 w-full border rounded-md"></input>
      </div>

      {/* <!-- Título en Portugués --> */}
      <div class="mb-4">
        <label for="titulo_pt" class="block text-sm font-medium text-gray-600">Título en Portugués</label>
        <input type="text" id="titulo_pt" name="titulo_pt" class="mt-1 p-2 w-full border rounded-md"></input>
      </div>

      {/* <!-- Botón de enviar --> */}
      <div class="text-center">
        <button type="button" onClick={()=>cargarContenido()} class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Cargar Contenido</button>
      </div>
    </form>
  </div>


    </div>
  )
}
