import { createContext, useContext, useState, useEffect } from 'react';

const ComandaContext = createContext();

export function ComandaProvider({ children }) {
  const [comandas, setComandas] = useState(() => {
    // Tenta carregar do localStorage ao inicializar
    const saved = localStorage.getItem('comandas');
    return saved ? JSON.parse(saved) : [];
  });

  // Persiste no localStorage sempre que comandas mudar
  useEffect(() => {
    localStorage.setItem('comandas', JSON.stringify(comandas));
  }, [comandas]);

  const addComanda = (novaComanda) => {
    setComandas(prev => [...prev, novaComanda]);
  };

  const updateComanda = (mesa, updatedData) => {
    setComandas(prev => 
      prev.map(comanda => 
        comanda.mesa === mesa ? { ...comanda, ...updatedData } : comanda
      )
    );
  };

  return (
    <ComandaContext.Provider value={{ comandas, addComanda, updateComanda }}>
      {children}
    </ComandaContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useComandas() {
  return useContext(ComandaContext);
}