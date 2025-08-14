import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PizzaCard from '../components/PizzaCard'
import {useState,useEffect,useMemo,useRef} from 'react'
const Comanda = () => {
    
  const comandas = [{

      mesa:1,
      endereco: null,
      pronto,
      entregue,
      pedido:[{
    id: 1,
    nome: "Margherita",
    tamanho: "Grande",
    descricao: "A clássica pizza italiana com ingredientes frescos",
    ingredientes: ["Molho de tomate", "Mussarela premium", "Manjericão fresco", "Azeite de oliva"],
    valor: 43,
    quantidade: 1
  },
    {
    id: 2,
    nome: "Calabresa",
    tamanho: "Média",
    descricao: "A clássica pizza italiana com ingredientes frescos",
    ingredientes: ["Molho de tomate", "Mussarela premium", "Manjericão fresco", "Azeite de oliva"],
    valor: 50,
    quantidade: 3
  },
    {
    id: 3,
    nome: "Frango com Catupiry",
    tamanho: "Família",
    descricao: "A clássica pizza italiana com ingredientes frescos",
    ingredientes: ["Molho de tomate", "Mussarela premium", "Manjericão fresco", "Azeite de oliva"],
    valor: 65,
    quantidade: 4
  }
  
]
},
{

      mesa:2,
      endereco: null,
      pedido:[
    {
    id: 1,
    nome: "Calabresa",
    tamanho: "Média",
    descricao: "A clássica pizza italiana com ingredientes frescos",
    ingredientes: ["Molho de tomate", "Mussarela premium", "Manjericão fresco", "Azeite de oliva"],
    valor: 50,
    quantidade: 3
  },
    
  
]
}
]


 const [inputValue, setInputValue] = useState('');
  const [numeroBusca, setNumeroBusca] = useState('');
  const [mesaSelecionada, setMesaSelecionada] = useState(null);
  const prevMesaRef = useRef();

  // Memoriza comandas
  const comandasMemoizadas = useMemo(() => comandas, []);

  // Debounce no input de busca
  useEffect(() => {
    const handler = setTimeout(() => {
      setNumeroBusca(inputValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  // Efeito de busca corrigido
  useEffect(() => {
    if (!numeroBusca) {
      if (mesaSelecionada !== null) {
        setMesaSelecionada(null);
      }
      return;
    }

    const numero = parseInt(numeroBusca);
    if (isNaN(numero)) return;

    const mesaEncontrada = comandasMemoizadas.find(c => c.mesa === numero);
    
    // Só atualiza se o resultado for diferente do anterior
    if (JSON.stringify(mesaEncontrada) !== JSON.stringify(prevMesaRef.current)) {
      setMesaSelecionada(mesaEncontrada || null);
      prevMesaRef.current = mesaEncontrada;
    }
  }, [numeroBusca, comandasMemoizadas, mesaSelecionada]);

  const handleBuscaChange = (e) => {
    if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const pedidos = mesaSelecionada ? mesaSelecionada.pedido : [];

  const calcularTotal = (pedidos) =>{

    const total = pedidos.reduce(
      (total,item) => total + (item.valor * item.quantidade),0
    );
  
  return total

  }



  

  return (
    <>
    <Header></Header>
    <div className="cardapio-container">
      <div className="pizzas-grid">
        {pedidos.length!=0 ? pedidos.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} cardMode={"comanda"}/>
        )): <h1 className='comanda-not-found'>
          Comanda não encontrada!
        </h1>}
      </div>
      <div className="delivery-type-container">
        <div className="table">
          <h2>Mesa</h2>
          <p>Número da mesa</p>
          <div className="busca-mesa">

            <input 
            className='mesa-comanda'
              type ="text"
              value={inputValue}
              onChange={handleBuscaChange}
              placeholder='mesa'
              inputMode='numeric'
            />
          </div>
        </div>
        <div className="delivery-separator"></div>
        <div className="delivery">
          <h2>Entrega</h2>
          <p>Endereço</p>
          <input className='address-input-container' type='text' placeholder='Digite o endereço de entrega'/>
         
        </div>
      </div>
      <div className="total-submit">

      <p className='total'>Total: R$ {calcularTotal(pedidos)}</p>
      <button>ENVIAR PARA A COZINHA</button>
      </div>
    </div>
    <Footer></Footer>

    </>
   
  )
}

export default Comanda
