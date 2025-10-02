import React from "react";

// Definimos la interfaz para las props del componente
export interface TarjetaProps {
  nombre: string;
  puesto: string;
  descripcion: string;
  email: string;
  sitio: string;
  avatarUrl: string;
  roles: string[];
}

// Componente que recibe las props tipadas con la interfaz
const TarjetaPersonal: React.FC<TarjetaProps> = ({
  nombre,
  puesto,
  descripcion,
  email,
  sitio,
  avatarUrl,
  roles,
}) => {
  const estilos: Record<string, React.CSSProperties> = {
    contenedor: {
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#121212",
      color: "#f5f5f5",
      overflowY: "auto",
      padding: "1rem",
      boxSizing: "border-box",
    },
    tarjeta: {
      background: "#1e1e1e",
      padding: "2rem",
      borderRadius: "12px",
      width: "800px",
      display: "flex",
      justifyContent: "space-between",
      boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
      flexShrink: 0,
    },
    lado: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 1rem" },
    ladoIzquierdo: { alignItems: "center", borderRight: "1px solid #333" },
    ladoDerecho: { alignItems: "flex-start" },
    imagen: { width: 120, height: 120, borderRadius: 12, objectFit: "cover", border: "2px solid #f5f5f5", marginBottom: "1rem" },
    nombre: { fontSize: "1.8rem", fontWeight: "bold", marginBottom: "0.5rem" },
    puesto: { fontSize: "1rem", opacity: 0.8, marginBottom: "1rem" },
    descripcion: { fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "1.5rem", textAlign: "center" },
    enlace: { display: "block", fontSize: "0.9rem", color: "#f5f5f5", textDecoration: "none", marginTop: "0.5rem" },
    listado: { fontSize: "0.95rem", lineHeight: "1.6" },
  };

  return (
    <div style={estilos.contenedor}>
      <div style={estilos.tarjeta}>
        <div style={{ ...estilos.lado, ...estilos.ladoIzquierdo }}>
          <img src={avatarUrl} alt="Foto de perfil" style={estilos.imagen} />
          <h1 style={estilos.nombre}>{nombre}</h1>
          <p style={estilos.puesto}>{puesto}</p>
          <p style={estilos.descripcion}>{descripcion}</p>
          <a href={`mailto:${email}`} style={estilos.enlace}>✉️ {email}</a>
          <a href={sitio} target="_blank" rel="noreferrer" style={estilos.enlace}>🌐 {sitio}</a>
        </div>
        <div style={{ ...estilos.lado, ...estilos.ladoDerecho }}>
          <strong>Roles que puedo ejercer:</strong>
          <ul style={estilos.listado}>
            {roles.map((rol, index) => (
              <li key={index}>{rol}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TarjetaPersonal;
