import express from "express"; //Framework usado para crear el servidor HTTP y rutas

import cors from "cors"; //Middleware para permitir peticiones desde otras plataformas (app Expo)

import mongoose from "mongoose"; //Libreria para manejar la conexion con MongoDB

import stockRoutes from "./routes/stock.js"; //Importa las rutas del modulo stock

import dotenv from "dotenv"; //Permite usar variables desde archivo .env

dotenv.config(); //Carga las variables de entorno definidas en .env

const app = express(); //Inicializa la aplicación Express

app.use(cors()); //Habilita CORS para que la app movil pueda acceder a la API aunque este en otro origen o IP

app.use(express.json()); //Permite recibir JSON en las solicitudes POST/PUT

mongoose
  .connect(process.env.MONGO_URI) //Se conecta a la base de datos usando la URI definida en .env

  .then(() => console.log("MongoDB conectado"))

  .catch((err) => console.log("Error:", err));

app.use("/api/stock", stockRoutes); //Todas las rutas de stock estan bajo /api/stock

app.listen(process.env.PORT, '0.0.0.0', () =>
  console.log("Servidor en puerto", process.env.PORT)
);
// '0.0.0.0' permite acceso desde red local y desde IP publica
