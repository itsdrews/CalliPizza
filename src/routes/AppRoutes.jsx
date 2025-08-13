import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// Páginas
import Admin from "../pages/Admin";
import Cardapio from "../pages/Cardapio";
import Comanda from "../pages/Comanda";
import Cozinha from "../pages/Cozinha";
import Login from "../pages/Login";
import Entrega from "../pages/Entrega";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      {/* Rotas Protegidas */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/comanda" element={<Comanda />} />
        <Route path="/cozinha" element={<Cozinha />} />
        <Route path="/entrega" element={<Entrega />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
