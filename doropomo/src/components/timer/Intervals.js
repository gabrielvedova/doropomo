import React, { useState } from "react";
import { Text } from "react-native";
import Stopwatch from "./Stopwatch";

export default () => {
  const totalTime = 14400; // 4 horas
  const cycleTime = 7200; // 2 horas
  const study = 1500; // 25 minutos
  const shortBreak = 300; // 5 minutos
  const longBreak = 900; // 15 minutos
  const totalIntervals = Math.floor(
    (cycleTime / (study + shortBreak)) * 2 * (totalTime / cycleTime)
  ); // Total de intervalos de estudo e pausa

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
        setCurrentType("study");
        setTimerDuration(study); // Atualiza a duração para estudo
      } else if (nextInterval % 2 !== 0 && qntdIntervals < 3) {
        setCurrentType("shortBreak");
        setTimerDuration(shortBreak); // Atualiza a duração para pausa curta
        setQntdIntervals(qntdIntervals + 1); // Incrementa o contador de intervalos
      } else if (nextInterval % 2 !== 0 && qntdIntervals >= 3) {
        setCurrentType("longBreak");
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
        <>
          <Text>
            {currentType === "study"
              ? "Estudo"
              : currentType === "shortBreak"
              ? "Intervalo Curto"
              : "Intervalo Longo"}
          </Text>
          <Stopwatch timer={timerDuration} onTimerEnd={handleTimerEnd} />
        </>
      )}
    </>
  );
};
