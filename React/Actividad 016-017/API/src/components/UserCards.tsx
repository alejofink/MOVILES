import React from "react";
import type { User } from "../types/User";

interface Props {
  user: User;
}

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        margin: "10px auto",
        maxWidth: "400px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#333" }}>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Teléfono:</strong> {user.phone}</p>
      <p><strong>Sitio web:</strong> {user.website}</p>
      <p><strong>Compañía:</strong> {user.company?.name}</p>
      <p><strong>Dirección:</strong> {user.address?.street}, {user.address?.city}</p>
    </div>
  );
};

export default UserCard;
