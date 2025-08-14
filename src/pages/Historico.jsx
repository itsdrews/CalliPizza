import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Historico = () => {
  return (
     <div className="admin-pizza">
      <Header admin={true}/>
      <h1>Histórico de Pedidos</h1>
      <Footer />
    </div>
  )
}

export default Historico