import { useState } from 'react'
import './App.css'
import Cardapio from './pages/Cardapio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Cardapio></Cardapio>
    </>
  )
}

export default App
