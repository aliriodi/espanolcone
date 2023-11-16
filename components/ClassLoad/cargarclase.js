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
introducirVariable('Por favor introduce el nombre del json, example: U1NA1.json: ',  (namefile) => {
  // Hacer algo con la primera variable
  console.log('', );
  
  // Introducir la segunda variable
  introducirVariable('Introduce el nombre del nivel, example: Nivel A1 :  ', (level) => {
    // Hacer algo con la segunda variable
    console.log('', );
 
    // Introducir la tercera variable
  introducirVariable('Introduce el nombre de la unidad, example: Unidad 1 :  ', (unit) => {
    // Hacer algo con la tercera variable
    console.log('', );
    // Introducir la cuarta variable
    introducirVariable('Introduce una descripcion Recuerda que debe ser unica: ',async  (description) => {
      // Hacer algo con la tercera variable
      console.log('Procedo a cargar');
      await imprimir( namefile,level,unit,description)
      // Cerrar la interfaz de lectura
      rl.close();
    });
    
  });
   
  });
});



async function imprimir(namefile,level,unit,description)
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
 await fetch('http://localhost:3000/api/class/add/', 
             {  //redirect: 'follow',
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                 headers: {
                            'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
                          },
                 body: JSON.stringify({
                                       level:level,
                                       unit:unit,
                                       description:description,
                                       sheets:nuevaclase})
                                       
                                       //mando por el body la nueva clase
             })}
