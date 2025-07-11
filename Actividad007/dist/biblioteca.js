function calcularDiasRetraso(fechaDevolucionPrevista, fechaActual) {
    var fPrevista = new Date(fechaDevolucionPrevista);
    var fActual = new Date(fechaActual);
    var diferencia = fActual.getTime() - fPrevista.getTime();
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    return dias > 0 ? dias : 0;
}
function calcularMulta(diasRetraso, tipoUsuario) {
    if (diasRetraso === 0)
        return 0;
    switch (tipoUsuario) {
        case "estudiante": return diasRetraso * 50;
        case "profesor": return diasRetraso * 30;
        case "general": return diasRetraso * 100;
        default: return 0;
    }
}
function procesarBiblioteca(libros, fechaActual) {
    return libros.map(function (libro) {
        var dias = calcularDiasRetraso(libro.fechaDevolucionPrevista, fechaActual);
        var multa = calcularMulta(dias, libro.tipoUsuario);
        return {
            titulo: libro.titulo,
            diasRetraso: dias,
            multa: multa,
            tipoUsuario: libro.tipoUsuario
        };
    });
}
var librosEnPrestamo = [
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
var fechaHoy = "2024-06-15";
var reportes = procesarBiblioteca(librosEnPrestamo, fechaHoy);
var totalMultas = 0;
console.log("============= REPORTE BIBLIOTECA =============");
reportes.forEach(function (r) {
    console.log("Libro: ".concat(r.titulo));
    console.log("Usuario: ".concat(r.tipoUsuario));
    console.log("D\u00EDas de retraso: ".concat(r.diasRetraso));
    console.log("Multa: $".concat(r.multa, "\n"));
    totalMultas += r.multa;
});
console.log("TOTAL DE MULTAS: $".concat(totalMultas));
console.log("===============================================");
