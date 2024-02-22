import {transporter} from '../../../../lib/sendEmail';

export default async function handler(req, res) {
    const { query: { id }} = req;
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to, subject, title, content } = req.body;
  
  try {    

    // Lista de plantillas de mensajes
    let menssagesList = [
        // Encabezado con un gradiente de celeste y verde 
        `
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

                    <img src="https://espanolcone-five.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdfddh08q8%2Fimage%2Fupload%2Fs--4NefY4Ug--%2Fv1701173990%2Fimages%2Fl9hxqqm6urwlk6x8qdih.png&w=384&q=75"/>
                    
                    <h1 style=" z-index: 90;">${title}</h1>

                </header>
                
                <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
                    ${content}
                </div>
                
                <footer style="font-size: 18px;">
                
                </footer>
            </div>
            </body>
        </html>
        `,
        // Fondo Blanco y bolitas de colores alrededor
        `
        <!DOCTYPE html>
        <html>
            <head>
            <style>
            *{
                font-family: 'Montserrat', sans-serif;
                color: #6E6B7B;
            }

            body {
            /* background-color: #f4f4f4; */
            margin: 0;
            padding: 0;
            }

            .container{
            background-color: #fff
            }

            header {
            padding: 25px;
            text-align: center;
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
                text-align: center;
                display: flex;
                width: 100%;
                display: flex;
                justify-content: center;
                line-height: 48.76px;
                justify-content: center;
                align-items: center;
                font-size: 40px;
                font-weight: 600;
                flex-direction: column;
                color: #555555;
            }

            header h1::after{
            content: '';
            margin-top: 15px;
            background-color: #33bb99;
            height: 2px;
            width:80.8px;
            }

            .main {   
            padding: 25px;
            font-weight: 500;
            }

            .main p{
            padding-bottom: 20px
            /* margin: 0; */
            }
            .main .mt{
                margin-top: 12px;
            }

            footer {
            color: #fff;
            padding: 10px;
            font-weight: 500;
            text-align: center;
            }

            .ellipse-1{
                display: flex;
                width: 100px;
                height: 100px;
                border: #8438ff solid 30px;
                background-color:#8438ff ;
                position: absolute;
                left: -40px;
                /* bottom: 0; */
                border-radius: 100%;
            }
            
            .ellipse-2{
                display: flex;
                width: 100px;
                height: 100px;
                background-color: #ff7438;
                /* position: absolute; */
                margin-left: 90%;
                border-radius: 100%;
                top: 50px;
                right: -30px;
            }
        </style>
            </head>
            <body>

            <div class="container">

                <header>

                    <img src="https://espanolcone-five.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdfddh08q8%2Fimage%2Fupload%2Fs--4NefY4Ug--%2Fv1701173990%2Fimages%2Fl9hxqqm6urwlk6x8qdih.png&w=384&q=75"/>
                    
                    ${title ? `<h1 style=" z-index: 90;">${title}</h1>` : ``}
                    
                    <span class="ellipse-2"></span>

                </header>
                
                ${
                    content ?
                    `<div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
                        ${content}
                    </div>` : ``
                }
                
                <footer style="font-size: 18px;">
                    
                </footer>


                <span class="ellipse-1"></span>
            </div>
            </body>
        </html>
        `
    ]

    // Mensage
    let massage = id ? menssagesList[id] : menssagesList[0]

    // Configuracion de email
    const mailOptions = {
        from: 'espanolconeacademy@aliriodi.com', // Cambia esto a tu dirección de correo electrónico
        to:  to,
        subject: subject,
        // text: text,
        html: massage
    };

    // Envia Email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');

    return res.status(200).json({ message: 'Email sent successfully' });

  } 
  catch (error) {

    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email' });

  }
}