
async function sendEmail(email, value) {
  try {
    //envio email a candidato
    let mensaje = '';
    if (value === '0') { mensaje = massage }
    if (value === '1') { mensaje = massage25 }
    if (value === '2') { mensaje = massage10 }
    await
      fetch('/api/mail/',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: email,
            subject: 'Promotion message Español con E ',
            html: massage25
          })
        })
    //Envio email a academia
    await
      fetch('/api/mail/',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: 'aliriodi@gmail.com,eucarodriguez.com,espanolconeacademy@gmail.com',
            subject: 'Se ha enviado mensaje promoción a: ' + email,
            html: 'enviado'
          })
        })
    await fetch('/api/email/add',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email: email, suscribe: true, from: 'student' }),
      })
  } catch (error) {
    console.error(error);
  }

}
// Mensajes via Email


const massage25 = `
 <!DOCTYPE html>
 <html>
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <style>
     *{
         font-family: 'Montserrat', sans-serif;
         color: #000;
     }
     body {
     /* background-color: #f4f4f4; */
     margin: 0;
     padding: 0;
     }

     .container{
       background:white;
       text-color:black;
     }

     

     header {
     padding: 25px;
     text-align: center;
     background-color: #fff;
     border-radius: 0 0 60px;
     /*border-radius: 0 0 60% 60%;*/
     position: relative;
     }
     header img{
       width: 123px;
       height: 78.25px;
       margin-bottom: 15px;
       position: relative;
       z-index: 90;
     }
     header h1{
       position: relative;
       font-size: 28px;
       color: black;
       margin: 0;
     }

     .main {   
       text-align: justify;
       padding: 25px;
       font-weight: 500;
       color: black;
     }
     .main p{
         margin: 0;
     }
     .main .mt{
         margin-top: 12px;
     }
   td {
    width:200px;
   }
     th, td {
      border: 1px solid #dddddd;
      text-align: center;
      padding: 10px;
  }
     footer {
     /* background-color: #007bff; */
     color: black;
     padding: 20px;
     font-weight: 500;
     text-align: center;
     }
 </style>
 </head>
 <body>

   <div class="container">
     <header>
       <img src="https://espanolcone-five.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdfddh08q8%2Fimage%2Fupload%2Fs--4NefY4Ug--%2Fv1701173990%2Fimages%2Fl9hxqqm6urwlk6x8qdih.png&w=384&q=75"/>
       <h1 style=" z-index: 90;">Promotion information: </h1>
     </header>
     
     <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
     
      <p><b>1. Customized individual class: </b> this class is 60 minutes long and you can schedule it through our platform. If you want to study or talk about a specific topic, you can indicate it at the time of scheduling.</p>
      <br>
      <p><b>2. Master Class:</b> this will be a class broadcast on the YouTube channel on February 10 at 5 pm in Argentina, with interesting topics for Spanish students of any level: 
      <p>
      <br>
      <p>* Sounds of Spanish.</p> 
      <p>* Spanish giants: <b>Ser</b> and <b>Estar</b>; <b>Por</b> and <b>Para</b>; <b>The subjunctive.</b></p>
      <p>* The three E's of “Español con E”: <b>Enfoque</b>; <b>Estrategia</b> and <b>Emoción</b>.</p>
      <p>* Complementary technological tools.</p> 
      <p>* Motivation and recommendations.</p> 
      <br>
      <p><b>3. Group class:</b> there will be several group classes of different topics and levels, so you can choose the one that suits you best. </p>
      <p>Here is a list of the classes we have planned so far. You will be notified by email of classes that are added later.</p>
     <br><br>
     <div style="flex-direction: column; align-items: center;">
     
      <table border="1">
      <thead style='background-color: #4CCFEB;'>
          <tr style='height:100px; text-align:center;'>
              <th><b>Class topic</b></th>
              <th><b>Level class</b></th>
              <th><b>Date</b></th>
              <th><b>Argentina timetable</b></th>
          </tr>
      </thead>
      <tbody>
        
          <tr>
              <td>Expectativas de año nuevo</td>
              <td>Basic</td>
              <td>January, Friday 26Th</td>
              <td>from 21:00 to 22:00</td>
          </tr>
          <tr>
              <td>Expectativas de año nuevo </td>
              <td>Intermediate and Advanced </td>
              <td>January, Saturday 27Th</td>
              <td>from 17:00 to 18:00</td>
          </tr>
          <tr>
              <td> ¿Vegano o carnívoro?</td>
              <td>Advanced</td>
              <td>February, Friday 2nd</td>
              <td>from 11:00 to 12:00</td>
          </tr>
          <tr>
              <td> 
                   ¿Qué quieres hacer?
                   ¿Ya tienes un plan?
              </td>
              <td>Basic</td>
              <td>February, Friday 2nd</td>
              <td>from 17:00 to 18:00</td>
          </tr>
          <tr>
              <td>Quiero estar saludable y ser feliz</td>
              <td>Intermediate</td>
              <td>February, Saturday 3rd</td>
              <td>from 14:30 to 15:30</td>
          </tr>
          <tr>
              <td>¿Qué te gustaría hacer? Vamos a hacer un plan</td>
              <td>Intermediate and Advanced</td>
              <td>February, Saturday 3rd</td>
              <td>from 16:00 to 17:00</td>
          </tr>
          <tr>
          <td> ¿Esto o aquello?</td>
          <td>Basic</td>
          <td>February, Thursday 8th</td>
          <td>from 14:00 to 15:00</td>
      </tr>
          <tr>
              <td>Gustos y preferencias</td>
              <td>All levels</td>
              <td>February, Thursday 8th</td>
              <td>from 17:00 to 18:00</td>
          </tr>
          <tr>
          <td>Ya, todavía, aún no</td>
          <td>Intermediate</td>
          <td>February, Thursday 8th</td>
          <td>from 21:00 to 22:00</td>
      </tr>
      <tr>
      <td>Cuentame una anécdota</td>
      <td>Intermediate and Advanced</td>
      <td>February, Monday 12nd</td>
      <td>from 11:00 to 12:00</td>
  </tr>
  <tr>
  <td>Comparando ciudades</td>
  <td>All levels</td>
  <td>February, Monday 12nd</td>
  <td>from 15:00 to 16:00</td>
</tr>
<tr>
<td>Antes y ahora</td>
<td>All levels</td>
<td>February, Monday 12nd</td>
<td>from 21:30 to 22:30</td>
</tr>
<tr>
<td>Querer - Gustar - Amar</td>
<td>Basic</td>
<td>February, Tuesday 13rd</td>
<td>from 15:00 to 16:00</td>
</tr>
<tr>
<td> Hablemos de relaciones</td>
<td>Intermediate and Advanced</td>
<td>February, Wednesday 14th</td>
<td>from 15:00 to 16:00</td>
</tr>
<tr>
<td>Del internet a la inteligencia artificial</td>
<td>Advanced</td>
<td>February, Thursday 15th</td>
<td>from 15:00 to 16:00</td>
</tr>
<tr>
<td>Mi rutina. Estructura y conversación</td>
<td>Basic</td>
<td>February, Thursday 15th</td>
<td>from 17:00 to 18:00</td>
</tr>
      </tbody>
  </table>
</div>


      
     <br><br>
     <p> Payment platforms: </p>
     <br>
     <p> <img src="https://res.cloudinary.com/dfddh08q8/image/upload/s--_tWStOu3--/v1705239348/images/gubfxjdtjhslu6ny6r6b.png" height="40" width="80" />:
     <b>espanolconeacademy@gmail.com</b></p>
     <br>
     <p> <img src="https://res.cloudinary.com/dfddh08q8/image/upload/s--KjPoyaFB--/v1705239434/images/rzftwxl7vgfxmmocl15k.png" height="30" width="80"  />
     : <b>aliriodi@gmail.com            </b></p>
     <div>
     <br><br>
     
     <p>Once the payment has been made, send payment support to <b> espanolconeacademy@gmail.com </b> and we will proceed to create your account within a period of 1 hour.</p></div>
     </div>
 
     
     <footer style="font-size: 18px;">
       <p>¡We are waiting in https://espanolcone.com !</p>
     
     </footer>
   </div>
 </body>
 </html>
 `



