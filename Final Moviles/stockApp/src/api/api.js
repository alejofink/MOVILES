import { API_URL } from "@env";
// URL base apuntando al backend. 
// Debe incluir protocolo (http://), IP o dominio, puerto y ruta base.
// En desarrollo local con Expo: usar la IP de la máquina y puerto donde corre Express.

export async function getStock() {
  const response = await fetch(API_URL); //Peticion get
  if (!response.ok) throw new Error("Error al obtener stock");
  return response.json(); //Devuelve body parseado a js (array de StockItem)
}

export async function addStock(data) {
  const response = await fetch(API_URL, {
    method: "POST", //Metodo post para crear documentos
    headers: { "Content-Type": "application/json" }, //Indica JSON en body
    body: JSON.stringify(data), //COnvierte el onjeto js a json
  });
  if (!response.ok) throw new Error("Error al agregar stock");
  return response.json();//Devuelve el documento creado 
}

export async function deleteStock(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",//Metodo delete paraeliminar documentos
  });
  if (!response.ok) throw new Error("Error al eliminar stock");
  return response.json();
}

export async function updateStock(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT", //Metodo put para actualizar documentos
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al actualizar stock");
  return response.json();
}
