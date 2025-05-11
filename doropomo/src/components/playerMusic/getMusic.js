import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-audio"; // Substitua por expo-audio

const PlayerMusic = () => {
  const [sound, setSound] = useState(null); // Estado para armazenar a instância do som
  const [fileUri, setFileUri] = useState(null); // Estado para armazenar o URI do arquivo selecionado

  const selectAudioFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*", // Permite selecionar apenas arquivos de áudio
      });

      console.log("Resultado do DocumentPicker:", result);

      if (result.type === "success" && result.uri) {
        setFileUri(result.uri); // Armazena o URI do arquivo selecionado
        console.log("Arquivo selecionado com sucesso:", result.uri);
        Alert.alert("Arquivo Selecionado", `URI: ${result.uri}`);
      } else {
        console.log("Nenhum arquivo foi selecionado ou URI inválido.");
        Alert.alert("Erro", "Nenhum arquivo foi selecionado ou URI inválido.");
      }
    } catch (error) {
      console.error("Erro ao selecionar arquivo:", error);
      Alert.alert("Erro", "Ocorreu um erro ao selecionar o arquivo.");
    }
  };

  const playAudio = async () => {
    try {
      if (!fileUri) {
        console.log("Nenhum arquivo selecionado.");
        Alert.alert("Erro", "Nenhum arquivo foi selecionado.");
        return;
      }

      console.log("Tentando reproduzir o arquivo:", fileUri);

      // Configura e reproduz o áudio
      const newSound = new Audio.Sound();
      await newSound.loadAsync({ uri: fileUri }, { shouldPlay: true });
      setSound(newSound); // Armazena a instância do som no estado

      console.log("Reproduzindo áudio...");
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
      Alert.alert("Erro", "Não foi possível reproduzir o áudio.");
    }
  };

  const pauseAudio = async () => {
    try {
      if (sound) {
        await sound.pauseAsync(); // Pausa o áudio usando a instância armazenada
        console.log("Áudio pausado.");
      }
    } catch (error) {
      console.error("Erro ao pausar áudio:", error);
    }
  };

  useEffect(() => {
    // Limpar o áudio ao desmontar o componente
    return () => {
      if (sound) {
        sound.unloadAsync(); // Descarrega o áudio para liberar recursos
      }
    };
  }, [sound]);

  return (
    <View>
      <Text>Player Music</Text>
      <Button title="Selecionar Música" onPress={selectAudioFile} />
      <Button title="Reproduzir Áudio" onPress={playAudio} />
      <Button title="Pausar Áudio" onPress={pauseAudio} />
    </View>
  );
};

export default PlayerMusic;
