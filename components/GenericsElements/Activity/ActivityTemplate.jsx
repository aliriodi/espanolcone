import style from '../../../styles/class.module.css'
import ActivityElement from './ActivityElement'

export default function ActivityTemplate({ sheetsOfSection }){

    return (
        <>
            {/* Teample */}
            <div className={`${style[sheetsOfSection?.template]} ${style[sheetsOfSection?.classNamePlus]}`}>

                
              {/* Titulo */}
              <div className={style['title']}>
                {
                    sheetsOfSection?.data?.map((data, index) =>
                        <>
                            {/* Elementos de Encabezado */}
                            {(data.type === 'title' || data.type === 'popup')&& <ActivityElement key={index}  date={data} index={index}/>}
                            
                        </>
                    )
                }
              </div>
              
              {/* Contenido */}
              <div className={style['content']}>
                {
                    sheetsOfSection?.data?.map((data, index) =>
                    <>
                        {(data.type != 'title' && data.type != 'popup') && <ActivityElement key={index} date={data} index={index}/>}
                    </>

                    )
                }
              </div>
                
            </div>
        </>
    )
}
