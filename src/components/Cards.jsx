import React from "react";
import Card from "./Card";
const Cards = ({ icon, icon2, data, data2 }) => {
  return (
    <>
      <div className="w-11/12 h-full flex flex-wrap justify-between">
        <Card title="Monitoreados" title2="200" data={data} icon={icon} />
        <Card title="Pacientes" title2="200" data2={data2} icon2={icon2} />
      </div>
    </>
  );
};

export default Cards;
