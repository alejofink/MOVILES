import express from "express";
import Stock from "../models/Stock.js"; //Importa el modelo Stock para interactuar con MongoDB

const router = express.Router(); //Manejo de rutas 

//Obtener todos los documentos
router.get("/", async (req, res) => {
  try {
    const items = await Stock.find(); //Los busca
    res.json(items);//Los devuelve 
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el stock" });
  }
});

//Crear un docuemnto
router.post("/", async (req, res) => {
  try {
    const nuevo = await Stock.create(req.body); //Crea documento
    res.json(nuevo);//Lo devuelve
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" });
  }
});

//Actualiza un documento
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Stock.findByIdAndUpdate(
      req.params.id, //ID recibido por URL
      req.body, //Datos actualizados por el usuario
      { new: true } //Lo devuelve ya atualizado
    );
    res.json(actualizado); //Muestra el producto actualizado
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

//Elimina un documento
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Stock.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado", eliminado });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});


export default router;
