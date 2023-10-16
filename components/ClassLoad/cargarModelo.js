const caracteristica = require("./featuresclass.json");

async function imprimir()
{//console.log(clase)
  caracteristica.section.map( async section =>
    {console.log(section); 
await fetch('http://localhost:3000/api/featureclass/add/', 
{  //redirect: 'follow',
   method: 'POST', // *GET, POST, PUT, DELETE, etc.
   mode: 'cors', // no-cors, *cors, same-origin
   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
   credentials: 'same-origin', // include, *same-origin, omit
    headers: {
               'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
             },
    body: JSON.stringify({section})
                          
                          //mando por el body la nueva clase
} )}
)


caracteristica.className.map( async classnamec =>
  {console.log(classnamec); 
  await fetch('http://localhost:3000/api/featureclass/add/', 
  {  //redirect: 'follow',
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     credentials: 'same-origin', // include, *same-origin, omit
      headers: {
                 'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
               },
      body: JSON.stringify({classnamec})
                            
                            //mando por el body la nueva clase
  } )}
  )

 
  caracteristica.template.map( async template=>
    {console.log(template);  
    await fetch('http://localhost:3000/api/featureclass/add/', 
    {  //redirect: 'follow',
       method: 'POST', // *GET, POST, PUT, DELETE, etc.
       mode: 'cors', // no-cors, *cors, same-origin
       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
       credentials: 'same-origin', // include, *same-origin, omit
        headers: {
                   'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
                 },
        body: JSON.stringify({template})
                              
                              //mando por el body la nueva clase
    } )}
    )

    caracteristica.type.map( async typeelement =>
      {console.log(typeelement); 
      await fetch('http://localhost:3000/api/featureclass/add/', 
      {  //redirect: 'follow',
         method: 'POST', // *GET, POST, PUT, DELETE, etc.
         mode: 'cors', // no-cors, *cors, same-origin
         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
         credentials: 'same-origin', // include, *same-origin, omit
          headers: {
                     'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
                   },
          body: JSON.stringify({typeelement})
                                
                                //mando por el body la nueva clase
      } )}
      )
}
imprimir();