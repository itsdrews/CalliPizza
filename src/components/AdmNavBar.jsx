import Cardapio from "../pages/Cardapio";
import Comanda from "../pages/Comanda";
import Cozinha from "../pages/Cozinha";

import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navigation-bar" aria-label="Navegação Principal">
      <ul className="navbar-menu">
        <li className="nav-item">
          <NavLink
            to="/pizza-adm"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Pizzas
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/func-adm"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Funcionários
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/get-pedidos"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Histórico
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
