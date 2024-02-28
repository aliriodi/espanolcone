//import clase from "./nivela2.json"
//const clase = require("./U1NA1.json");

const readline = require('readline');

// Configurar la interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Función para introducir una variable
 function introducirVariable(pregunta, callback) {
  rl.question(pregunta, (respuesta) => {
    callback(respuesta);
  });
}
console.log('Este algoritmo es solo para modificar las hojas cargadas por un archivo')
console.log('los otros aspectos como topicos, tags, tipo, unidad no es por este codigo')
// Introducir la primera variable
introducirVariable('Por favor introduce el nombre del json, example: U1NA1.json: ',  (namefile) => {
  // Introducir la segunda variable
  
  console.log('Introduce el _id de la clase a modificar')
  introducirVariable(' example: 65561111c0af4de4ff78f6cc :  ', async (id) => {

      console.log('Procedo a modificar');
      await imprimir(  namefile='U1NA1.json',id='65ddd575cbb578d235a9cd8b')
      // Cerrar la interfaz de lectura
      rl.close();
    });

  });

async function imprimir(namefile,id)
{const clase = require("./"+namefile);
  //console.log(clase)
let nuevaclase=[];
const numberOfPages = Object.keys(clase).length;
console.log(numberOfPages)
console.log(Object.keys(clase))
//cargo las nuevas clases las primeras 11 paginas
for(i=1;i<numberOfPages+1;i++){
//mapeo el objeto de clases por numero de paginas 
//es un OBJETO
    nuevaclase.push(clase['page'+i])

}

console.log(nuevaclase.length)
 await fetch('http://localhost:3000/api/ulessons/update/', 
             {  //redirect: 'follow',
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                 headers: {
                            'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
                          },
                 body: JSON.stringify({_id:id,
                                      // level:"Nivel A1",
                                      //  unit:"Unidad 6",
                                      //  description:'nivela2 del MVP con ejemplos de ppopppus2 1 2 3 4 5 6 alirio',
                                       sheets:nuevaclase})

                                       //mando por el body la nueva clase
             }
              )

}