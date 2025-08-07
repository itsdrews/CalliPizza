import React from 'react'
import NavBar from './NavBar'

const Header = () => {
  return (
    <header className='header'>
      <div className="logo-name-container">

      <img className='logo'  alt='logo-pizza-piece' src='/pizza-piece.svg'/>
      <h1 className='title'>CALLIPIZZA </h1>
      </div>

      <div className="navigation-bar">
          
          <NavBar></NavBar>

      </div>
      

    </header>
    
  )
}

export default Header
