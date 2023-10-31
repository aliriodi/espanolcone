import React, { useState } from "react";
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';





export default function CloudinaryUploader(props) {
  const [info, updateInfo] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [loading, setLoading] = useState(false);
  

  const handleUpload = async (e, error, result, widget) => {
    const file = e.target.files[0];
    setLoading(true);
    if (!error) {
      // Create a FormData object and append data to it
      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
           
       //console.log(formData)
      // Send the FormData to your server or perform other actions
      // For example, you can use the fetch API to upload the FormData
      const response = await fetch("https://api.cloudinary.com/v1_1/" + process.env.NEXT_PUBLIC_CLOUDINARY_NAME + "/image/upload", {
        method: 'POST',
        body: formData,
     //   mode: 'cors',
      //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //  credentials: 'same-origin', // include, *same-origin, omit
      }).catch((error) => {
          console.error('Error uploading image:', error);
          setLoading(false)
        });
        const data = await response.json().then(response=>setimageUrl(response.secure_url));
        //funcion para escribir en Base ded atos viene por props cuando se llame el componente
       // props.functionBD(data.secure_url);
     
        console.log(data)
        setLoading(false);
    } else {
      setLoading(false)
      console.error('Error uploading image:', error);
    }
   
 
  
  };
  return (
    <div>
          <div className='pt-16'>
        {imageUrl ? <Image src={imageUrl} width={'300px'} height={100} /> :
          <>No se ha cargado imagen</>}
        {loading ? <p>cargando....</p> : null}
        <p></p>

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>


    </div>
  );
};

