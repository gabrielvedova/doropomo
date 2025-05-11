import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
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

  const handleTimerEnd = () => {
    if (currentInterval < totalIntervals - 1) {
      const nextInterval = currentInterval + 1;
      setCurrentInterval(nextInterval);
      console.log("Total Intervalos:", totalIntervals);
      console.log("Intervalo atual:", nextInterval);
      console.log("Intervalos: ", qntdIntervals);

      // Alterna entre estudo, pausa curta e pausa longa
      if (nextInterval % 2 === 0) {
        setCurrentType("Estudo"); // Atualiza o tipo para estudo
        setTimerDuration(study); // Atualiza a duração para estudo
      } else if (nextInterval % 2 !== 0 && qntdIntervals < 3) {
        setCurrentType("Intervalo"); // Atualiza o tipo para intervalo
        setTimerDuration(shortBreak); // Atualiza a duração para pausa curta
        setQntdIntervals(qntdIntervals + 1); // Incrementa o contador de intervalos
      } else if (nextInterval % 2 !== 0 && qntdIntervals >= 3) {
        setCurrentType("Intervalo"); // Atualiza o tipo para intervalo
        setTimerDuration(longBreak); // Atualiza a duração para pausa longa
        setQntdIntervals(0); // Reinicia o contador de intervalos
      }
    } else {
      // Finaliza os intervalos
      setCurrentType("done");
      setTimerDuration(0); // Define a duração como 0
    }
  };

  return (
    <>
      {currentType === "done" ? (
        <Text>Todos os intervalos concluídos!</Text>
      ) : (
        <View style={styles.timerContainer}>
          <Text>{currentType}</Text>
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
const circleSize = Math.min(width, height) * 0.35; // 35% do menor lado da tela

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
});
