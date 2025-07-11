interface Libro {
  titulo: string;
  autor: string;
  isbn: string;
  fechaPrestamo: string;
  fechaDevolucionPrevista: string;
  tipoUsuario: "estudiante" | "profesor" | "general";
  categoria?: string;
}

interface ReporteMulta {
  titulo: string;
  diasRetraso: number;
  multa: number;
  tipoUsuario: string;
}

function calcularDiasRetraso(fechaDevolucionPrevista: string, fechaActual: string): number {
  const fPrevista = new Date(fechaDevolucionPrevista);
  const fActual = new Date(fechaActual);
  const diferencia = fActual.getTime() - fPrevista.getTime();
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  return dias > 0 ? dias : 0;
}

function calcularMulta(diasRetraso: number, tipoUsuario: string): number {
  if (diasRetraso === 0) return 0;
  switch (tipoUsuario) {
    case "estudiante": return diasRetraso * 50;
    case "profesor": return diasRetraso * 30;
    case "general": return diasRetraso * 100;
    default: return 0;
  }
}

function procesarBiblioteca(libros: Libro[], fechaActual: string): ReporteMulta[] {
  return libros.map(libro => {
    const dias = calcularDiasRetraso(libro.fechaDevolucionPrevista, fechaActual);
    const multa = calcularMulta(dias, libro.tipoUsuario);
    return {
      titulo: libro.titulo,
      diasRetraso: dias,
      multa,
      tipoUsuario: libro.tipoUsuario
    };
  });
}

const librosEnPrestamo: Libro[] = [
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    isbn: "111111",
    fechaPrestamo: "2024-06-01",
    fechaDevolucionPrevista: "2024-06-20",
    tipoUsuario: "estudiante",
    categoria: "ficcion"
  },
  {
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    isbn: "222222",
    fechaPrestamo: "2024-05-15",
    fechaDevolucionPrevista: "2024-06-01",
    tipoUsuario: "estudiante",
    categoria: "ficcion"
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    isbn: "333333",
    fechaPrestamo: "2024-05-20",
    fechaDevolucionPrevista: "2024-06-10",
    tipoUsuario: "profesor",
    categoria: "ficcion"
  },
  {
    titulo: "Martín Fierro",
    autor: "José Hernández",
    isbn: "444444",
    fechaPrestamo: "2024-05-25",
    fechaDevolucionPrevista: "2024-06-05",
    tipoUsuario: "general",
    categoria: "tecnico"
  }
];

const fechaHoy = "2024-06-15";
const reportes = procesarBiblioteca(librosEnPrestamo, fechaHoy);

let totalMultas = 0;
console.log("============= REPORTE BIBLIOTECA =============");
reportes.forEach(r => {
  console.log(`Libro: ${r.titulo}`);
  console.log(`Usuario: ${r.tipoUsuario}`);
  console.log(`Días de retraso: ${r.diasRetraso}`);
  console.log(`Multa: $${r.multa}\n`);
  totalMultas += r.multa;
});
console.log(`TOTAL DE MULTAS: $${totalMultas}`);
console.log("===============================================");