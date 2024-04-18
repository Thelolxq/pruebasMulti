import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaWindowClose } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pacientes = ({ pacientes }) => {
  const [show, setShow] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [curp, setCurp] = useState("");
  const [edad, setEdad] = useState("");
  const [imc, setImc] = useState("");
  const [history, setHistory] = useState([]);

  const toggleDetails = (index) => {
    setSelectedPatient((prevSelected) =>
      prevSelected === pacientes[index] ? null : pacientes[index]
    );
   
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await axios.patch(
        `http://3.209.232.158:8081/patients/${selectedPatient.id}`, // Assuming selectedPatient has an 'id'
        formData
      );

      // Reiniciar los campos del formulario después de enviar los datos
      setName("");
      setLast_name("");
      setHeight("");
      setWeight("");
      setCurp("");
      setGender("");
      setEdad("");
      setImc("");

      // Cerrar el modal después de la actualización
      setShow(false);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  const handleDelete = async (idPaciente) => {
    try {
      await axios.delete(`http://192.168.0.114:8081/patients/${idPaciente}`);
      console.log("eliminado correctamente");
    } catch (error) {
      console.error("No se pudo eliminar", error.message);
    }
  };

  useEffect(() => {
    if (selectedPatient) {
      fetchHistory(selectedPatient.id); // Llama a la función cuando el paciente seleccionado cambia
    }
  }, [selectedPatient])

  const fetchHistory = async (id) => {
    try {
      const response = await axios.get(
        `http://3.209.232.158:8081/history/${id}`
      );
      setHistory(response.data.data.biometricsDataList); // Supongo que el historial está en el campo 'data' de la respuesta
      console.log(response.data.data.biometricsDataList);
    } catch (error) {
      console.error("Error al obtener el historial:", error);
    }
  };

  const calculateAverages = () => {
    const averages = {
      oximeter: 0,
      heartbeat: 0,
      temperature: 0
    };

    // Suma de cada propiedad en el historial
    history.forEach((item) => {
      averages.oximeter += item.oximeter;
      averages.heartbeat += item.heartbeat;
      averages.temperature += item.temperature;
    });

    // Dividir la suma de cada propiedad por la cantidad de elementos en el historial
    const count = history.length > 0 ? history.length : 1; // Evitar división por cero
    averages.oximeter /= count;
    averages.heartbeat /= count;
    averages.temperature /= count;

    const temperatureThreshold = 37.5; // Umbral de temperatura baja
    if (averages.temperature < temperatureThreshold) {
      toast.error("¡Alerta! Temperatura baja detectada.");
    }

    return averages;
  };

  return (
    <>
      <div className="w-11/12 rounded-xl shadow-md bg-white flex gap-1 h-5/6">
        <div className="h-full w-3/4 shadow-md p-5 rounded-md bg-white">
          <div className="h-10">
            <h2 className="text-xl font-medium text-indigo-900">Pacientes</h2>
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
                    className="w-full flex items-center h-12 text-left"
                    onClick={() => toggleDetails(index)}
                    key={index}
                  >
                    <tr
                      className={`rounded-xl w-full h-full pl-2 border-b border-gray-300 flex items-center hover:shadow-xl hover:translate-y-1 duration-300 ${
                        selectedPatient === paciente
                          ? "bg-indigo-900 translate-y-1 text-white shadow-xl"
                          : ""
                      }`}
                    >
                      <td>{paciente.name}</td>
                    </tr>
                  </button>
                ))}
              </div>
            </tbody>
          </table>
        </div>
        <div className="w-1/4 bg-indigo-900 rounded-xl shadow-xl h-full">
          {selectedPatient && (
            <div className="flex w-full text-sm text-white flex-col border-b gap-1 h-full p-5">
              <h2 className="font-medium text-white text-xl">
                Detalles del Paciente:
              </h2>
              <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">
                Nombre: {selectedPatient.name}
              </p>
              <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">
                Apellido: {selectedPatient.lastName}
              </p>
              <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">
                Edad: {selectedPatient.edad}
              </p>
              <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">
                imc: {selectedPatient.imc}
              </p>
              <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">
                Curp: {selectedPatient.curp}
              </p>
              <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">
                Sexo: {selectedPatient.gender}
              </p>
              <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">
                Altura: {selectedPatient.height}
              </p>
              <p className="hover:translate-y-1 shadow-xl hover:bg-indigo-700 border-indigo-900 border-b rounded-xl p-1 duration-300">
                Peso: {selectedPatient.weight}
              </p>
              <div className="text-white mt-2">
                <h3 className="text-lg font-medium">Historial:</h3>
                {history.length > 0 ? (
                  <ul>
                    {Object.entries(calculateAverages()).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key}: {value.toFixed(2)}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>No hay historial disponible para calcular promedios.</p>
                )}
              </div>
              <div className="flex justify-evenly gap-2 h-full items-center">
                <button
                  onClick={handleOpen}
                  className="cursor-pointer hover:scale-105 duration-300 w-32 h-10 rounded-xl bg-yellow-600 shadow-xl"
                >
                  editar
                </button>
                <button
                  onClick={handleDelete}
                  className="cursor-pointer hover:scale-105 duration-300 w-32 h-10 rounded-xl bg-red-600 shadow-xl"
                >
                  eliminar
                </button>
              </div>
            </div>
          )}
          {show && (
            <>
              <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-80">
                <div className="bg-white rounded-md relative w-3/6 h-4/5">
                  <div className="flex w-full justify-between items-center pl-10 text-indigo-900 font-medium text-lg h-10">
                    <h2>Agregar Datos</h2>
                    <button
                      onClick={handleClose}
                      className="absolute text-red-600 right-10"
                    >
                      <FaWindowClose size={20} />
                    </button>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex items-center flex-col justify-center pt-5"
                  >
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
                        <p className="text-gray-600 text-xs italic">
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
                          placeholder="COAA2342123HCSRRBA1"
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
                            <option value="prefiero no decirlo">
                              Prefiero no decirlo
                            </option>
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
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Pacientes;
