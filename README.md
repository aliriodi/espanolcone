Este es un proyecto de una academia de nombre Español con E
Usamos como BD mongo db

https://espanolcone.com

Usamos cloudynari para cargar archivos tipo imagenes en: 
http://localhost:3000/cloudinary

Cuando el pago es Zelle en la BD  hay que validar para modificar los siguientes datos:
1. Calendar teacher con el _id del usario se preasigna la clase al alumno con la variable de preassigned: true y assigned: false
2. Calendar user o student posee el ultimo elemento del calendar como preassigned: true y assigned false
3. En user plansync.value: false y no permite confirmar mas clases hasta que se le de true al valor, el classview que debe inicar en 1 esta en 0 y el plansync.qty = valor
4. En receipts el iduser identifica quien compro por zelle o paypal como medio de pago hizo y el valor dates.valid si es zelle esta en false como condicion inicial
   Los campos anteriormente indicados deben ser cambiados a TRUE cuando el pago zelle sea validado con la Imagen adjuntada por el usuario, con el monto y el id.
   
Corremos el server como 
$ npm run dev

0. Se crea Blog temporal mediante la estrategia:
   
   https://dev.to/nimbel/como-montar-un-blog-estatico-con-next-js-y-dev-to-como-cms-4jmc

   La cuenta para actualziar los blog es

   https://dev.to/aliriodi/post-de-prueba-13a9

   se escribe codigo en
   /pages/blog
   /pages/blog/posts/[slug].js
 
    Lo a continuacion se hace porque el i18n con rutas dinamicas no trabaja bien por lo
   que se decide crear rutas estaticas por cada post, n la linea  127 se cambia el

   Nombre-id-delPost

   en la promesa y alli se actualiza la ruta a estatica y se autorenderiza el post con la nueva
   ruta esto debdio a que la ruta cuando se refresca se pierde el slug o el elemento dinamico y queda en
   404 Not Found

   /pages/blog/posts/'Nombre-id-del-Post/js'

2. Creacion de Modal generico ubicado en 
./componentes/ModalGEENRICO.jsx
sedebe pasar por props un valor de 
open = variable de estado local en valor true para que habra
setOpen = funcion que descativa el modal en el padre debe haber algo como 
conts [open,setOpen]=useState(false)
y una funcion o boton que use el setOpen(true) para que habilite el modal 

3. api de clases como
   
/api/class/get

/api/class/[id]

/api/class/add

/api/class/update

3. api de caracteristicas de clases como
   
/api/featureclass/add

/api/featureclass/get


4. api de users
   
/api/users/get

/api/users/add

/api/users/update

/api/users/[id]

/api/users/image

5. api de teachers

   /api/teachers/get

   /api/teachers/add

   /api/teachers/getcalendar      (teachers con disponibilidad cargada a partir de manana)

6. api features class

   /api/features/add
   
   /api/features/get

7. api de correos /api/mail   por   req.body {to:"email",subject:"titulo o asunto", text:"cuerpo o correo como tal"}

8. El archivo /styles/class.module.css  posee todas los estilos del componente que renderiza las clases

