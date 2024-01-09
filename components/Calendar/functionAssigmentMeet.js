
//Funcion para calcular AM o PM de una hora
// devuelvel la hora con AM o PM
function AMOPM(meetingTime) {
  const timeString = meetingTime?.slice(meetingTime?.indexOf("T") + 1);
  if (timeString) {
    // Extract hours and minutes from the time string
    const [hours, minutes] = timeString.split(":");

    // Convert hours to a number
    const hoursNumber = parseInt(hours, 10);

    // Determine whether it's AM or PM
    const period = hoursNumber >= 12 ? "PM" : "AM";

    // Adjust hours for 12-hour format
    const adjustedHours = hoursNumber % 12 || 12;

    // Construct the final time string with AM or PM
    const formattedTime = `${adjustedHours}:${minutes} ${period}`;

    // Now, 'formattedTime' contains the time with AM or PM
    return formattedTime;
  } else { return 'AM o PM' }
}

//Funcion para enviar email con el meet asignado por el profesor
// Envia al alumno y al profesor
async function sendEmail(renders, meeting) {
  // Mensajes via Email

  let massageTeacher = `
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
      <h1 style=" z-index: 90;">Asignación de clase con ${meeting.first_name + ' ' + meeting.last_name}</h1>
    </header>
    
    <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
      <p>Se te asignó una clase para el día <b>${meeting?.startDatetime.slice(0, meeting?.startDatetime?.indexOf("T"))}</b>,</p>
      <p>a partir de las <b>${AMOPM(meeting?.startDatetime)}</b>,</p>
      <p>y termina a las <b>${AMOPM(meeting.endDatetime)}</b>,</p> 
      <p class="mt">El horario del alumno inicia a las <b>${AMOPM(meeting.userstartDatetime)}</b></p>
      <p>y termina a las <b>${AMOPM(meeting.userendDatetime)}</b></p>
      <p>El enlace meet es:</p>
      <p>${meeting?.meet} </p>
    </div>
    
    <footer style="font-size: 18px;">
      <p>¡Te deseamos suerte en tu clase!</p>
    </footer>
  </div>
</body>
</html>
`
  let massageStudent = `
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
      <h1 style=" z-index: 90;">Asignación de clase con ${renders?.user?.first_name + ' ' + renders?.user?.last_name}</h1>
    </header>
    
    <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
      <p>Se te asignó una clase para el día <b>${meeting?.userstartDatetime.slice(0, meeting?.startDatetime?.indexOf("T"))}</b>,</p>
      <p>a partir de las <b>${AMOPM(meeting?.userstartDatetime)}</b>,</p>
      <p>y termina a las <b>${AMOPM(meeting?.userendDatetime)}</b>,</p> 
      <p>El enlace meet es:</p>
      <p>${meeting?.meet} </p>
    </div>

    
    
    <footer style="font-size: 18px;">
      <p>¡Te deseamos suerte en tu clase!</p>
    </footer>
  </div>
</body>
</html>
`

  try {
    //envio email a teacher
    await
      fetch('/api/mail/',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: renders.user.email,
            subject: 'Asignación de nueva clase con: ' + meeting.first_name + ' ' + meeting.last_name,
            html: massageTeacher
          })
        })
    //Envio email a alumno
    await
      fetch('/api/mail/',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: meeting.email,
            subject: 'Asignación de nueva clase con: ' + renders.user.first_name + ' ' + renders.user.last_name,
            html: massageStudent
          })
        })
  } catch (error) {
    console.error(error);
  }
}

//funcion para enviar a BD la actualizacion del usuario
async function sendBDmeet(email, calendar) {
  try {
    fetch('/api/users/update',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, updates: { calendar: calendar } }),
      }).then(response => response.json())

  } catch (error) {
    console.error(error);
  }
}

//funcion para obteneer datos del usuario
async function modifyUserCalendar(id, meeting, inputString) {
  try {
    await fetch('/api/users/' + id)
      .then(response => response.json())
      .then(user => user.userid.calendar.map(meet => {
        if (meet.startDatetime === meeting.startDatetime) {
          meet['meet'] = inputString;
           //console.log(meeting)
        }
      }))
     // .then(calendar2=>  sendBDmeet(meeting.email, calendar2))
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}

//Funcion de prueba
function hola() { console.log('hola'); alert('hola') }

// Exporta las funciones
module.exports = {
  sendEmail,
  sendBDmeet,
  modifyUserCalendar,
  hola
};