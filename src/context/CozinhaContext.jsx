
import { createContext, useContext, useState, useEffect } from 'react'; 
export const CozinhaContext = createContext();
export const CozinhaProvider = ({ children }) => {
  const [cozinha,setCozinha] = useState(() => {
    // Recupera do localStorage se existir
    const salvo = localStorage.getItem('comandasCozinha');
    return salvo ? JSON.parse(salvo) : [];
  });

  // Persiste no localStorage quando muda
  useEffect(() => {
    localStorage.setItem('comandasCozinha', JSON.stringify(cozinha));
  }, [cozinha]);

  const adicionarComanda = (novaComanda) => {
    setCozinha(prev => [
      ...prev,
      {
        ...novaComanda,
        status: 'pendente'
      }
    ]);
  };


  const atualizarStatusComanda = (comandaId) => {
    setCozinha(prev =>
      prev.map(comanda =>
        comanda.id === comandaId ? { ...comanda, pronto: !comanda.pronto } : comanda
      )
    );
  };

  return (
    <CozinhaContext.Provider
      value={{
        cozinha,
        adicionarComanda,
        atualizarStatusComanda,
      }}
    >
      {children}
    </CozinhaContext.Provider>
  );
};

export const useCozinha = () => {
  const context = useContext(CozinhaContext);
  if (!context) {
    throw new Error('useCozinha deve ser usado dentro de um CozinhaProvider');
  }
  return context;
};