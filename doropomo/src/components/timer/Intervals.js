import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Stopwatch from "./Stopwatch";
import { TimerContext } from "../../context/TimerContext";

export default ({
  totalCycles = 1,
  cycleTime = 4,
  study = 15,
  shortBreak = 3,
  longBreak = 9,
  setNextCurrent,
}) => {
  const { isRunning, setIsRunning } = useContext(TimerContext);

  const totalIntervals = Math.floor(cycleTime * 2 * totalCycles); // Total de intervalos de estudo e pausa

  const [currentInterval, setCurrentInterval] = useState(0); // Controle do intervalo atual
  const [currentType, setCurrentType] = useState("study"); // Tipo atual (estudo ou pausa)
  const [timerDuration, setTimerDuration] = useState(study); // Duração do temporizador atual
  const [qntdIntervals, setQntdIntervals] = useState(0); // Contador de intervalos
  const [totalStudyTime, setTotalStudyTime] = useState(0); // Tempo total de estudo acumulado
  const [timerKey, setTimerKey] = useState(0);
  const [alertShown, setAlertShown] = useState(false);

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
    if (alertShown) return; // Evita múltiplas execuções
    setAlertShown(true);
    Alert.alert(
      "Atenção!",
      "O tempo acabou! Gostaria de iniciar outro temporizador?",
      [
        {
          text: "Não",
          onPress: () => {
            setIsRunning(false);
            setCurrentType("study");
            setCurrentInterval(0);
            setQntdIntervals(0);
            setTimerDuration(study);
            setNextCurrent("Intervalo Curto");
            setTimerKey((prev) => prev + 1); // força o reset do Stopwatch
            setAlertShown(false); // Libera para o próximo ciclo
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
                if (qntdIntervals < 3) {
                  setNextCurrent("Intervalo Curto");
                } else {
                  setNextCurrent("Intervalo Longo");
                }
              } else {
                // Se for ímpar, é intervalo
                if (qntdIntervals < 3) {
                  setCurrentType("shortBreak");
                  setTimerDuration(shortBreak);
                  setQntdIntervals(qntdIntervals + 1);
                  setNextCurrent("Estudo");
                } else {
                  setCurrentType("longBreak");
                  setTimerDuration(longBreak);
                  setQntdIntervals(0);
                  setNextCurrent("Estudo");
                }
              }
            } else {
              setCurrentType("study");
              setCurrentInterval(0);
              setQntdIntervals(0);
              setTimerDuration(study);
              setNextCurrent("Intervalo Curto");
            }
            setAlertShown(false); // Libera para o próximo ciclo
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
            key={timerKey}
            timer={timerDuration}
            onTimerEnd={handleTimerEnd}
            isRunning={isRunning}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
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
    borderWidth: 8,
    margin: 10,
  },
  studyTimeText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
