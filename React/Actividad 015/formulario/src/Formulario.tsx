import { useState,useEffect} from "react"; //hooks
import InputField from "./Input"; //componente de campo de entrada
import BotonSubmit from "./Boton"; //componente de boton
import "./Formulario.css";

//logica del formulario
function FormularioInscripcion() {

  //estados de los campos
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [mensajeExito, setMensajeExito] = useState(false);

    //titulo variable por estado
    useEffect(() => {
        if (mensajeExito) {
            document.title = "Inscripción Exitosa!";
        }else {
            document.title = "Formulario de Inscripción";
        }
    }, [mensajeExito]); //ejecuta el mensaje


    //manejo de envio de los datos
    const handleSubmit = (e: React.FormEvent) => {
        //previene el comportamiento por defecto
        e.preventDefault()

        //validacion de campos
        if (!nombre || !apellido || !email || !telefono) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        //muiestra exito 
        setMensajeExito(true);
    }

    //reinicia el formulario
    const handleReset = () => {
        setNombre("");
        setApellido("");
        setEmail("");
        setTelefono("");
        setMensajeExito(false);
    }

    //renderizado vatiable
    return (
      <div className="form-container">
        {!mensajeExito ? (
          //muestra formualrio si no se envio
          <form onSubmit={handleSubmit}>
            {/*campos*/} 
            <InputField
              label="Nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre"
            />
            
            <InputField
              label="Apellido"
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Ingresa tu apellido"
            />

            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@email.com"
            />

            <InputField
              label="Teléfono"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="1234567890"
            />

            <BotonSubmit texto="Enviar" onClick={handleSubmit} />
          </form>
        ) : (
          //mensaje exito si se envio
          <div className="exito">
            <h2>¡Inscripción exitosa!</h2>
            <p><strong>Nombre completo:</strong> {nombre} {apellido}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Teléfono:</strong> {telefono}</p>

            <button onClick={handleReset}>Nueva Inscripción</button>
          </div>
        )}
      </div>
  )
}

//exporta componente 
export default FormularioInscripcion