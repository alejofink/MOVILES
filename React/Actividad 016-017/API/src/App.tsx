// src/App.tsx
import React from "react";
import UserList from "./components/UserList";

const App: React.FC = () => {
  return (
    <div className="App" style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>API de Usuarios</h1>
      <UserList />
    </div>
  );
};

export default App;
