import React, { useState } from "react";
const Pacientes = ({ pacientes }) => {

  const [selectedPatient, setSelectedPatient] = useState(null);
  

  const toggleDetails = (index) => {
    setSelectedPatient((prevSelected) =>
        prevSelected === pacientes[index] ? null : pacientes[index]
        )
  };
  return (
    <>
    <div className="w-11/12  rounded-xl shadow-md bg-white flex gap-1 h-5/6 ">

      <div className=" h-full w-3/4 shadow-md  p-5 rounded-md bg-white">
        <div className="h-10">
          <h2 className="text-xl font-medium text-indigo-900">
            Pacientes
          </h2>
        </div>
        <table className="w-full h-5/6 text-start">
          <thead className="h-10">
            <tr>
              <th className="text-start">Nombre</th>
            </tr>
          </thead>
          <tbody className="w-full h-full">
            <div className="overflow-y-auto w-full h-full">
            {pacientes.map((paciente, index) => (
                  <button
                    className="w-full flex items-center  h-12 text-left"
                    onClick={() => toggleDetails(index)}
                  >
              <tr className={` rounded-xl w-full h-full pl-2 border-b border-gray-300 flex items-center hover:shadow-xl  hover:translate-y-1 duration-300 ${selectedPatient === paciente ? "bg-indigo-900 translate-y-1 text-white shadow-xl" : ""}`} key={index}>
                <td>
                    {paciente.nombre}
                </td>
              </tr>
                  </button>
            ))}
            </div>
          </tbody>
        </table>
      </div>
      <div className="w-1/4 bg-indigo-500 rounded-xl shadow-xl h-full">
      {selectedPatient && (
        <div className=" flex w-full text-sm text-white  flex-col border-b gap-1 h-full p-5">
          <h2 className="font-medium text-indigo-900  text-xl">Detalles del Paciente:</h2>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-600 border-b rounded-xl p-1 duration-300">Nombre: {selectedPatient.nombre}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-600 border-b rounded-xl p-1 duration-300">Apellido: {selectedPatient.apellido}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-600 border-b rounded-xl p-1 duration-300">Edad: {selectedPatient.edad}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-600 border-b rounded-xl p-1 duration-300">Sexo: {selectedPatient.sexo}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-600 border-b rounded-xl p-1 duration-300">Altura: {selectedPatient.altura}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-600 border-b rounded-xl p-1 duration-300">Peso: {selectedPatient.peso}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-600 border-b rounded-xl p-1 duration-300">Ciudad: {selectedPatient.ciudad}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-600 border-b rounded-xl p-1 duration-300">CP: {selectedPatient.cp}</p>
          <div className="flex justify-evenly  gap-2 h-full items-center"> 
          <button className="cursor-pointer hover:scale-105 duration-300 w-32 h-10 rounded-xl bg-yellow-600 shadow-xl">editar</button>
          <button className="cursor-pointer hover:scale-105 duration-300 w-32 h-10 rounded-xl bg-red-600 shadow-xl">eliminar</button>
          </div>
        </div>
      )}
      </div>
      </div>
    </>
  );
};

export default Pacientes;
