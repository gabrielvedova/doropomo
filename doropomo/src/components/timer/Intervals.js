import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Stopwatch from "./Stopwatch";

export default ({
  totalCycles = 1,
  cycleTime = 4,
  study = 1500,
  shortBreak = 300,
  longBreak = 900,
  isRunning,
}) => {
  const totalIntervals = Math.floor(cycleTime * 2 * totalCycles); // Total de intervalos de estudo e pausa

  const [currentInterval, setCurrentInterval] = useState(0); // Controle do intervalo atual
  const [currentType, setCurrentType] = useState("study"); // Tipo atual (estudo ou pausa)
  const [timerDuration, setTimerDuration] = useState(study); // Duração do temporizador atual
  const [qntdIntervals, setQntdIntervals] = useState(0); // Contador de intervalos
  const [totalStudyTime, setTotalStudyTime] = useState(0); // Tempo total de estudo acumulado

  // Carregar o tempo total de estudo do AsyncStorage ao montar o componente
  useEffect(() => {
    const loadStudyTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem("totalStudyTime");
        if (storedTime) {
          setTotalStudyTime(parseInt(storedTime, 10));
        }
      } catch (e) {
        console.error("Erro ao carregar o tempo de estudo:", e);
      }
    };
    loadStudyTime();
  }, []);

  // Salvar o tempo total de estudo no AsyncStorage
  const saveStudyTime = async (time) => {
    try {
      await AsyncStorage.setItem("totalStudyTime", time.toString());
    } catch (e) {
      console.error("Erro ao salvar o tempo de estudo:", e);
    }
  };

  const handleTimerEnd = () => {
    Alert.alert(
      "Atenção!",
      "O tempo acabou! Gostaria de iniciar outro temporizador?",
      [
        {
          text: "Não",
          onPress: () => {
            setIsTimerRunning(false);
          },
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            // Lógica original para avançar para o próximo intervalo
            if (currentInterval < totalIntervals - 1) {
              const nextInterval = currentInterval + 1;
              setCurrentInterval(nextInterval);

              if (nextInterval % 2 === 0) {
                setCurrentType("study");
                setTimerDuration(study);
                const updatedStudyTime = totalStudyTime + study;
                setTotalStudyTime(updatedStudyTime);
                saveStudyTime(updatedStudyTime);
              } else if (nextInterval % 2 !== 0 && qntdIntervals < 3) {
                setCurrentType("shortBreak");
                setTimerDuration(shortBreak);
                setQntdIntervals(qntdIntervals + 1);
              } else if (nextInterval % 2 !== 0 && qntdIntervals >= 3) {
                setCurrentType("longBreak");
                setTimerDuration(longBreak);
                setQntdIntervals(0);
              }
            } else {
              setCurrentType("done");
              setTimerDuration(0);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      {currentType === "done" ? (
        <Text>Todos os intervalos concluídos!</Text>
      ) : (
        <View style={styles.timerContainer}>
          <Stopwatch
            timer={timerDuration}
            onTimerEnd={handleTimerEnd}
            isRunning={isRunning}
          />
          <Text>
            {currentType === "study"
              ? "Estudo"
              : currentType === "shortBreak"
              ? "Intervalo Curto"
              : "Intervalo Longo"}
          </Text>
        </View>
      )}
    </>
  );
};

// Obtém as dimensões da tela
const { width, height } = Dimensions.get("window");

// Define o tamanho do círculo como uma fração da largura ou altura da tela
const circleSize = Math.min(width, height) * 0.6; // 60% do menor lado da tela

const styles = StyleSheet.create({
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize / 2,
    borderColor: "#000",
    borderWidth: 1,
    margin: 10,
  },
  studyTimeText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
