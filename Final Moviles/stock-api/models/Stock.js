import mongoose from "mongoose"; //Importa mongoose para manejo de documentos MongoD

const stockSchema = new mongoose.Schema(
  {
    producto: { type: String, required: true }, //Nombre del producto
    tipoCantidad: { type: String, required: true }, //Unidad del prodcto
    cantidad: { type: Number, required: true }, //Cantidad del producto
    marca: { type: String, required: false }, //Marca del producto
  },
  { timestamps: true }//Agrega automaticamente createdAt y updatedAt a cada documento dentro de MongoDB
);

export default mongoose.model("Stock", stockSchema, "stock");   
//Crea el modelo Stock basado en el esquema
//El tercer parametro stock indica el nombre de la coleccion de MongoDB