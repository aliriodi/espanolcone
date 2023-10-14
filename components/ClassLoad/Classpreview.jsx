import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Spinner from '../Spinner';
import styles from '../../styles/boxmove.module.css';
import YouTube from 'react-youtube';
import YOUTUVEPOPUP from '../youtubePopup/youtubePopup';
import BOXMOMVE from '../Class/boxmove';
import SELECTSIMPLE from '../Class/Selectsimple';
import PARAGGRAPHCOMPLETE from '../Class/paragragraphcomplete';
import style from '../../styles/class.module.css';

export default function Class(props) {
  // Estado para almacenar los datos de la lección
  const [data, setData] = useState({ sheets: [] });
  // Estado para rastrear el número de página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Referencia al iframe de YouTube
  const iframeRef = useRef(null);

  // Opciones de YouTube
  const opts = {
    playerVars: {
      rel: 0,
      autoplay: 1,
      modestbranding: 1,
      fs: 1,
      color: "#000",
    },
  };

  // Función para cargar los datos de la lección
  useEffect(() => {
    if (props.id) {
      fetch('/api/class/' + props.id)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((response) => {
          setCurrentPage(0); // Restablecer la página actual
          setData(response.class1);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    } else if (props.class) {

      setData(props.class);
      let nuevaclase = [];
      const numberOfPages = Object.keys(props.class.sheets).length;

      setData(data['sheets'] = nuevaclase)

    }
  }, [props.id, props.class]);

  // Funciones para avanzar y retroceder páginas
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Object.keys(props.class.sheets).length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div>
        <button
          style={{ backgroundColor: '#4CCFEB', border: '4px solid #007bff' }}
          onClick={goToPreviousPage}
        >
          Back
        </button>
        <span style={{ marginLeft: '16px' }}>
          {currentPage}/{Object.keys(props.class.sheets).length || 0}
        </span>
        <button
          style={{ marginLeft: '16px', backgroundColor: '#4CCFEB', border: '4px solid #007bff' }}
          onClick={goToNextPage}
        >
          Forward
        </button>
      </div>
      <div>
        {currentPage}
        {console.log('componente preview')}
        {console.log(props.class)}
        {console.log(Object.keys(props.class.sheets))}
        <p>{props.class.level}</p>
        <p>{props.class.unit}</p>
        {/* <p>{props.class.description}</p> */}
        {/* <p>{Object.keys(props.class.sheets).length}</p> */}
        {/* <div>
          {props.class.sheets['page' + currentPage].type}
        </div> */}
        <div>{props.class.sheets['page' + currentPage].section.value}</div>
        <div className='border-[--orange] border-4 '>
          <div >{props.class.sheets['page' + currentPage].data.map(
            (c, index) =>
              <div >

                {/* {console.log(index,i,c.className)} */}
                {/* PARA RENDERIZAR MEJOR  */}
                {props.class.sheets['page' + currentPage].template ? <Image
                  key={index + 1}
                  src={props.class.sheets['page' + currentPage].template}
                  alt="Background Image"
                  width={200}
                  height={200}
                //   layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  style={{ zIndex: -10 }}
                  className="z-10"
                /> : null}
                <div className={style[c.className]} key={index}  >
                  {c.type === 'level' ? <p dangerouslySetInnerHTML={{ __html: c.value }}></p> : null}

                  {c.type === 'image' ? <div className='className'><Image width='100' height='100' src={c.value} alt={c.alt} /> </div> : null}
                  {c.type === 'title' ? <div className='className'><p dangerouslySetInnerHTML={{ __html: c.value }}></p></div> : null}
                  {c.type === 'video-youtube' ? <div className='youtube'> <YouTube ref={iframeRef} opts={opts} videoId={c.value} className='youtube' style={{ maxWidth: '400px', width: '100%' }} /> </div> : null}
                  {c.type === 'videoi-youtube' ? <div className='className'><YOUTUVEPOPUP titlep={null} popups={c.popups} videoId={c.value} className='youtube' /></div> : null}
                  <div className={styles['box']}>
                    <div className='className'>
                      {c.type === 'options-box' ? c.value.map(value => <BOXMOMVE key={value.y} option={value} id={c.id} />) : null}
                    </div></div>
                  {c.type === 'paragraph' ? <div className='className'><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div> : null}
                  {c.type === 'sentence-box' ? <div className='className'><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div> : null}
                  {c.type === 'selectsimple' ? <div className='className'> <SELECTSIMPLE key={c.option} data={c} /> </div> : null}
                  {c.type === 'text' ? <div className='className'><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div> : null}
                  {/* En la siguiente linea falta destructurar el objeto como input form */}
                  {c.type === 'paragraph-complete' ? <div className='className'><PARAGGRAPHCOMPLETE data={c} /></div> : null}
                  {c.type === 'complete-li' ? <div className='className'><PARAGGRAPHCOMPLETE data={c} /> </div> : null}
                  {c.type === 'complete-li-personal' ? <div className='className'><PARAGGRAPHCOMPLETE data={c} /> </div> : null}
                  {c.type === 'popup' ? <div className='className'> <p dangerouslySetInnerHTML={{ __html: c.value }}></p></div> : null}
                  {/* <p dangerouslySetInnerHTML={{ __html: c.value }}></p> */}
                </div></div>)

          }
          </div> </div>  </div>
    </div>

  );
}
