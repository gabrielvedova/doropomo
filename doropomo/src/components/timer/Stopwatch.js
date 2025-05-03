import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

export default (props) => {
  const [isRunning, setIsRunning] = useState(true);
  const [startTime, setStartTime] = useState(1500);

  useEffect(() => {
    let timer;
    if (isRunning && startTime > 0) {
      timer = setInterval(() => {
        setStartTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Limpa o intervalo ao desmontar ou quando isRunning muda
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
      <TouchableOpacity onPress={() => setStartTime(1500)}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </>
  );
};
