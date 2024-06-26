import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaHeartbeat } from 'react-icons/fa';
import "../styles/Page2.css";
import CardsMon from "./CardsMon";
import io from 'socket.io-client';
import axios from "axios";
import { FaTemperatureHigh } from "react-icons/fa";
import { motion } from "framer-motion";
import { data } from "autoprefixer";


const AgregarPacientes = ({ pacientes, setPacientes, onClick, showCard, onClick2 }) => {
  const [error, setError] = useState("")
  const [next, setNext] = useState(false);
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [curp, setCurp] = useState('');
  const [edad, setEdad] = useState('');
  const [imc, setImc] = useState('');
  const [dataHeart, setDataHeart] = useState(null);
  const [dataTemp, setDataTemp] = useState(null)

  const [corazon, setCorazon] = useState(0)
  const [oximetro, setoxi] = useState(0)
  const [temperatura, setTemp] = useState(0)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClosed = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setNext(true);
    setActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);

    const formData = {
      name,
      last_name,
      height,
      weight,
      curp,
      gender,
      edad,
      imc
    };

    try {
      // Enviar los datos al servidor utilizando axios
      const response = await axios.post("http://3.209.232.158:8081/patients", formData);
      console.log("datos guardados:", response.data);

      // Actualizar el estado de pacientes con los nuevos datos
      setPacientes([...pacientes, response.data]);

      // Reiniciar los campos del formulario después de enviar los datos
      setName("");
      setLast_name("");
      setHeight("");
      setWeight("");
      setCurp("");
      setGender("");
      setEdad("");
      setImc("");
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setError("error al guardar los datos")
    }
  };

  useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyam9obi5kb2VAZXhhbXBsZS5jb20iLCJ1c2VySWQiOjQsImlhdCI6MTcxMzM0MjEyMSwiZXhwIjo1MzEzMzQyMTIxfQ.z0sEOUUU_tPMzhVkm6o27vOU-PdY-buE1rkDg7UYQc0';
    const socket = io('http://44.194.186.129', {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });


        socket.on('sendFrontHeart', (newDataHeart) => {
          const dataParse = JSON.parse(newDataHeart);
          setDataHeart(dataParse.message);
          console.log("datos creado",dataParse);
          setCorazon(dataParse.message.bpm)
          setoxi(dataParse.message.spo2)
          
        });
        
        socket.on('sendTempFront', (newDataTemp) =>{
            const dataParse = JSON.parse(newDataTemp)
            setDataTemp(dataParse.message)
            setTemp(dataParse.message.temperaturaCelsius)

        })



    

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEnviar = async () => {
    try {
      // Verificar que los datos biométricos no sean nulos
      if (dataHeart === null || dataTemp === null) {
        console.error('No se pueden enviar datos biométricos incompletos');
        return;
      }
      const ultimoPacienteJSON =JSON.parse( localStorage.getItem("id"));
      console.log(ultimoPacienteJSON)

      const data={
        "heartbeat":corazon,
        "oximeter":oximetro, 
        "temperature":temperatura,
        "id_patient":(ultimoPacienteJSON.id)


      }
      
      console.log(dataHeart)
      const response = await axios.post('http://3.209.232.158:8081/BiometricData', data);
  
      console.log('Datos biométricos enviados:', response.data);
    } catch (error) {
      console.error('Error al enviar datos biométricos:', error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-md shadow-md w-2/4 h-3/4">
        <div className="flex justify-between pt-5 pl-5 pr-5">
          <h2 className="text-indigo-900 text-xl font-medium">Monitorear</h2>
          <button
            onClick={handleOpen}
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
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
              <form onSubmit={handleSubmit} className="w-full flex items-center flex-col justify-center pt-5">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Primer Nombre
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Apellido
                    </label>
                    <input
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="Jane"
                    />
                  </div>
                </div>
                <div className="flex w-full justify-center flex-wrap flex-row -mx-3 mb-6">
                  <div className="w-1/4 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Altura
                    </label>
                    <input
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
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
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Peso
                    </label>
                    <input
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
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
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Curp
                    </label>
                    <input
                      value={curp}
                      onChange={(e) => setCurp(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="COASD1231231SD"
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Sexo
                    </label>
                    <div className="relative">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
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
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      IMC
                    </label>
                    <input
                      value={imc}
                      onChange={(e) => setImc(e.target.value)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="number"
                      placeholder="90210"
                    />
                  </div>
                  <div className="w-full h-32 flex items-center justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                      Enviar
                    </button>
                    {error && <p>error al guardar lo datos</p>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="w-full h-full flex flex-col items-center pb-10">
          <CardsMon />
          <button onClick={onClick} className="h-10 rounded border-b-4 font-medium text-white text-xl shadow-lg hover:border-indigo-500 hover:bg-indigo-400 border-indigo-700 bg-indigo-500 w-32">Monitorear</button>
          {showCard && (
            <div className="w-full flex justify-center items-center overflow-hidden h-full absolute top-0 left-0 bg-black bg-opacity-80">
              <div>
                <button
                  onClick={onClick2}
                  className="absolute text-red-600 right-10 top-10 z-10 "
                >
                  <FaWindowClose size={20} />
                </button>
              </div>
              {active && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-1/4 max-md:w-2/4 h-4/5 rounded-xl bg-white"
                >
                  <div className="h-3/4 w-full p-5">
                    <h2 className="text-lg text-indigo-900 font-medium ">Datos del corazon</h2>
                    <div className="w-full h-2/4 flex items-center justify-center">
                      <div className="text-red-600">
                        <FaHeartbeat size={80} />
                        
                      </div>
                    </div>
                    <div className="w-full gap-2 flex-col h-2/4 flex justify-center items-center text-xl font-medium">
                      {dataHeart !== null && (
                        <>
                      
                          <h2>{dataHeart.bpm} BPM</h2>
                          <h2>{dataHeart.spo2} oxigenacion</h2>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-auto h-1/4 pb-5 flex justify-center items-end border-t border-gray-500">
                    <button
                      onClick={handleNext}
                      className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500"
                    >
                      Siguiente
                    </button>
                  </div>
                </motion.div>
              )}
              {next && (
                <motion.div
                  initial={{scale:0 ,opacity: 0, x: "200%" }}
                  animate={{ scale:1,opacity: 1, x: "0%" }}
                  transition={{ duration: 0.4 }}
                  className="w-1/4 max-md:w-2/4 h-4/5 rounded-xl bg-white"
                >
                  <div className="h-3/4 w-full p-5">
                    <h2 className="text-lg text-indigo-900 font-medium ">Datos de temperatura</h2>
                    <div className="w-full h-2/4 flex items-center justify-center">
                      <div className="text-red-600">
                        <FaTemperatureHigh size={80} />
                      </div>
                    </div>
                    <div className="w-full gap-2 flex-col h-2/4 flex justify-center items-center text-xl font-medium">
                      {dataTemp !== null && (
                        <>
                          <h2>{dataTemp.temperaturaCelsius} grados centigrados</h2>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-auto h-1/4 pb-5 flex justify-center items-end border-t border-gray-500">
                    <button 
                    onClick={handleEnviar}
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500">
                      Enviar
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AgregarPacientes;
