import React, { useState } from "react";
import { Image, Transformation } from "cloudinary-react";

export default function CloudinaryUploader (props) {
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const languageR ={cloudinary:{loading:"cargando"}}
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET); // en el settings de cloudinary se cambia este presets
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/"+process.env.NEXT_PUBLIC_CLOUDINARY_NAME+"/image/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();
      setImageURL(data.secure_url);
      console.log(data)
      setLoading(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {loading ? (
        <p>{languageR.cloudinary.loading}</p>
      ) : (
        imageURL && (
          <Image cloudName="tu_nombre_de_cloudinary" width={props.width}  publicId={imageURL}>
            <Transformation width="300px"  crop="scale" />
          </Image>
        )
      )}
    </div>
  );
};

