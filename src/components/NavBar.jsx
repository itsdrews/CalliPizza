
import Cardapio from '../pages/Cardapio'
import Entregas from '../pages/Entregas'
import Carrinho from '../pages/Carrinho'
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
        to="/entregas"
        end
        className={({isActive}) => isActive? 'nav-link active':'nav-link'
      }>
        Entregas
      </NavLink>

      </li>
       <li className='nav-item'>
        <NavLink
        to="/carrinho"
        end
        className={({isActive}) => isActive? 'nav-link active':'nav-link'
      }>
        Carrinho
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

    </ul>
   
   </nav>
  )
}

export default NavBar
