Este es un proyecto de una academia de nombre Español con E
Usamos como BD mongo db

Usamos cloudynari para cargar archivos tipo imagenes en: 
http://localhost:3000/cloudinary

Corremos el server como 
$ npm run dev

1. api de clases como
/api/class/get
/api/class/[id]
/api/class/add
/api/class/update

2. api de caracteristicas de clases como
/api/featureclass/add
/api/featureclass/get

3. api de users
/api/users/get
/api/users/add
/api/users/update

4. api de correos
/api/mail     por   req.body {to:"email",subject:"titulo o asunto", text:"cuerpo o correo como tal"}


5. El archivo /styles/class.module.css  posee todas los estilos del componente que renderiza las clases

