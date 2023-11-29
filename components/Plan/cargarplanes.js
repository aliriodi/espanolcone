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

// Introducir la primera variable
introducirVariable('Por favor introduce el nombre del json, example: planes.json: ',  async (namefile) => {
  // Hacer algo con la primera variable
  console.log('', );
  
      console.log('Procedo a cargar');
      await imprimir( namefile)
      // Cerrar la interfaz de lectura
      rl.close();
    });
    
  


async function imprimir(namefile)
{const planes = require("./"+namefile);

  //console.log(clase)
let nuevaclase=[];
const numberPlans = Object.keys(planes).length;
console.log(numberPlans)
console.log(Object.keys(planes))
//cargo las nuevas clases las primeras 11 paginas
for(i=1;i<numberPlans+1;i++){
//mapeo el objeto de clases por numero de paginas 
//es un OBJETO


await fetch('http://localhost:3000/api/plan/add/', 
{  //redirect: 'follow',
   method: 'POST', // *GET, POST, PUT, DELETE, etc.
   mode: 'cors', // no-cors, *cors, same-origin
   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
   credentials: 'same-origin', // include, *same-origin, omit
    headers: {
               'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
             },
    body: JSON.stringify( planes['plan'+i] )
                          
                          //mando por el body la nueva clase
})}


}

