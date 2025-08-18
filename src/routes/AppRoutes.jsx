import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// Páginas
import Admin from "../pages/Admin";
import Cardapio from "../pages/Cardapio";
import Comanda from "../pages/Comanda";
import Cozinha from "../pages/Cozinha";
import Login from "../pages/Login";
import Entrega from "../pages/Entrega";
import CadastrarPizza from "../pages/CadastrarPizza";
import NotFound from "../pages/NotFound";
import Historico from "../pages/Historico";
import { PedidosProvider } from "../context/PedidosContext";
import { ComandaProvider } from "../context/ComandaContext";
import { CozinhaProvider } from "../context/CozinhaContext";
import { PizzaProvider } from "../context/PizzaContext";

const AppRoutes = () => {
  return (
    <PizzaProvider>
      <CozinhaProvider>
        <ComandaProvider>
          <PedidosProvider>
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
                <Route path="/add-sabor" element={<CadastrarPizza />} />
                <Route path="/edit-sabor/:idpizza" element={<EditHandler />} />
                <Route path="/get-pedidos" element={<Historico />} />
              </Route>
            </Routes>
          </PedidosProvider>
        </ComandaProvider>
      </CozinhaProvider>
    </PizzaProvider>
  );
};

const EditHandler = () => {
  const { idpizza } = useParams();

  return <CadastrarPizza idpizza={idpizza} />;
};

export default AppRoutes;
