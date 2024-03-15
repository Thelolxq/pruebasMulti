import React, { useState } from 'react'
import { GoHome } from "react-icons/go";
import { RiUserFollowLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoPersonAddOutline } from "react-icons/io5";
import { BiPlusMedical } from "react-icons/bi";
const Sidebar = () => {

const [selected, setSelected] = useState("Inicio")

const handleSelect = (option)=>{
    setSelected(option)
}

  return (
    <>
    <div className='h-full bg-indigo-900 w-60 flex flex-col items-center gap-5'>
        <div className='w-full relative flex flex-col gap-10 '>
            <h1 className='text-center pl-4 flex gap-4 relative top-5 font-medium text-white text-xl'><BiPlusMedical size={30}/> MedicHealt</h1>
            <ul className='flex flex-col pl-2 gap-3 pt-5'>
                <li 
                onClick={()=> handleSelect('Inicio')} 
                className={`cursor-pointer hover:bg-white hover:text-indigo-800 font-medium gap-5 text-white h-14 items-center flex pl-2 rounded-l-full ${selected === 'Inicio' ? 'bg-white text-indigo-800' : '' }`} ><GoHome size={25}/> Inicio</li>
                <li 
                onClick={()=> handleSelect('Seguimiento')} 
                className={`cursor-pointer hover:bg-white hover:text-indigo-800 font-medium gap-5 text-white  h-14 items-center flex pl-2 rounded-l-full ${selected === 'Seguimiento' ? 'bg-white text-indigo-800' : '' }`}><RiUserFollowLine size={25}/> Seguimiento</li>
                <li 
                onClick={()=> handleSelect('Pacientes')} 
                className={`cursor-pointer hover:bg-white hover:text-indigo-800 font-medium gap-5 text-white h-14 items-center flex pl-2 rounded-l-full ${selected === 'Pacientes' ? 'bg-white text-indigo-800' : '' }`}><CgProfile size={25}/>Pacientes</li>
                <li 
                onClick={()=> handleSelect('Agregar')} 
                className={`cursor-pointer hover:bg-white hover:text-indigo-800 font-medium gap-5 text-white h-14 items-center flex pl-2 rounded-l-full ${selected === 'Agregar' ? 'bg-white text-indigo-800 ' : '' }`}><IoPersonAddOutline size={25}/>Agregar Paciente</li>
            </ul>
        </div>
        <div>
            
        </div>
    </div>
    </>
  )
}

export default Sidebar