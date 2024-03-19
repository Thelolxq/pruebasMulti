import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Page from "../pages/Page";
import Page2 from "../pages/Page2";
import IniciarSesion from "../pages/IniciarSesion";
import Pages3 from "../pages/Pages3";
const AnimatedPages = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<IniciarSesion/>}/>
      <Route path="/inicio" element={<Page />} />
      <Route path="/monitorear" element={<Page2 />} />
      <Route path="/pacientes" element={<Pages3 />} />
    </Routes>
  );
};

export default AnimatedPages;
