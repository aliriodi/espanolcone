import React ,{useEffect} from 'react';
import { useSelector   } from 'react-redux';
import Menu from "../../components/Menu";
import PREVIEW from "../../components/ClassLoad/Classpreview";
import Spinner from '../../components/Spinner';
import style from "../../styles/courses.module.css"
export default function Preview() {
    const classpreview = useSelector((state) => state.datos.classpreview);
    useEffect(() => {
        {console.log('otroUSEEFFECT')}
        {console.log(classpreview)}
    }, [classpreview]);
  return (
    <div className={style['container']}>
      <div className={style['container0']}>
        <Menu /></div>
      <div className='ml-[80px] '>
        {classpreview ? 
          <div className={style['container1']}>
          <PREVIEW class={classpreview}></PREVIEW></div> 
          :
          <div classname='flex items-center justify-center h-screen'>
            <Spinner className="mx-auto my-auto" />
          </div>
        }
      </div>
    </div>
  )
}
