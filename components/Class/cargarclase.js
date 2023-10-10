//import clase from "./nivela2.json"
const clase = require("./nivela3.json");
async function imprimir()
{//console.log(clase)
let nuevaclase=[];
//cargo las nuevas clases las primeras 11 paginas
for(i=1;i<19;i++){
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
                                      level:"Nivel A2",
                                       unit:"Unidad 1",
                                       description:'nivela2 del MVP con ejemplos de ppopppus',
                                       sheets:nuevaclase})
                                       
                                       //mando por el body la nueva clase
             }
              )

}
imprimir();