
import Cardapio from '../pages/Cardapio'
import Comanda from '../pages/Comanda'
import Cozinha from '../pages/Cozinha'

import {Link, NavLink} from 'react-router-dom'

const NavBar = () => {
  return (
   <nav className='navigation-bar' aria-label='Navegação Principal'>

  
       <ul className="navbar-menu">

      <li className='nav-item'>
    
           <NavLink
        to="/"
        end
        className={({isActive}) => isActive? 'nav-link active':'nav-link'
      }>
        Cardápio
      </NavLink>
          
        
       

      </li>
       <li className='nav-item'>
        <NavLink
        to="/comanda"
        end
        className={({isActive}) => isActive? 'nav-link active':'nav-link'
      }>
        Comanda
      </NavLink>

      </li>
       <li className='nav-item'>
        <NavLink
        to="/cozinha"
        end
        className={({isActive}) => isActive? 'nav-link active':'nav-link'
      }>
        Cozinha
      </NavLink>

      </li>
       <li className='nav-item'>
        <NavLink
        to="/entrega"
        end
        className={({isActive}) => isActive? 'nav-link active':'nav-link'
      }>
        Entrega
      </NavLink>

      </li>

    </ul>
   
   </nav>
  )
}

export default NavBar
