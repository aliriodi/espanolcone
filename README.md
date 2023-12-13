Este es un proyecto de una academia de nombre Español con E
Usamos como BD mongo db

Usamos cloudynari para cargar archivos tipo imagenes en: 
http://localhost:3000/cloudinary

Cuando el pago es Zelle en la BD  hay que validar para modificar los siguientes datos:
1. Calendar teacher con el _id del usario se preasigna la clase al alumno con la variable de preassigned: true y assigned: false
2. Calendar user o student posee el ultimo elemento del calendar como preassigned: true y assigned false
3. En user planssync.value: false y no permite confirmar mas clases hasat que se le de true al valor, el classview que debe inicar en 1 esta en 0 y el plansync.qty = valor
4. En receipts el iduser identifica quien compro por zelle o que medio de pago hizo y el valor dates.valid si es zelle esta en false
   
Corremos el server como 
$ npm run dev

1. api de clases como
   
/api/class/get

/api/class/[id]

/api/class/add

/api/class/update

3. api de caracteristicas de clases como
   
/api/featureclass/add

/api/featureclass/get


5. api de users
   
/api/users/get

/api/users/add

/api/users/update

/api/users/[id]

/api/users/image

6. api de teachers

   /api/teachers/get

   /api/teachers/add

   /api/teachers/getcalendar      (teachers con disponibilidad cargada a partir de manana)

7. api features class

   /api/features/add
   
   /api/features/get

9. api de correos /api/mail   por   req.body {to:"email",subject:"titulo o asunto", text:"cuerpo o correo como tal"}


10. El archivo /styles/class.module.css  posee todas los estilos del componente que renderiza las clases

