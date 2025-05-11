import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Audio } from "expo-audio";

const PlayerMusic = () => {
  const [sound, setSound] = useState(null); // Estado para armazenar a instância do som

  const playAudio = async () => {
    try {
      // URL direta para o arquivo de áudio
      const audioUrl =
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

      // Configura e reproduz o áudio
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: audioUrl,
      });
      setSound(newSound); // Armazena a instância do som no estado
      await newSound.playAsync();

      console.log("Reproduzindo áudio...");
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
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
      <Button title="Reproduzir Áudio" onPress={playAudio} />
      <Button title="Pausar Áudio" onPress={pauseAudio} />
    </View>
  );
};

export default PlayerMusic;
