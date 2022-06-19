import React, { useState, createContext } from 'react';
export const ProdutoContext = createContext({});

function EnviaProduto({ children }) {
  const [produto, setProduto] = useState('');

  function editaProduto(
    inputId,
    inputNome,
    inputPreco,
    inputQtd
  ) {
    setProduto({
      id: inputId,
      nome: inputNome,
      preco: inputPreco,
      quantidade: inputQtd
    });
    return produto;
  }

  return (
    <ProdutoContext.Provider value={{ produto, editaProduto }}>
      {children}
    </ProdutoContext.Provider>
  );
}
export default EnviaProduto;