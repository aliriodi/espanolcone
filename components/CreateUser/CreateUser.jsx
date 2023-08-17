
import React, { useState }from "react";

export default function CreateUser(props){
//FUNCIONES PARA CARGAR IMAGENES USUARIOS
    const [URLImage,setURLImage] = useState("")
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "images")
        setLoading(true);
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dfddh08q8/image/upload",
          {
             method: "POST",
            body: data
          }
        )
        const file = await res.json()
        setImage(file.secure_url)
      //   console.log(file.secure_url)
        setLoading(false)
        handleOnChangeI(file.secure_url)
      // Renderizar Imagen
        setURLImage(file.secure_url)
    }
    //VALIDACION DE IMAGEN
function fileValidationI(e) {
    var fileInput =e.target.files[0];
    var filePath = fileInput.name;
      // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
   if (!allowedExtensions.exec(filePath)) {
        alert('Archivo no es imagen jpg,jpeg,png,gif');
        fileInput.value = '';
        return false;
    }else{ console.log('else')
    uploadImage(e)
   }}
    return(
        <div>
<p>{props.userL.name}</p>
<p>{props.userL.email}</p>        </div>
    )}