import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import {FaHeartbeat} from 'react-icons/fa'
import "../styles/Page2.css";
import CardsMon from "./CardsMon";
import io from 'socket.io-client'

const AgregarPacientes = ({ pacientes, setPacientes, onClick, showCard,onClick2 }) => {

  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [sexo, setSexo] = useState("");
  const [cp, setCp] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
 
  const handleClosed = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false)
    const formData = {
      nombre,
      apellido,
      altura,
      peso,
      ciudad,
      sexo,
      cp,
    };

    setPacientes([...pacientes, formData]);

    setNombre("");
    setApellido("");
    setAltura("");
    setPeso("");
    setCiudad("");
    setSexo("");
    setCp("");
  };

    const [dataHeart, setDataHeart]= useState(null)
    const [dataTemp, setDataTemp] = useState(null)
    
  useEffect(()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SP0R2USEDHqPV7mcIK08ZAs4WtPMQ0NdMHuSD8tnWOw'
    const socket = io('http://192.168.0.90:8000', {
      extraHeaders: {
           Authorization: `Bearer ${token}`
      }
    });


    socket.on('sendFrontHeart', newDataHeart =>{
     const dataParse = JSON.parse(newDataHeart)
     setDataHeart(dataParse)
      
        
    })
    socket.on('sendTempFront', newDataTemp =>{
      const dataParse = JSON.parse(newDataTemp)
      setDataTemp(dataParse)
    })

  },[])


  return (
    <>
      <div className="bg-white rounded-md shadow-md w-2/4 h-3/4">
        <div className="flex justify-between pt-5 pl-5 pr-5">
          <h2 className="text-indigo-900 text-xl font-medium">Monitorear</h2>
          <button
            onClick={handleOpen}
            className="bg-green-500  hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
          >
            Agregar Paciente
          </button>
        </div>
        {open && (
          <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white rounded-md relative w-3/6 h-4/5 ">
              <div className="flex w-full justify-between items-center pl-10 text-indigo-900 font-medium text-lg h-10">
                <h2>Agregar Datos</h2>
                <button
                  onClick={handleClosed}
                  className="absolute text-red-600 right-10 "
                >
                  <FaWindowClose size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="w-full flex  items-center flex-col justify-center pt-5">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  
                    >
                      Primer Nombre
                    </label>
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Patrick"
                    />
                    <p className="text-red-500 text-xs italic">
                      No dejes espacios en blanco.
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                      >
                      Apellido
                    </label>
                    <input
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="Jane"
                    />
                  </div>
                </div>
                <div className="flex w-full justify-center flex-wrap flex-row -mx-3 mb-6">
                  <div className="w-1/4 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   >
                      Altura
                    </label>
                    <input
                      value={altura}
                      onChange={(e) => setAltura(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="number"
                      placeholder="1.80"
                    />
                    <p className="text-gray-600 text-xs italic">
                      No te agregues centimetros.
                    </p>
                  </div>
                  <div className="w-1/4 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                     >
                      Peso
                    </label>
                    <input
                      value={peso}
                      onChange={(e) => setPeso(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="number"
                      placeholder="80"
                    />
                    <p className="text-gray-600 text-xs italic">
                      No te quites peso
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap px-5 -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                             >
                      Ciudad
                    </label>
                    <input
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Tuxtla-GTZ"
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                >
                      Sexo
                    </label>
                    <div className="relative">
                      <select
                      value={sexo}
                      onChange={(e) => setSexo(e.target.value)}
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                      >
                       
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>
                        <option value="prefiero no decirlo">Prefiero no decirlo</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                      CP
                    </label>
                    <input
                    value={cp}
                    onChange={(e) => setCp(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="number"
                      placeholder="90210"
                    />
                  </div>
                  <div className="w-full h-32 flex items-center justify-center">
                    <button type="submit" className="bg-blue-500  hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      <div className="w-full h-full flex flex-col items-center pb-10">
        <CardsMon/>
        <button onClick={onClick} className="h-10 rounded border-b-4 font-medium text-white text-xl shadow-lg hover:border-indigo-500 hover:bg-indigo-400 border-indigo-700 bg-indigo-500 w-32">Monitorear</button>
        {showCard && (
          <div className="w-full flex justify-center items-center h-full absolute top-0 left-0 bg-black bg-opacity-80">
              <div>
              <button
                  onClick={onClick2}
                  className="absolute text-red-600 right-10 top-10 z-10 "
                >
                  <FaWindowClose size={20} />
                </button>
              </div>
              <div className="w-1/4 max-md:w-2/4 h-4/5 rounded-xl bg-white">
               <div className="h-3/4 w-full p-5">
                <h2 className="text-lg text-indigo-900 font-medium ">Datos del corazon</h2>
                  <div className="w-full h-2/4 flex items-center justify-center">
                    <div className="text-red-600">
                <FaHeartbeat size={80}/>
                    </div>
                  </div>
                  <div className="w-full gap-2 flex-col h-2/4 flex justify-center items-center text-xl font-medium">
                   {dataHeart !== null && (
                      <>
                     
                     <h2>{dataHeart.bpm} BPM</h2>
                     <h2>{dataHeart.spo2} oxigenacion</h2>
                      </>
                    )
                   }
                  </div>
               </div>
               <div className="w-auto h-1/4 pb-5 flex justify-center items-end border-t border-gray-500">
                <button className="bg-green-500  hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" >Siguiente</button>
               </div>
              </div>
          </div>
        )}
      </div>
      </div>

    </>
  );
};

export default AgregarPacientes;
