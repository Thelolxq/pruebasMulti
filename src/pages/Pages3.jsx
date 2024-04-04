import React,{useState} from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { motion } from 'framer-motion'
import Pacientes from '../components/Pacientes'

const Pages3 = () => {

  const [showSidebar, setShowSidebar] = useState(false);
  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      edad: 30,
      sexo: "Masculino",
      altura: "170 cm",
      peso: "70 kg",
      ciudad: "Ciudad de México",
      cp: "01234"
    },
    {
      id: 2,
      nombre: "María",
      apellido: "Gómez",
      edad: 25,
      sexo: "Femenino",
      altura: "160 cm",
      peso: "60 kg",
      ciudad: "Buenos Aires",
      cp: "1000"
    },
    {
      id: 3,
      nombre: "Carlos",
      apellido: "López",
      edad: 45,
      sexo: "Masculino",
      altura: "175 cm",
      peso: "80 kg",
      ciudad: "Madrid",
      cp: "28001"
    },
    {
      id: 4,
      nombre: "Ana",
      apellido: "Martínez",
      edad: 35,
      sexo: "Femenino",
      altura: "165 cm",
      peso: "55 kg",
      ciudad: "Santiago",
      cp: "7500000"
    },
    {
      id: 5,
      nombre: "Pedro",
      apellido: "Sánchez",
      edad: 28,
      sexo: "Masculino",
      altura: "180 cm",
      peso: "75 kg",
      ciudad: "Lima",
      cp: "15074"
    },
    {
      id: 6,
      nombre: "Luisa",
      apellido: "Hernández",
      edad: 40,
      sexo: "Femenino",
      altura: "170 cm",
      peso: "65 kg",
      ciudad: "Bogotá",
      cp: "110311"
    },
    {
      id: 7,
      nombre: "Miguel",
      apellido: "García",
      edad: 50,
      sexo: "Masculino",
      altura: "172 cm",
      peso: "78 kg",
      ciudad: "Ciudad de Guatemala",
      cp: "01001"
    },
    {
      id: 8,
      nombre: "Elena",
      apellido: "Díaz",
      edad: 30,
      sexo: "Femenino",
      altura: "168 cm",
      peso: "58 kg",
      ciudad: "Quito",
      cp: "170401"
    },
    {
      id: 9,
      nombre: "Javier",
      apellido: "Fernández",
      edad: 33,
      sexo: "Masculino",
      altura: "175 cm",
      peso: "70 kg",
      ciudad: "Caracas",
      cp: "1010"
    },
    {
      id: 10,
      nombre: "Sofía",
      apellido: "Rodríguez",
      edad: 29,
      sexo: "Femenino",
      altura: "163 cm",
      peso: "62 kg",
      ciudad: "San José",
      cp: "10101"
    }
  ]);

  const toggleShow = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
 <div className="h-screen w-screen grid bg-gray-100 grid-cols-[auto,1fr] grid-rows-[auto,1fr]">
        <header className="relative header h-full">
          <Header onClick={toggleShow} />
        </header>
        <section className={`h-full sidebar ${showSidebar ? "active" : ""}`}>
          <Sidebar />
        </section>
        <motion.div
        initial={{width:0}}
        animate={{width:"100%"}}
        exit={{x:window.innerWidth}} 
          className="pacientes2 flex h-full  items-center justify-center"
        >
         <Pacientes pacientes={pacientes}/>
        </motion.div>
    </div>
    
    </>
  )
}

export default Pages3