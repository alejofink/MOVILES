import React, { useEffect, useState } from "react";
import type { User } from "../types/User";
import UserCard from "./UserCards";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  // Estados para la paginación
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const usuariosPorPagina = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const data: User[] = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setPaginaActual(1);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrado por nombre
  useEffect(() => {
    const filtrados = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtrados);
    setPaginaActual(1);
  }, [search, users]);

  // Calcular usuarios a mostrar en la página actual
  const indiceUltimo = paginaActual * usuariosPorPagina;
  const indicePrimero = indiceUltimo - usuariosPorPagina;
  const usuariosPagina = filteredUsers.slice(indicePrimero, indiceUltimo);

  // Cambiar página
  const siguientePagina = () => {
    if (paginaActual < Math.ceil(filteredUsers.length / usuariosPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const anteriorPagina = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Renderizado condicional
  if (loading) return <p style={{ textAlign: "center" }}>Cargando usuarios...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ textAlign: "center" }}>
      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Botón Recargar */}
      <button
        onClick={fetchUsers}
        style={{
          marginLeft: "5px",
          padding: "8px 12px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Recargar
      </button>

      {/* Lista de usuarios */}
      <div>
        {usuariosPagina.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Paginación */}
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={anteriorPagina}
          disabled={paginaActual === 1}
          style={{
            margin: "0 5px",
            padding: "8px 12px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: paginaActual === 1 ? "#ccc" : "#007bff",
            color: "white",
            cursor: paginaActual === 1 ? "not-allowed" : "pointer",
          }}
        >
          Anterior
        </button>

        <span style={{ margin: "0 10px" }}>
          Página {paginaActual} de {Math.ceil(filteredUsers.length / usuariosPorPagina)}
        </span>

        <button
          onClick={siguientePagina}
          disabled={paginaActual === Math.ceil(filteredUsers.length / usuariosPorPagina)}
          style={{
            margin: "0 5px",
            padding: "8px 12px",
            borderRadius: "5px",
            border: "none",
            backgroundColor:
              paginaActual === Math.ceil(filteredUsers.length / usuariosPorPagina)
                ? "#ccc"
                : "#007bff",
            color: "white",
            cursor:
              paginaActual === Math.ceil(filteredUsers.length / usuariosPorPagina)
                ? "not-allowed"
                : "pointer",
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserList;
