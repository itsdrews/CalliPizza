import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// Páginas
import PizzaAdmin from "../pages/PizzaAdmin";
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
import FuncAdmin from "../pages/FuncAdmin";
import CadastrarFuncionario from "../pages/CadastrarFuncionario";
import { FuncionarioProvider } from "../context/FuncionarioContext";

const AppRoutes = () => {
  return (
    <FuncionarioProvider>
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
                  <Route path="/pizza-adm" element={<PizzaAdmin />} />
                  <Route path="/add-sabor" element={<CadastrarPizza />} />
                  <Route
                    path="/edit-sabor/:idpizza"
                    element={<PizzaEditHandler />}
                  />
                  <Route path="/func-adm" element={<FuncAdmin />} />
                  <Route path="/add-func" element={<CadastrarFuncionario />} />
                  <Route
                    path="/edit-func/:idfunc"
                    element={<FuncEditHandler />}
                  />
                  <Route path="/get-pedidos" element={<Historico />} />
                </Route>
              </Routes>
            </PedidosProvider>
          </ComandaProvider>
        </CozinhaProvider>
      </PizzaProvider>
    </FuncionarioProvider>
  );
};

const PizzaEditHandler = () => {
  const { idpizza } = useParams();

  return <CadastrarPizza idpizza={idpizza} />;
};

const FuncEditHandler = () => {
  const { idfunc } = useParams();

  return <CadastrarFuncionario idfunc={idfunc} />;
};

export default AppRoutes;
