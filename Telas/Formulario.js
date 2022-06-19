import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ProdutoContext } from '../Componentes/EnviaProduto';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

export default function Formulario() {
  const navigation = useNavigation();
  const { produto } = useContext(ProdutoContext);
  const db = SQLite.openDatabase('db.MainDB');

  const [id, setId] = useState('');
  const [inputNome, setNome] = useState('');
  const [inputPreco, setPreco] = useState('');
  const [inputQtd, setQtd] = useState('');

  useEffect(() => {
    setId(produto.id);
    if (produto.id != '') {
      let preco = produto.preco.toString();
      let qtd = produto.quantidade.toString();
      setNome(produto.nome);
      setPreco(preco);
      setQtd(qtd);
    } else {
      setNome('');
      setPreco('');
      setQtd('');
    }
  }, []);

  const setData = async () => {
    if (inputNome == '') {
      Alert.alert(
        'ERRO AO CADASTRAR',
        'Todos os campos precisam ser preenchidos'
      );
    } else {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          'INSERT INTO PRODUTO (NOME, PRECO, QUANTIDADE) VALUES (?,?,?)',
          [inputNome, inputPreco, inputQtd],
          (tx, results) => {
            console.log('Resultado', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('PARABÉNS', 'Cadastro realizado com sucesso');
            } else Alert.alert('ERRO DE CADASTRO', 'Ops, ocorreu um erro.');
          }
        );
      });
      navigation.navigate('Home');
    }
  };

  const deleteData = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM PRODUTO WHERE ID=?', [id], (tx, results) => {
        console.log('Resultado: ', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert('CADASTRO APAGADO', 'Cadastro apagado com sucesso.');
          navigation.navigate('Home');
        } else Alert.alert('ERRO AO APAGAR', 'Ops, ocorreu um erro.');
      });
    });
  };

  const updateData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE PRODUTO SET NOME=?, PRECO=?, QUANTIDADE=? WHERE ID=?',
        [inputNome, Number(inputPreco), Number(inputQtd), id],
        (tx, results) => {
          console.log('Resultado: ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert('CADASTRO EDITADO', 'Cadastro editado com sucesso.');
            navigation.navigate('Home');
          } else Alert.alert('ERRO AO EDITAR', 'Ops, ocorreu um erro.');
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.entrada}
          placeholder="Descrição"
          value={inputNome}
          onChangeText={(text) => setNome(text)}
        />

        <TextInput
          style={styles.entrada}
          placeholder="Preço"
          value={inputPreco}
          onChangeText={(num) => setPreco(num)}
        />

        <TextInput
          style={styles.entrada}
          placeholder="Quantidade"
          value={inputQtd}
          onChangeText={(num) => setQtd(num)}
        />

        {id == '' ? (
          <TouchableOpacity style={styles.botao} onPress={setData}>
            <Text style={styles.textoBotao}>Novo Produto</Text>
          </TouchableOpacity>
        ) : null}

        {id != '' ? (
          <TouchableOpacity style={styles.botao} onPress={updateData}>
            <Text style={styles.textoBotao}>Editar Produto</Text>
          </TouchableOpacity>
        ) : null}

        {id != '' ? (
          <TouchableOpacity style={styles.botao} onPress={deleteData}>
            <Text style={styles.textoBotao}>Apagar Produto</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 30,
  },
  inputContainer: {
    width: 300,
  },
  entrada: {
    textAlign: 'center',
    borderWidth: 2,
    marginBottom: 3,
    fontSize: 20,
  },
  botao: {
    alignItems: 'center',
    backgroundColor: '#FFA500',
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 20,
    fontSize: 20,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});