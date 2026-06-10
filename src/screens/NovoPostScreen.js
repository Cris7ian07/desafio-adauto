import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import Botao from '../components/Botao';
import { buscarPosts, salvarPosts } from '../storage/devgramStorage';

export default function ComentariosScreen({ route }) {

  const { post } = route.params;

  const [comentario, setComentario] = useState('');

  async function comentar() {

    if (!comentario.trim()) {
      return;
    }

    const posts = await buscarPosts();

    const novosPosts = posts.map(item => {

      if (item.id === post.id) {

        return {
          ...item,
          comentarios: [...item.comentarios, comentario]
        };
      }

      return item;
    });

    await salvarPosts(novosPosts);

    setComentario('');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Comentários</Text>

      <FlatList
        data={post.comentarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.comentario}>{item}</Text>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite um comentário"
        value={comentario}
        onChangeText={setComentario}
      />

      <Botao
        titulo="Comentar"
        onPress={comentar}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#F3F4F6',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#111827',
  },

  comentario: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
});