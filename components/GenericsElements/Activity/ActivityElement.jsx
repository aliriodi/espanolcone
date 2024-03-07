import style from '../../../styles/class.module.css'
import ImagesGrid from '../../Class/ImagesGrid/ImagesGrid'
import Table from '../../Class/Table'
import YouTube from 'react-youtube';
import YoutubePopup from '../../youtubePopup/youtubePopup';
import DragablesBox from '../../Class/DragableBox/DragablesBox';
import Selectsimple from '../../Class/Selectsimple';
import Paragragraphcomplete from '../../Class/paragragraphcomplete';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ActivityElement({ date, index }) {

    const {data: session,status, update} = useSession();
    
    // listado de actividades que estan en la hoja
    const [typeActivitys, setTypeActivitys] = useState([]) 

    // Opciones de Youtube
    const iframeRef = useRef(null);

    const opts = {
        playerVars: {
          rel: 0, // Evitar videos relacionados al final
          autoplay: 0, // Desactivar la reproducción automática
          modestbranding: 1, // Ocultar el logotipo de YouTube
          fs: 1, // Oculto el boton de maximizar video fs FullScreen
          color: "#000"
        }
    }

    function handleChangeActivityDone(id, value, amountDone){
        // Esta funcion se encarga de cambiar el valor "done" de la actividad espesificada por "id",
        // que se encuentra en "typeActivitys"
        setTypeActivitys(typeActivitys=>{
          typeActivitys = typeActivitys.filter((activity)=>{
    
            if(activity.id == id){
              let newActivity = activity;
              
              newActivity.done = value;
              newActivity.amountDone = amountDone;
    
              return newActivity
            }
            return activity
    
          })
          return typeActivitys
        })
    }

    useEffect(()=>{
        console.log(typeActivitys)
    },[typeActivitys])

    return (
        <>
            {/* Titulo */}
            {date.type === 'title' && 
                <div
                className={`${style[date.className]} ${style[date.classNamePlus]} ${date.classExtra}`}
                key={index}
                style={date.style} >
                    <p
                    dangerouslySetInnerHTML={{ __html: date.value }}/>
                </div>
            }

            {/* PopUp de Dialogos */}
            {date.type === 'popup' &&
                <div
                className={`${style[date.className]} ${style[date.classNamePlus]} ${date.classExtra}`}
                key={index}
                style={date.style}>
                    <p
                    dangerouslySetInnerHTML={{ __html: date.value }}/>
                </div>
            }

            {/* Div */}
            {date.type === 'div' &&
                <div
                key={index}
                style={date.style}
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}
                dangerouslySetInnerHTML={{ __html: date.value }}/>
            }
            
            {/* Level */}
            {date.type === 'level' &&
                <p
                key={index}
                style={date.style}
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}
                dangerouslySetInnerHTML={{ __html: date.value }}/>
            }
            
            {/* Imagen */}
            {date.type === 'image' &&
                <img
                key={index}
                style={date.style}
                width='100'
                height='100'
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}
                src={date.value}
                alt={date.alt}/>
            }

            {/* Cuadricula de Imagenes */}
            {date.type === 'image-grid' && 
                <ImagesGrid
                key={index}
                style={date.style}
                images={date.value}
                center={date.center}/>
            }

            {/* Tabla */}
            {date.type === 'table' &&
                <Table
                key={index}
                style={date.style}
                color={date?.color}
                value={date.value}/>
            }

            {/* Bloque de textos */}
            {date.type === 'text-block' &&
                <div
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}
                key={index}
                style={date.style}
                dangerouslySetInnerHTML={{ __html: date.value }}></div>
            }
            
            {/* Video Youtube */}
            {date.type === 'video-youtube' &&
                <div
                className={`${style[date.className]}
                ${style[date.classNamePlus]} youtube ${date.classExtra}`}>
                    <YouTube
                    key={index}
                    style={date.style}
                    ref={iframeRef}
                    opts={opts}
                    videoId={date.value}
                    className='youtube' />
                </div>
            }
            
            {/* Video Youtube con PopUps */}
            {date.type === 'videoi-youtube' &&
                <div
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}>
                    <YoutubePopup
                    // done={sheetsState[i]?.done}
                    key={index} style={date.style}
                    titlep={null} popups={date.popups}
                    videoId={date.value} className='youtube'
                    id={index}
                    onChangeActivityDone={handleChangeActivityDone}
                    // inEvaluation={data?.sheets[props.page]?.section?.number == 5}
                    />
                </div>
            }


            {/* Caja de Oraciones */}
            {date.type === 'sentence-box' &&
                <div
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}>
                    <p
                    key={index}
                    style={date.style}
                    dangerouslySetInnerHTML={{ __html: date.value }}/>
                </div>
            }
            
            {/* Drag Box */}
            {date.type === 'dragable-box' &&
                <DragablesBox
                // done={sheetsState[i]?.done}
                key={index}
                style={date.style}
                allowFollow={()=>{}}
                containerPosition={date?.containerPosition}
                options={date.value}
                id={index}
                onChangeActivityDone={handleChangeActivityDone}
                // inEvaluation={data?.sheets[props.page]?.section?.number == 5}
                isAdmin={session?.user?.role?.includes("admin")}/>
            }
            
            {/* Parrafo */}
            {date.type === 'paragraph' &&
                <p
                key={index}
                style={date.style}
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}
                dangerouslySetInnerHTML={{ __html: date.value }}/>
            }
            
            
            {/* SelectSimple */}
            {date.type === 'selectsimple' &&
                <div
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}
                style={date.style}>
                    <Selectsimple
                    // done={sheetsState[i]?.done}
                    key={date.option}
                    data={date}
                    id={index}
                    onChangeActivityDone={handleChangeActivityDone}
                    // inEvaluation={data?.sheets[props.page]?.section?.number == 5}
                    isAdmin={session?.user?.role?.includes("admin")}/>
                </div>
            }
            
            {/* Texto */}
            {date.type === 'text' &&
                <div className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}
                style={date.style}>
                    <p dangerouslySetInnerHTML={{ __html: date.value }}/>
                </div>
            }
            
            {/* Parrafo a Completar */}
            {date.type === 'paragraph-complete' &&
                <div
                key={index}
                style={date.style}
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}>
                    <Paragragraphcomplete
                    // done={sheetsState[i]?.done}
                    id={index}
                    onChangeActivityDone={handleChangeActivityDone}
                    // inEvaluation={data?.sheets[props.page]?.section?.number == 5}
                    data={date}
                    isAdmin={session?.user?.role?.includes("admin")}/>
                </div>
            }
            
            {/* Parrafo a Completar con Imagenes */}
            {date.type === 'paragraph-complete-content' &&
                <div
                key={index}
                style={date.style}
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}>
                    <Paragragraphcomplete
                    type={"content"}
                    // done={sheetsState[i]?.done}
                    id={index}
                    onChangeActivityDone={handleChangeActivityDone}
                    // inEvaluation={data?.sheets[props.page]?.section?.number == 5}
                    data={date}
                    isAdmin={session?.user?.role?.includes("admin")}/>
                </div>
            }
            
            {/* PopUp de Dialogos */}
            {date.type === 'popUp-dialogues' &&
                <div
                key={index}
                style={date.style}
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}
                dangerouslySetInnerHTML={{ __html: date.value }}/>
            }
            
            {/* Parrafo a Completar de lista */}
            {date.type === 'complete-li' &&
                <div
                key={index}
                style={date.style}
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}>
                    <Paragragraphcomplete
                    // done={sheetsState[i]?.done}
                    id={index}
                    onChangeActivityDone={handleChangeActivityDone}
                    // inEvaluation={data?.sheets[props.page]?.section?.number == 5}
                    data={date}
                    isAdmin={session?.user?.role?.includes("admin")}/>
                </div>
            }
            
            {/* Parrafo a Completar de lista con persona*/}
            {date.type === 'complete-li-personal' &&
                <div
                key={index}
                style={date.style}
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}>
                    <Paragragraphcomplete
                    // done={sheetsState[i]?.done}
                    id={index}
                    onChangeActivityDone={handleChangeActivityDone}
                    // inEvaluation={data?.sheets[props.page]?.section?.number == 5}
                    data={date}
                    isAdmin={session?.user?.role?.includes("admin")}/>
                </div>
            }

            {/* Separador */}
            {date.type === 'separator' &&
                <span
                key={index}
                style={date.style}
                className={`${date.classExtra} ${style[date.className]} ${style[date.classNamePlus]}`}/>
            }
            
        </>
    )
}
