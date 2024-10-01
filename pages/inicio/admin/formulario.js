import Form1 from '../../../components/Formularios/ViewForm1';
import Form2 from '../../../components/Formularios/ViewForm2';
import Form3 from '../../../components/Formularios/ViewForm3';
import Menu from '../../../components/Menu';
import React , { useState, useEffect } from 'react'
import NavBarAdmin from '../../../components/admin/NavBarAdmin';

function Formulario() {
    const [Formulario1, setFormulario1] = useState(false);
    const [Formulario2, setFormulario2] = useState(false);
    const [Formulario3, setFormulario3] = useState(false);
  
    const mostrarFormulario1 = () => {
      setFormulario1(true);
      setFormulario2(false);
      setFormulario3(false);
    };
  
    const mostrarFormulario2 = () => {
      setFormulario1(false);
      setFormulario2(true);
      setFormulario3(false);
    };
  
    const mostrarFormulario3 = () => {
      setFormulario1(false);
      setFormulario2(false);
      setFormulario3(true);
    };
  
    return (
      <div>
        <Menu />
        <div className='px-[60px] py-[119px] md:px-[25px]'>
          <NavBarAdmin />
        </div>
        
        <div className='flex  md:flex-row gap-4 justify-center items-center buttons'>
          <button className='px-4 py-2 bg-primary text-white rounded-md' onClick={mostrarFormulario1}>Formulario 1</button>
          <button className='px-4 py-2 bg-primary text-white rounded-md' onClick={mostrarFormulario2}>Formulario 2</button>
          <button className='px-4 py-2 bg-primary text-white rounded-md' onClick={mostrarFormulario3}>Formulario 3</button>
        </div>
  <div className='pt-8'>
        {Formulario1 && <Form1 />}
        {Formulario2 && <Form2 />}
        {Formulario3 && <Form3 />}
        </div>
      </div>
    );
  }
  
  export default Formulario;