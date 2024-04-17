import React,{useEffect, useState} from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { motion } from 'framer-motion'
import Pacientes from '../components/Pacientes'
import axios from 'axios'

const Pages3 = () => {

  const [showSidebar, setShowSidebar] = useState(false);
  const [pacientes, setPacientes] = useState()

    useEffect(()=>{
        const fechData = async()=>{
            try{
              const response = await axios.get('http://192.168.0.114:8081/patients')
              const data = response.data.data
              setPacientes(data)
              console.log(data)
                
            }catch(error){
                console.error("error al llamar a la api", error.message)
            }
        }
        fechData()
    },[])

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
         {pacientes && <Pacientes pacientes={pacientes} />}
        </motion.div>
    </div>
    
    </>
  )
}

export default Pages3