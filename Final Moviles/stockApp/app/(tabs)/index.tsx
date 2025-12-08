import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

import { getStock, addStock, updateStock, deleteStock } from "../../src/api/api";

type StockItem = {
  _id?: string;
  producto: string;
  tipoCantidad: string;
  cantidad: number;
  marca: string;
}; //Define el formato de cada elemento de stock

export default function StockScreen() {
  const [stock, setStock] = useState<StockItem[]>([]); //Aray con los prodccuto de stock para visualizarlos 
  const [producto, setProducto] = useState("");
  const [tipoCantidad, setTipoCantidad] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [marca, setMarca] = useState("");
  //Estados de los inputs (inicialmente vacios)

  const [seleccionado, setSeleccionado] = useState<StockItem | null>(null); // Carga el item selecionado en los inputs

  const cargarStock = async () => {
    try {
      const data = await getStock(); //Llama la funcion de api.js
      setStock(data); //Guarda los datos para mostrarlos
    } catch (error) {
      console.log("Error cargando stock:", error);
    }
  };

  useEffect(() => {
    cargarStock(); 
  }, []); //Traela lista inicial (de laprimer carga) desde la api

  const agregarProducto = async () => {
    if (!producto || !tipoCantidad || !cantidad || !marca) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    } //Validacion de campos

    try {
      const nuevo = await addStock({
        producto,
        tipoCantidad,
        cantidad: Number(cantidad),
        marca,
      }); // addStock hace POST en el back y devuelve el documnto añadido

      setStock([...stock, nuevo]);//Actualiza la UI agregando e nuevo elemento

      limpiarCampos(); //LImpia los inputs
    } catch (error) {
      console.log("Error al agregar:", error);
    }
  };

  const eliminarProducto = async () => {
    if (!seleccionado) {
      Alert.alert("Error", "Seleccioná un producto tocándolo en la lista");
      return;
    }

    try {
      await deleteStock(seleccionado._id!); //deleteStock hace DELETE el en back mediante un id existente
      setStock(stock.filter((s) => s._id !== seleccionado._id)); //Elmina localmente el item del array para actualizar la UI
      limpiarCampos();
    } catch (error) {
      console.log("Error al eliminar", error);
    }
  };

  const guardarCambios = async () => {
    if (!seleccionado) {
      Alert.alert("Error", "Seleccioná un producto tocándolo en la lista");
      return;
    }

    try {
      const actualizado = await updateStock(seleccionado._id!, {
        producto,
        tipoCantidad,
        cantidad: Number(cantidad),
        marca,
      }); //Hace put en el back y devuelve el documento actualizado

      setStock(stock.map((s) => (s._id === seleccionado._id ? actualizado : s))); //Reemplaza el item en el array locacl con la nueva version del mismo 

      limpiarCampos();
    } catch (error) {
      console.log("Error al actualizar", error);
    }
  };

  const limpiarCampos = () => {
    setProducto("");
    setTipoCantidad("");
    setCantidad("");
    setMarca("");
    setSeleccionado(null); // ← NUEVO
  }; //Limpia los campos 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Stock</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.headerItem}>Producto</Text>
        <Text style={styles.headerItem}>Tipo</Text>
        <Text style={styles.headerItem}>Cantidad</Text>
        <Text style={styles.headerItem}>Marca</Text>
      </View>

      <FlatList
        style={styles.table}
        data={stock}
        keyExtractor={(item) => item._id ?? item.producto}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              // ➕ NUEVO: cargar en los inputs
              setSeleccionado(item);
              setProducto(item.producto);
              setTipoCantidad(item.tipoCantidad);
              setCantidad(String(item.cantidad));
              setMarca(item.marca);
            }}
          >
            <View
              style={[
                styles.row,
                index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                seleccionado?._id === item._id && { backgroundColor: "#fce0f2" }, // marcado
              ]}
            >
              <Text style={styles.cell}>{item.producto}</Text>
              <Text style={styles.cell}>{item.tipoCantidad}</Text>
              <Text style={styles.cell}>{item.cantidad}</Text>
              <Text style={styles.cell}>{item.marca}</Text>
            </View>
          </Pressable>
        )}
      />

      <View style={styles.form}>
        <TextInput
          placeholder="Producto"
          style={styles.input}
          value={producto}
          onChangeText={setProducto}
        />
        <TextInput
          placeholder="Tipo Cantidad"
          style={styles.input}
          value={tipoCantidad}
          onChangeText={setTipoCantidad}
        />
        <TextInput
          placeholder="Cantidad"
          style={styles.input}
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Marca"
          style={styles.input}
          value={marca}
          onChangeText={setMarca}
        />
      </View>

      <View style={styles.buttons}>
        <Pressable style={styles.btnAdd} onPress={agregarProducto}>
          <Text style={styles.btnText}>Agregar</Text>
        </Pressable>

        <Pressable style={styles.btnDelete} onPress={eliminarProducto}>
          <Text style={styles.btnText}>Eliminar</Text>
        </Pressable>

        <Pressable style={styles.btnSave} onPress={guardarCambios}>
          <Text style={styles.btnText}>Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Estilos (sin cambios)
const pastelPink = "#f7cce6";
const pastelPinkLight = "#fde6f3";
const pastelPinkStrong = "#e8a8d0";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pastelPinkLight,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#b14d85",
    textAlign: "center",
    marginBottom: 20,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: pastelPinkStrong,
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerItem: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  table: {
    borderWidth: 1,
    borderColor: pastelPinkStrong,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: pastelPinkStrong,
  },

  rowEven: {
    backgroundColor: "white",
  },
  rowOdd: {
    backgroundColor: pastelPink,
  },

  cell: {
    flex: 1,
    textAlign: "center",
    color: "#333",
  },

  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: pastelPinkStrong,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnAdd: {
    backgroundColor: pastelPinkStrong,
    padding: 12,
    borderRadius: 8,
    width: "30%",
  },
  btnDelete: {
    backgroundColor: "#d9534f",
    padding: 12,
    borderRadius: 8,
    width: "30%",
  },
  btnSave: {
    backgroundColor: "#5cb85c",
    padding: 12,
    borderRadius: 8,
    width: "30%",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
