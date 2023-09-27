import React ,  { useEffect, useState }from 'react'

export default function Class(props) {
  const [data, setData] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    fetch('/api/class/get')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        setData(response.class1[2]);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Fetch error:', error);
      });
  }, []);




  //https://docs.google.com/presentation/d/10lxVnbNdlLZ6OlsXJTU9-uZ3GDJPz140/edit#slide=id.g27c3e69a393_0_0
const a=  {
    type:"boxmove",
    section:"3",
    "title1":"Actividad",
    "paragraph":["Los verbos resaltados en los textos están en presente.",
    "<span style={{ color: 'orange' }}>¿Sabes cuál es su infinitivo? </span>",
     "A continuación, te mostramos algunos verbos usados en los textos y opciones para seleccionar su forma infinitiva correcta. Arrastra el verbo correcto."],
     "sentence":[{"text":"David <span style= 'color: orange;' >trabaja</span> muchas horas al día. _________________",
                       "option":"trabajar"},
                       {"text":"No <span style= 'color: orange;' >piensa</span> volver a su país. ________________",
                      "option":"pensar"},
                      {"text":"<span style= 'color: orange;' >Reconozco</span> que aún tengo problemas con la lengua. _____________________",
                    "option":"reconocer"},
                    {"text": "Bruna <span style= 'color: orange;' >estudia</span> medicina en la UNC. __________________",
                    "option":"estudiar"},
                {"text":"Todavía no <span style= 'color: orange;' >entiende</span> perfectamente el  español. __________________",
                "option":"entender"},
                {"text":"no <span class={color:'orange'}>Le cuesta</span> bastante la pronunciación. ______________________",
                "option":"costar"}]

              };
              const b = require("./nivela2.json");
           //   console.log(b)
        
              
  return (
    <div>Class
      <p>Estas personas viven en Córdoba por diferentes motivos. Lee los textos y decide cuál de ellos vive mejor.</p>
      <p>
        Ella <span style={{ color: 'orange' }}>se llama</span> Bruna, <span style={{ color: 'orange' }}>es</span> brasileña, <span style={{ color: 'orange' }}>tiene </span> 27 años y hace tres que vive en Córdoba Capital. <span style={{ color: 'orange' }}>Es</span> estudiante, <span style={{ color: 'orange' }}>estudia</span> medicina en la Universidad Nacional de Córdoba (UNC) por las tardes y <span style={{ color: 'orange' }}>tiene</span> las mañanas libres. Normalmente <span style={{ color: 'orange' }}>se levanta</span> temprano, <span style={{ color: 'orange' }}>se baña</span>, <span style={{ color: 'orange' }}>se viste</span>, <span style={{ color: 'orange' }}>se maquilla</span> y <span style={{ color: 'orange' }}>desayuna</span> en una cafetería. “<span style={{ color: 'orange' }}>Salgo</span> todas las mañanas, <span style={{ color: 'orange' }}>voy</span> a la universidad para estudiar en la biblioteca, y por las noches <span style={{ color: 'orange' }}>tomo</span> clases de español, <span style={{ color: 'orange' }}>veo</span> televisión y <span style={{ color: 'orange' }}>leo</span>”. Todavía no <span style={{ color: 'orange' }}>entiende</span> perfectamente el  español, <span style={{ color: 'orange' }}>le cuesta</span> bastante la pronunciación pero le gusta hablar y compartir con los nativos. <span style={{ color: 'orange' }}>Se siente</span> feliz en Córdoba, no <span style={{ color: 'orange' }}>quiere</span> volver a Brasil, por ahora.
      </p>
      {/* {console.log(b)} */}
      <p>David <span style={{ color: 'orange' }}>trabaja</span> muchas horas al día. _________________</p>
 {b.page3.data.map((c, index)=> 
  <div key={index}  >
  <p dangerouslySetInnerHTML={{ __html: c.value }}>
 

    </p>
  </div>
  )}

{
console.log(data)}
{
data?
data.sheets[2].data.map((c, index)=> 
  <div key={index}  >
  <p dangerouslySetInnerHTML={{ __html: c.value }}>
 

    </p>
   </div>  ):null
}

    </div>
  )
}
