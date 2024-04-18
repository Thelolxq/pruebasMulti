import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Page.css";
import Cards from "../components/Cards";
import PacientesRecientes from "../components/PacientesRecientes";
import { FaHeartbeat } from "react-icons/fa";
import { BsPersonHeart } from "react-icons/bs";
import { motion } from "framer-motion";
import axios from "axios";
const Page = () => {
 
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
    
  

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleShow = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="h-screen w-screen grid bg-gray-100 grid-cols-[auto,1fr] grid-rows-[auto,1fr,1fr]">
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
        className="main py-2 text-white flex items-center h-full justify-center">
          <Cards
            icon={<FaHeartbeat size={70} />}
            icon2={<BsPersonHeart size={70} />}
          />
        </motion.div>
        <motion.div
        initial={{width:0}}
        animate={{width:"100%"}}
        exit={{x:window.innerWidth}} 
          className="pacientes flex items-center justify-center pb-10"
        >
        {pacientes &&  <PacientesRecientes pacientes={pacientes} />}
        </motion.div>
      </div>
    </>
  );
};

export default Page;
