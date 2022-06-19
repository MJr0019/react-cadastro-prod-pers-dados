import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navegacao from './Componentes/Navegacao';
import EnviaProduto from './Componentes/EnviaProduto';

export default function App() {
   return (
    <NavigationContainer>
      <EnviaProduto>
        <Navegacao/>
      </EnviaProduto>
    </NavigationContainer>
  );
}