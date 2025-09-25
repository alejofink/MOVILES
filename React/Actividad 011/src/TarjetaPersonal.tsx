import React from "react";

const TarjetaPersonal: React.FC = () => {
  const estilos: Record<string, React.CSSProperties> = {
    contenedor: {
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#121212",
      fontFamily: "Arial, sans-serif",
      color: "#f5f5f5",
      padding: "1rem",
      overflowY: "auto",
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
    lado: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 1rem",
    },
    ladoIzquierdo: {
      alignItems: "center",
      borderRight: "1px solid #333",
    },
    ladoDerecho: {
      alignItems: "flex-start",
    },
    imagen: {
      width: "120px",
      height: "120px",
      borderRadius: "12px",
      objectFit: "cover",
      border: "2px solid #f5f5f5",
      marginBottom: "1rem",
    },
    nombre: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    puesto: {
      fontSize: "1rem",
      opacity: 0.8,
      marginBottom: "1rem",
    },
    descripcion: {
      fontSize: "0.95rem",
      lineHeight: "1.5",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    enlace: {
      display: "block",
      fontSize: "0.9rem",
      color: "#f5f5f5",
      textDecoration: "none",
      marginTop: "0.5rem",
    },
    listado: {
      fontSize: "0.95rem",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={estilos.contenedor}>
      <div style={estilos.tarjeta}>
        <div style={{ ...estilos.lado, ...estilos.ladoIzquierdo }}>
          <img src="/image.png" alt="Foto de perfil" style={estilos.imagen} />
          <h1 style={estilos.nombre}>Ale</h1>
          <p style={estilos.puesto}>Desarrollador Web</p>
          <p style={estilos.descripcion}>
            Me gusta crear interfaces simples, limpias y funcionales.
          </p>
          <a href="mailto:ale@example.com" style={estilos.enlace}>
            ✉️ ale@example.com
          </a>
          <a href="https://tusitio.example" target="_blank" rel="noreferrer" style={estilos.enlace}>
            🌐 tusitio.example
          </a>
        </div>
        <div style={{ ...estilos.lado, ...estilos.ladoDerecho }}>
          <strong>Roles que puedo ejercer:</strong>
          <ul style={estilos.listado}>
            <li>Desarrollador Frontend</li>
            <li>Desarrollador Backend</li>
            <li>Documentador técnico</li>
            <li>Tester / QA</li>
            <li>Gestor de proyectos</li>
            <li>Soporte técnico</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TarjetaPersonal;