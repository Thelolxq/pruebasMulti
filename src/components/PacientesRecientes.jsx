import React, { useState } from "react";
const PacientesRecientes = ({ pacientes }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Verificar si pacientes es un array antes de usar slice
  console.log(pacientes)
  const pacientesUltimos = Array.isArray(pacientes) ? pacientes.slice(-5) : [];
  const toggleDetails = (index) => {
    setSelectedPatient((prevSelected) =>
      prevSelected === pacientesUltimos[index] ? null : pacientesUltimos[index]
    );
  };

  return (
    <>
    <div className="w-11/12  rounded-xl shadow-md bg-white flex gap-1 h-full ">

      <div className=" h-80 w-3/4 shadow-md  p-5 rounded-md bg-white">
        <div className="h-20">
          <h2 className="text-xl font-medium text-indigo-900">
            Pacientes Recientes
          </h2>
        </div>
        <table className="w-full h-52 text-start">
          <thead className="h-10">
            <tr>
              <th className="text-start">Nombre</th>
            </tr>
          </thead>
          <tbody className="w-full h-full">
            <div className="overflow-y-auto w-full h-full">
            {pacientesUltimos.map((paciente, index) => (
                  <button
                    className="w-full flex items-center  h-12 text-left"
                    onClick={() => toggleDetails(index)}
                  >
              <tr className={` rounded-xl w-full h-full pl-2 border-b border-gray-300 flex items-center hover:shadow-md  hover:translate-y-1 duration-300 ${selectedPatient === paciente ? "bg-indigo-900 translate-y-1 text-white shadow-xl" : ""}`} key={index}>
                <td>
                    {paciente.name}
                </td>
              </tr>
                  </button>
            ))}
            </div>
          </tbody>
        </table>
      </div>
      <div className="w-1/4 bg-indigo-900 rounded-xl shadow-xl h-full">
      {selectedPatient && (
        <div className=" flex w-full text-sm text-white cursor-pointer flex-col border-b gap-1 h-full p-5">
          <h2 className="font-medium text-white  text-xl">Detalles del Paciente:</h2>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">Nombre: {selectedPatient.name}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">Apellido: {selectedPatient.lastName}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">Edad: {selectedPatient.edad}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">imc: {selectedPatient.imc}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">Curp: {selectedPatient.curp}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">Sexo: {selectedPatient.gender}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">Altura: {selectedPatient.height}</p>
          <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">Peso: {selectedPatient.weight}</p>
        </div>
      )}
      </div>
      </div>
    </>
  );
};

export default PacientesRecientes;
