import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Page.css";
import AgregarPacientes from "../components/AgregarPacientes";
import { motion } from "framer-motion";
import { GoPerson } from "react-icons/go";
const Page2 = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCard, setShowCard] = useState(null)
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
  const hadleMonOpen = ()=>{
    setShowCard(!showCard)
}
  const hadleMonClosed = ()=>{
    setShowCard(!showCard)
}
  
  const toggleShow = () => {
    setShowSidebar(!showSidebar);
  };
  const ultimoPaciente = pacientes[pacientes.length -1]

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
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
          className="main flex items-center w-full  justify-center gap-10"
        >
          <AgregarPacientes showCard={showCard} onClick2={hadleMonClosed} onClick={hadleMonOpen} setPacientes={setPacientes} pacientes={pacientes} />
  
         {ultimoPaciente && (
            <div className=" flex  bg-white items-center justify-center shadow-xl h-3/4 w-1/3 rounded-md flex-col">
              <div className="h-2/4 border-b w-full flex items-center justify-center">
              <GoPerson size={100}/>
              </div>
              <div className="h-full w-full px-2 py-2 ">
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Paciente:<p className="text-black">{ultimoPaciente.nombre}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Apellido:<p className="text-black">{ultimoPaciente.apellido}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Peso:<p className="text-black">{ultimoPaciente.peso}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Altura:<p className="text-black">{ultimoPaciente.altura}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Sexo:<p className="text-black">{ultimoPaciente.sexo}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Ciudad:<p className="text-black">{ultimoPaciente.ciudad}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">CP:<p className="text-black">{ultimoPaciente.cp}</p></h2>
              </div>
            
          </div>
         )}
  
        </motion.div>
      
      </div>
    </>
  );
};

export default Page2;