const massage = `
 <!DOCTYPE html>
 <html>
 <head>
 <style>
     *{
         font-family: 'Montserrat', sans-serif;
         color: #fff;
     }
     body {
     /* background-color: #f4f4f4; */
     margin: 0;
     padding: 0;
     }

     .container{
       background: linear-gradient(to left bottom, #4CCFEB 70%, #33bb99);
     }

     

     header {
     padding: 25px;
     text-align: center;
     background-color: #fff;
     border-radius: 0 0 60px;
     /*border-radius: 0 0 60% 60%;*/
     position: relative;
     }
     header img{
       width: 123px;
       height: 78.25px;
       margin-bottom: 15px;
       position: relative;
       z-index: 90;
     }
     header h1{
       position: relative;
       font-size: 28px;
       color: #4CCFEB;
       margin: 0;
     }

     .main {   
       text-align: justify;
       padding: 25px;
       font-weight: 500;
     }
     .main p{
         margin: 0;
     }
     .main .mt{
         margin-top: 12px;
     }

     footer {
     /* background-color: #007bff; */
     color: #fff;
     padding: 10px;
     font-weight: 500;
     text-align: center;
     }
 </style>
 </head>
 <body>

   <div class="container">
     <header>
       <img src="https://espanolcone-five.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdfddh08q8%2Fimage%2Fupload%2Fs--4NefY4Ug--%2Fv1701173990%2Fimages%2Fl9hxqqm6urwlk6x8qdih.png&w=384&q=75"/>
       <h1 style=" z-index: 90;">Información de la promoción: </h1>
     </header>
     
     <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
       <p>1.<b> Clase individual personalizada:</b> esta clase tiene 60 minutos de duración y puedes agendarla a través de nuestra plataforma. Si deseas estudiar o hablar un tema en específico, puedes indicarlo al momento de agendar.</p>
     <br>
       <p>2.<b> Master Class:</b> esta será una clase transmitida por el canal de YouTube el día 10 de febrero a las 17 horas en Argentina, con temas de interés para estudiantes de español de cualquier nivel: <p>
     <br>
       <p>* Sonidos del español. </p> 
       <p>* Gigantes del español: Ser y Estar; Por y Para; El subjuntivo.</p>
       <p>* Las tres E de Español con E: Enfoque; Estrategia y Emoción.</p>
       <p>* Herramientas tecnológicas complementarias. </p> 
       <p>* Motivación y recomendaciones. </p> 
     <br>
       <p>3.<b> Clase grupal:</b> se llevarán a cabo varias clases grupales de diferentes 
       temas y niveles, para que puedas  elegir la que te convenga.</p>
     <br>
       <p>* <u>Expectativas de año nuevo.</u> 
           <ul>
           <li>
           Nivel Básico: <b>viernes 26</b> de enero de <b>04:00 PM a 05:00 PM</b> y de <b>09:00 PM a 10:00 PM</b> horario de Argentina.</b> </p>
           </li>
           <li>
           Nivel Intermedio - Avanzado: <b>sábado 27</b> de enero de <b>03:00 PM a 05:00 PM</b> y de <b>05:00 PM a 06:00 PM</b> horario de Argentina.</b> </p>
           </li>
           </ul>
      
      <p>* <u>¿Qué quieres hacer? ¿Ya tienes un plan?.</u> Nivel Básico:  <b>viernes 02</b> de febrero de <b>05:00 PM a 06:00 PM </b> horario de Argentina.
      <p>* <u>¿Qué te gustaría hacer? Vamos a hacer un plan.</u> Nivel Intermedio - Avanzado:  <b>sábado  03</b> de febrero de <b>04:00 PM a 05:00 PM </b> horario de Argentina.</p>
      <p>* <u>Gustos y preferencias.</u> Todos los niveles:  <b>jueves 08</b> de febrero de <b>05:00 PM a 06:00 PM </b> horario de Argentina.</p>
      <p>* <u>Ya, todavía, aún no.</u> Nivel Intermedio: <b>jueves 08</b> de febrero de <b>09:00 PM a 10:00 PM </b> horario de Argentina.</p>
      <p>* <u>Comparando ciudades.</u> Todos los niveles: <b>lunes 12</b> de febrero de <b>03:00 PM a 04:00 PM </b> horario de Argentina.</p>
      <p>* <u>Antes y ahora.</u> Todos los niveles: <b>lunes 12</b> de febrero de <b>09:30 PM a 10:30 PM </b> horario de Argentina.</p>
      <p>* <u>Querer - Gustar - Amar.</u> Nivel Básico - Intermedio: <b>martes 13</b> de febrero de <b>03:00 PM a 04:00 PM </b> horario de Argentina.</p>
      <p>* <u>Hablemos de relaciones. </u>  Nivel intermedio - Avanzado: <b>miércoles 14</b> de febrero de <b>03:00 PM a 04:00 PM </b> horario de Argentina.</p>

      <br><br>

      <p>1.<b> Personalized individual class: </b> this class is 60 minutes long and you can schedule it through our platform. If you want to study or talk about a specific topic, you can indicate it when scheduling.</p>
      <br>
      <p>2.<b> Master Class:</b>  this will be a class broadcast on the YouTube channel on February 10 at 5 p.m. in Argentina, with topics of interest for Spanish students of any level:<p>
      <br>
      <p>* Sounds of Spanish.</p> 
      <p>* Giants of Spanish: Ser and Estar; By and for; The subjunctive.</p>
      <p>* The three E's of Spanish with E: Focus; Strategy and Emotion.</p>
      <p>* Complementary technological tools.</p> 
      <p>* Motivation and recommendations.</p> 
      <br>
      <p>3.<b> Group class:</b> Several group classes of different topics and levels will be held, so you can choose the one that suits you.</p>
     <p>* <u>New year expectations.</u> 
          <ul>
          <li>
          Basic Level: <b>Friday, 26 January</b> from <b>04:00 PM to 05:00 PM</b> and <b>09:00 PM to 10:00 PM</b> in Argentina schedule.</b> </p>
          </li>
          <li>
          Intermediate - Advanced Level: <b>Saturday, 27 January</b> from <b>03:00 PM to 05:00 PM</b> and <b>05:00 PM to 06:00 PM</b> in Argentina schedule.</b> </p>
          </li>
          </ul>
     
     <p>* <u>What do you want to do? Do you already have a plan?</u> Basic Level: <b>Friday, February 2</b> from <b>05:00 PM to 06:00 PM </b> in Argentina schedule.
     <p>* <u>What would you like to do? Let's make a plan.</u> Intermediate - Advanced Level: <b>Saturday, February 3</b> from <b>04:00 PM to 05:00 PM </b> in Argentina schedule.</p>
     <p>* <u>Tastes and preferences.</u> All levels: <b>Thursday, February 8</b> from <b>05:00 PM to 06:00 PM </b> in Argentina schedule.</p>
     <p>* <u>Already, not yet.</u> Intermediate Level: <b>Thursday, February 8</b> from <b>09:00 PM to 10:00 PM </b> in Argentina .</p>
     <p>* <u>Comparing cities.</u> All levels: <b>Monday, February 12</b> to <b>03:00 PM to 04:00 PM </b> in Argentina schedule.</p>
     <p>* <u>Before and now.</u> All levels: <b>Monday, February 12</b> from <b>09:30 PM to 10:30 PM </b> in Argentina schedule.</p>
     <p>* <u>Want - Like - Love.</u>  Basic - Intermediate Level: <b>Tuesday, February 13</b> from <b>03:00 PM to 04:00 PM </b> in Argentina schedule.</p>
     <p>* <u>Let's talk about relationships.</u> Intermediate level - Advanced: <b>Wednesday, February 14</b> from <b>03:00 PM to 04:00 PM </b> in Argentina schedule.</p>
     <br><br>
     <p>Plataformas de pago: / Payment platforms: </p>
     <br>
     <p> <img src="https://res.cloudinary.com/dfddh08q8/image/upload/s--_tWStOu3--/v1705239348/images/gubfxjdtjhslu6ny6r6b.png" height="40" width="80" />:
     <b>espanolconeacademy@gmail.com</b></p>
     <br>
     <p> <img src="https://res.cloudinary.com/dfddh08q8/image/upload/s--KjPoyaFB--/v1705239434/images/rzftwxl7vgfxmmocl15k.png" height="30" width="80"  />
     : <b>aliriodi@gmail.com            </b></p>
     <div>
     <br><br>
     <p>Una vez elaborado el pago envie soporte de pago a <b> espanolconeacademy@gmail.com </b> y procederemos a crear su cuenta en un periodo de 1 hora.</p>
     <br>
     <p>Once the payment has been made, send payment support to <b> espanolconeacademy@gmail.com </b> and we will proceed to create your account within a period of 1 hour.</p></div>
     </div>
 
     
     <footer style="font-size: 18px;">
       <p>¡Te esperamos en https://espanolcone.com !</p>
     
     </footer>
   </div>
 </body>
 </html>
 `


// Exporta las funciones
module.exports = {
  sendEmail

};