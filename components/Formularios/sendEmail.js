// emailService.js
export const sendEmail = async (Email, Name, puntos,level) => {
    const massageStudent=      `<!DOCTYPE html>
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
          text-align: center;
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
          <img src="https://espanolcone-five.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdfddh08q8%2Fimage%2Fupload%2Fs--4NefY4Ug--%2Fv1701173990%2Fimages%2Fl9hxqqm6urwlk6x8qdih.png&w=384&q=75" alt="ECE"/>
          <h1 style=" z-index: 90;">Estimado/a  ${Name}</h1>
        </header>
        
        <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
          <p>Nos complace informarte que tu resultado fue de <b>${puntos} puntos</b>,</p>
          <p>calificando en esta etapa en el <b>Nivel ${level}.</b> </p>
          <p>Para nosotros es muy importante coordinar una entrevista </p> 
          <p> contigo a través de una videollamada por Meet, con </p>
          <p>el fin de confirmar tu evaluación y preparar el inicio de tu ciclo </p>
          <p>de aprendizaje asistido.</p>
          <p>Quedamos a tu disposición para programar esta entrevista y acompañarte en este nueva aventura.</p>
          
        </div>
        
        <footer style="font-size: 18px;">
          <p>¡Te deseamos suerte en tu entrevista!</p>
        </footer>
      </div>
    </body>
    </html>
    `
;

    const response = await fetch('/api/mail/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: Email,
        subject: 'Resultados de Evaluación de: ' + Name,
        html: massageStudent
      })
    });
  
    if (!response.ok) {
      throw new Error('Error al enviar el correo');
    }
  
    return response.json();
  };
  