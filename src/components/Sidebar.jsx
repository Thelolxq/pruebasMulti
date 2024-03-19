import React, { useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { RiUserFollowLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { BiPlusMedical } from "react-icons/bi";
const Sidebar = () => {
  const [selected, setSelected] = useState("Inicio");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/inicio") {
      setSelected("Inicio");
    } else if (path === "/monitorear") {
      setSelected("Seguimiento");
    } else if (path === "/pacientes") {
      setSelected("Pacientes");
    }
}, [location]);

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <>
      <div className="h-full bg-indigo-900 w-60 flex flex-col items-center gap-5">
        <div className="w-full relative flex flex-col gap-10 ">
          <h1 className="text-center pl-4 flex gap-4 relative top-5 font-medium text-white text-xl">
            <BiPlusMedical size={30} /> MedicHealt
          </h1>
          <ul className="flex flex-col pl-2 gap-3 pt-5">
            <Link
              to="/inicio"
              onClick={() => handleSelect("Inicio")}
              className={`cursor-pointer  hover:bg-white hover:text-indigo-900 font-medium gap-5  h-14 items-center flex pl-2 rounded-l-full ${
                selected === "Inicio"
                  ? "bg-white text-indigo-900"
                  : "text-white"
              }`}
            >
              <GoHome size={25} /> DashBoard
            </Link>
            <Link
              to="/monitorear"
              onClick={() => handleSelect("Seguimiento")}
              className={`cursor-pointer hover:bg-white hover:text-indigo-900 font-medium gap-5   h-14 items-center flex pl-2 rounded-l-full ${
                selected === "Seguimiento"
                  ? "bg-white text-indigo-900"
                  : "text-white"
              }`}
            >
              <RiUserFollowLine size={25} /> Monitorear
            </Link>
            <Link
            to="/pacientes"
              onClick={() => handleSelect("Pacientes")}
              className={`cursor-pointer hover:bg-white hover:text-indigo-900 font-medium gap-5  h-14 items-center flex pl-2 rounded-l-full ${
                selected === "Pacientes"
                  ? "bg-white text-indigo-900"
                  : "text-white"
              }`}
            >
              <CgProfile size={25} />
              Pacientes
            </Link>
      
          </ul>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Sidebar;
