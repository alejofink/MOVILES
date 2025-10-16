import React, { useState, useEffect } from "react";

export const Clock: React.FC = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(timer); // limpiar al desmontar
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString();

  return (
    <div style={{ marginTop: "20px", fontSize: "24px", fontWeight: "bold" }}>
      {formatTime(hora)}
    </div>
  );
};
