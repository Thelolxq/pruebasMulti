import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Page.css";
import AgregarPacientes from "../components/AgregarPacientes";
import { motion } from "framer-motion";
import { GoPerson } from "react-icons/go";
import axios from "axios";
const Page2 = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCard, setShowCard] = useState(null)
  const [pacientes, setPacientes] = useState([])

  useEffect(()=>{

    const fechData = async()=>{
        try{
          const response = await axios.get('http://3.209.232.158:8081/patients')
          setPacientes(response.data.data)
          console.log("datos",response.data.data)
        }catch(error){
          console.error("error al llamar a la api", error.message)
        }
    }
    fechData()
  },[])

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
  console.log("DATOS",ultimoPaciente)
  localStorage.setItem("id",JSON.stringify(ultimoPaciente))



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
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Paciente:<p className="text-black">{ultimoPaciente.name}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Apellido:<p className="text-black">{ultimoPaciente.lastName}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Edad:<p className="text-black">{ultimoPaciente.edad}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Curp:<p className="text-black">{ultimoPaciente.curp}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Curp:<p className="text-black">{ultimoPaciente.imc}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Peso:<p className="text-black">{ultimoPaciente.weight}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Altura:<p className="text-black">{ultimoPaciente.height}</p></h2>
            <h2 className="w-full flex gap-2 text-indigo-900 font-medium">Sexo:<p className="text-black">{ultimoPaciente.gender}</p></h2>
              </div>
              
          </div>
         )}
  
        </motion.div>
      
      </div>
    </>
  );
};

export default Page2;
