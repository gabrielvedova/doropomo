import React, { createContext, useState } from "react";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <TimerContext.Provider value={{ isRunning, setIsRunning }}>
      {children}
    </TimerContext.Provider>
  );
};
