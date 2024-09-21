import style from '../../../styles/class.module.css'
import ActivityElement from './ActivityElement'
import PDFReader from '../../Class/Documents/PDFReader'
//import { convertValueToMeridiem } from '@mui/x-date-pickers/internals/utils/time-utils'

export default function ActivityTemplate({ sheetsOfSection }){

    return (
        <>
            {/* Teample */}
            <div className={`${style[sheetsOfSection?.template]} ${style[sheetsOfSection?.classNamePlus]}`}>

                
              {/* Titulo */}
              <div className={style['title']}>
                {
                    sheetsOfSection?.data?.map((data, index) =>
                        // Elementos de Encabezado
                        (data.type === 'title' || data.type === 'popup')&& (<ActivityElement key={index}  date={data} index={index}/>)
                        
                    )
                }
              </div>
              
              {/* Contenido */}
              <div className={style['content']}>
                {
                    sheetsOfSection?.data?.map((data, index) =>
                        (data.type !='pdf' && data.type != 'title' && data.type != 'popup') && (<ActivityElement key={index} date={data} index={index}/>) 
                                    
                    )
                   
                }
              </div>
              {/* PARA PDF */}
              <div className={style['content']}>
                {
              
                    sheetsOfSection?.data?.map((data, index) =>
                    
                    (data.type =='pdf' ) && (<PDFReader key={index} data={data} index={index}></PDFReader>) 
                   
                )
                   
                }
              </div>
              

            </div>
        </>
    )
}
