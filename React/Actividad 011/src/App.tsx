import React from "react";
import TarjetaPersonal from "./TarjetaPersonal";


const datosTarjeta = {
  nombre: "Ale",
  puesto: "Desarrollador Web",
  descripcion: "Me gusta crear interfaces simples, limpias y funcionales.",
  email: "ale@example.com",
  sitio: "https://tusitio.example",
  avatarUrl: "/image.png",
  roles: ["Frontend", "Backend", "Documentador técnico", "Tester / QA", "Gestor de proyectos", "Soporte técnico"],
};

const App: React.FC = () => {
  return <TarjetaPersonal {...datosTarjeta} />;
};

export default App;
