import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
import { IoPersonCircleSharp } from "react-icons/io5";
const Header = ({ onClick }) => {
  return (
    <>
      <div className="w-full bg-white h-16 flex items-center justify-between px-10 border ">
        <div>
          <RiMenu2Fill size={25} className="cursor-pointer" onClick={onClick} />
        </div>
        <div>
          <input
            className="border-gray-400 rounded-md w-60 h-9 pl-2 border outline-none"
            type="text"
            placeholder="Buscar..."
          />
        </div>
        <div className="flex gap-5 w-1/4 h-full justify-end items-center ">
          <IoMdNotifications size={25} />
          <IoPersonCircleSharp size={40}/>
        </div>
      </div>
    </>
  );
};

export default Header;
