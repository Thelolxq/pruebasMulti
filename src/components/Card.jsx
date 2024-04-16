import React from "react";
import { FaHeartbeat } from "react-icons/fa";
const Card = ({ icon, icon2, data, data2, title, title2 }) => {
  return (
    <>
      <div className="shadow-md flex flex-col w-5/12 h-full pr-2 rounded-md pl-2 bg-indigo-900">
        <div className="h-3/4 border-b flex items-center justify-center">
          {icon}
          {icon2}
          {data}
          {data2}
        </div>
        <div className="h-1/4 flex items-center justify-between pl-3 pr-3">
          <h2 className="text-white font-medium text-sm">{title}</h2>
          <h2 className="text-white font-medium text-sm">{title2}</h2>
        </div>
      </div>
    </>
  );
};

export default Card;
