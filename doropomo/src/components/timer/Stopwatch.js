import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

export default ({ timer, onTimerEnd }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [startTime, setStartTime] = useState(timer);

  // Reinicia o temporizador sempre que a prop `timer` mudar
  useEffect(() => {
    setStartTime(timer);
    setIsRunning(true); // Opcional: inicia automaticamente o temporizador ao mudar
  }, [timer]);

  useEffect(() => {
    let interval;
    if (isRunning && startTime > 0) {
      interval = setInterval(() => {
        setStartTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (startTime === 0) {
      onTimerEnd && onTimerEnd(); // Notifica o fim do temporizador
    }
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar ou quando isRunning muda
  }, [isRunning, startTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <Text>{isRunning ? "Running" : "Stopped"}</Text>
      <Text>{formatTime(startTime)}</Text>
      <TouchableOpacity onPress={() => setIsRunning(!isRunning)}>
        <Text>{isRunning ? "Pause" : "Resume"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setStartTime(timer)}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </>
  );
};
