import { InteractiveProduct } from "./interactividad";
import { productos } from "./productos";
import { Clock } from "./reloj";

function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {productos.map((prod) => (
          <InteractiveProduct key={prod.id} producto={prod} />
        ))}
      </div>
      <Clock />
    </div>
  );
}

export default App;
