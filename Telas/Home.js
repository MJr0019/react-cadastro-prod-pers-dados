import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ProdutoContext } from '../Componentes/EnviaProduto';

export default function Home() {
  const { editaProduto } = useContext(ProdutoContext);
  const navigation = useNavigation();

  const db = SQLite.openDatabase('db.MainDB');

  const isFocused = useIsFocused();

  const [produto, setProduto] = useState([]);
  const [empty, setEmpty] = useState([]);

  useEffect(() => {
    getData();
    createTable();
    resetProduto();
  }, [isFocused]);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'PRODUTO ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, NOME TEXT, PRECO NUMERIC, QUANTIDADE NUMERIC);'
      );
    });
  };

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT ID, NOME, PRECO, QUANTIDADE FROM PRODUTO',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setProduto(temp);

          if (results.rows.length >= 1) {
            setEmpty(false);
          } else {
            setEmpty(true);
          }
        }
      );
    });
  };

  const enviaProdutoForm = (id, nome, preco, quantidade) => {
    navigation.navigate('Formulario');
    editaProduto(id, nome, preco, quantidade);
  };

  const resetProduto = () => {
    editaProduto('', '', '', '');
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.lista}
        data={produto}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              enviaProdutoForm(
                item.ID,
                item.NOME,
                item.PRECO,
                item.QUANTIDADE
              )
            }>
            <Text> ID: {item.ID} </Text>
            <Text> DESCRICAO: {item.NOME} </Text>
            <Text> PRECO: {item.PRECO.toFixed(2)} </Text>
            <Text> QUANTIDADE: {item.QUANTIDADE} </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.floatbutton}
        onPress={() => navigation.navigate('Formulario')}>
        <Text style={{ fontSize: 30, color: 'white' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    borderBottomWidth: 2,
    padding: 3,
  },
  floatbutton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 50,
    backgroundColor: '#FFA500',
    borderRadius: 100,
  },
  lista: {
    marginTop: 25,
  },
});

