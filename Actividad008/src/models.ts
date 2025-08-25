// Interfaz de tipaod de alumnos
interface Estudiante {
  id: number;         
  nombre: string;    
  notas: number[];    
}

// Promedio individual
function calcularPromedio(notas: number[]): number {
  let suma: number = 0;
  for (let nota of notas) {
    suma += nota;
  }
  return suma / notas.length;
}

// Funcion de promocion
function determinarCondicion(promedio: number): string {
  if (promedio >= 7) {
    return "Promocionado";
  } else if (promedio >= 4) {
    return "Aprobado";
  } else {
    return "Desaprobado";
  }
}

// Funcion de reporte de clases
function generarReporte(estudiantes: Estudiante[]): void {
  console.log("📊 Reporte de notas de la clase");
  console.log("--------------------------------");

  for (let estudiante of estudiantes) {
    let promedio: number = calcularPromedio(estudiante.notas);
    let condicion: string = determinarCondicion(promedio);

    console.log(
      `ID: ${estudiante.id} | Nombre: ${estudiante.nombre} | Promedio: ${promedio.toFixed(
        2
      )} | Estado: ${condicion}`
    );
  }
}

// Estudiantes 
let estudiantes: Estudiante[] = [
  { id: 1, nombre: "Ana", notas: [8, 7, 9] },
  { id: 2, nombre: "Luis", notas: [4, 5, 6] },
  { id: 3, nombre: "Marta", notas: [2, 3, 1] },
];

generarReporte(estudiantes);
