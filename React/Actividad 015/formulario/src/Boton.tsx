//props BotonSubmit
interface BotonProps {
  texto: string;
  onClick: (e: React.FormEvent) => void; 
}

import './Boton.css'

//copmonente boton
function BotonSubmit({ texto, onClick }: BotonProps) {
  return (
    <button className="boton-submit" onClick={onClick}>
      {texto}
    </button>
  )
}

//exportar componente
export default BotonSubmit
