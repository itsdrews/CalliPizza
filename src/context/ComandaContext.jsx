import { createContext } from "react";
import { useContext,useState,useEffect } from "react";
import { toast } from "react-toastify"; 
import { useCozinha } from "./CozinhaContext";

const LOCAL_STORAGE_KEY = 'comanda';
const PEDIDOS_STORAGE_KEY = 'pedidos';
export const ComandaContext = createContext();
export const ComandaProvider = ({children}) =>{
const {cozinha,adicionarComanda} = useCozinha();
const [comanda,setComanda]= useState(() => {
  const saved  = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved? JSON.parse(saved): {
    id: "",
    mesa: "",
    endereco:"",
    pedido: [],
    funcionario:"",
    entregue:false,
    pronto:false,
    valorTotal: 0
  }

})

const gerarIdIncremental = () => {
  const CHAVE_CONTADOR = 'ultimoIdPedido';
  
  let ultimoId = Number(localStorage.getItem(CHAVE_CONTADOR)) || 0;

  ultimoId++;

  localStorage.setItem(CHAVE_CONTADOR, ultimoId.toString());
  
  return ultimoId;
};
const limparPedidos = () =>{
  localStorage.setItem(PEDIDOS_STORAGE_KEY,JSON.stringify([]))
  
}


const confirmarMandarParaCozinha = (pedidos,mesa,endereco,valor) => {
  pedidos.length >0?
  (mesa !=='' || endereco !== '')?
  (toast.warn(
    <div>
      <p>Tem certeza que deseja mandar para cozinha?</p>
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => {
            mandarParaCozinha(pedidos,mesa,endereco,valor);
            toast.dismiss();
            toast.success('Comanda encaminhada com sucesso!');
          }}
          style={{
            padding: '5px 10px',
            background: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Confirmar
        </button>
        <button 
          onClick={() => toast.dismiss()}
          style={{
            padding: '5px 10px',
            background: '#ccc',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancelar
        </button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: false,
      closeButton: false,
      draggable: false,
      closeOnClick: false,
    }
  )):toast.error("Preencha Endereço ou Mesa!"): toast.error("Não há itens na comanda!");
};
const mandarParaCozinha = (pedidos,mesa,endereco,valor) => {
  const novoId = gerarIdIncremental(); 
  const func  = JSON.parse(localStorage.getItem('usuario')) 
  const novaComanda = 
    {
    id:novoId,
    mesa:mesa,
    endereco:endereco,
    pronto:false,
    entregue:false,
    pedidos:pedidos,
    valor:valor,
    funcionario: func.nome ||" "
  }   
  
  setComanda(novaComanda) 
  adicionarComanda(novaComanda)
  limparPedidos();
  setTimeout(() => {
  location.reload(); 
}, 3000);     
}

 useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(comanda));
  }, [comanda]);
return(
  <ComandaContext.Provider
  value={{
    comanda,
    setComanda,
    confirmarMandarParaCozinha,
  }
  }
  >{children}
  </ComandaContext.Provider>

)
};
export const useComanda = () => {
  const context = useContext(ComandaContext);
  if (!context) {
    throw new Error('usePedidos deve ser usado dentro de um PedidosProvider');
  }
  return context;
};



