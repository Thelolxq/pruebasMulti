import React from "react";
const Pacientes = ({ pacientes }) => {

  return (
    <>
      <div className="w-11/12 h-80  overflow-y-auto shadow-md  p-5 rounded-xl bg-white">
        <div className="h-20">
          <h2 className=" text-xl font-medium text-indigo-900">
            Pacientes
          </h2>
        </div>
        <table className="w-full text-start ">
          <thead className="h-10">
            <tr>
              <th className="text-start">Nombre</th>
              <th className="text-start">Apellido</th>
              <th className="text-start">Edad</th>
              <th className="text-start">Sexo</th>
              <th className="text-start">Altura</th>
              <th className="text-start">Peso</th>
              <th className="text-start">Ciudad</th>
              <th className="text-start">CP</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente, index) => (
              <tr className="h-10 border-b " key={index}>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td>{paciente.edad}</td>
                <td>{paciente.sexo}</td>
                <td>{paciente.altura}</td>
                <td>{paciente.peso}</td>
                <td>{paciente.ciudad}</td>
                <td>{paciente.cp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Pacientes;
