"use strict";
// Promedio individual
function calcularPromedio(notas) {
    let suma = 0;
    for (let nota of notas) {
        suma += nota;
    }
    return suma / notas.length;
}
// Funcion de promocion
function determinarCondicion(promedio) {
    if (promedio >= 7) {
        return "Promocionado";
    }
    else if (promedio >= 4) {
        return "Aprobado";
    }
    else {
        return "Desaprobado";
    }
}
// Funcion de reporte de clases
function generarReporte(estudiantes) {
    console.log("📊 Reporte de notas de la clase");
    console.log("--------------------------------");
    for (let estudiante of estudiantes) {
        let promedio = calcularPromedio(estudiante.notas);
        let condicion = determinarCondicion(promedio);
        console.log(`ID: ${estudiante.id} | Nombre: ${estudiante.nombre} | Promedio: ${promedio.toFixed(2)} | Estado: ${condicion}`);
    }
}
// Estudiantes 
let estudiantes = [
    { id: 1, nombre: "Ana", notas: [8, 7, 9] },
    { id: 2, nombre: "Luis", notas: [4, 5, 6] },
    { id: 3, nombre: "Marta", notas: [2, 3, 1] },
];
generarReporte(estudiantes);
