import React from 'react';

const VideoComponent = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="h-[20%] w-full bg-white flex items-center justify-center">
        <p className="text-orange-500 text-6xl font-bold">Texto español con e layout 7</p>
      </div>
      <div className="h-[80%] w-full bg-white flex items-center justify-center">
        <iframe
          width="1280" // Ancho del video aumentado
          height="720" // Altura del video aumentada
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Dummy Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoComponent;

