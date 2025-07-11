function calcularDiasEstadia(ingreso, salida) {
    var fIngreso = new Date(ingreso);
    var fSalida = new Date(salida);
    var diferencia = fSalida.getTime() - fIngreso.getTime();
    return Math.floor(diferencia / (1000 * 60 * 60 * 24));
}
function calcularCostoBase(tipo, temporada, dias) {
    var preciosAlta = { simple: 120, doble: 180, suite: 350 };
    var preciosBaja = { simple: 80, doble: 120, suite: 250 };
    var precios = temporada === "alta" ? preciosAlta : preciosBaja;
    return precios[tipo] * dias;
}
function calcularCostoServicios(servicios, dias) {
    var precios = {
        desayuno: 25,
        wifi: 10,
        spa: 50,
        estacionamiento: 15,
        lavanderia: 20
    };
    return servicios.reduce(function (total, servicio) { return total + (precios[servicio] || 0) * dias; }, 0);
}
function calcularDescuento(base, servicios, tipo) {
    var total = base + servicios;
    if (tipo === "vip")
        return total * 0.15;
    if (tipo === "corporativo")
        return total * 0.10;
    return 0;
}
function procesarReservas(reservas) {
    return reservas.map(function (r) {
        var dias = calcularDiasEstadia(r.fechaIngreso, r.fechaSalida);
        var base = calcularCostoBase(r.tipoHabitacion, r.temporada, dias);
        var servicios = calcularCostoServicios(r.serviciosAdicionales, dias);
        var descuento = calcularDescuento(base, servicios, r.tipoHuesped);
        var total = base + servicios - descuento;
        return {
            numeroReserva: r.numeroReserva,
            nombreHuesped: r.nombreHuesped,
            tipoHabitacion: r.tipoHabitacion,
            diasEstadia: dias,
            costoBase: base,
            costoServicios: servicios,
            descuento: descuento,
            costoTotal: total
        };
    });
}
var reservasHotel = [
    {
        numeroReserva: "001",
        nombreHuesped: "Ana García",
        tipoHabitacion: "suite",
        fechaIngreso: "2024-07-15",
        fechaSalida: "2024-07-18",
        temporada: "alta",
        tipoHuesped: "vip",
        serviciosAdicionales: ["desayuno", "spa", "wifi"]
    },
    {
        numeroReserva: "002",
        nombreHuesped: "Carlos López",
        tipoHabitacion: "doble",
        fechaIngreso: "2024-09-10",
        fechaSalida: "2024-09-13",
        temporada: "baja",
        tipoHuesped: "corporativo",
        serviciosAdicionales: ["desayuno", "wifi", "estacionamiento"]
    },
    {
        numeroReserva: "003",
        nombreHuesped: "María Rodríguez",
        tipoHabitacion: "simple",
        fechaIngreso: "2024-08-20",
        fechaSalida: "2024-08-22",
        temporada: "alta",
        tipoHuesped: "regular",
        serviciosAdicionales: ["wifi"]
    },
    {
        numeroReserva: "004",
        nombreHuesped: "Juan Pérez",
        tipoHabitacion: "doble",
        fechaIngreso: "2024-06-01",
        fechaSalida: "2024-06-07",
        temporada: "baja",
        tipoHuesped: "vip",
        serviciosAdicionales: ["desayuno", "wifi", "lavanderia", "estacionamiento"]
    }
];
var reportesReservas = procesarReservas(reservasHotel);
console.log("============= REPORTE DE RESERVAS HOTEL =============");
var totalIngresos = 0;
reportesReservas.forEach(function (r) {
    console.log("Reserva #".concat(r.numeroReserva));
    console.log("Hu\u00E9sped: ".concat(r.nombreHuesped));
    console.log("Habitaci\u00F3n: ".concat(r.tipoHabitacion));
    console.log("Estad\u00EDa: ".concat(r.diasEstadia, " d\u00EDas"));
    console.log("Costo base: $".concat(r.costoBase));
    console.log("Servicios: $".concat(r.costoServicios));
    console.log("Descuento: $".concat(r.descuento.toFixed(2)));
    console.log("TOTAL: $".concat(r.costoTotal.toFixed(2), "\n"));
    totalIngresos += r.costoTotal;
});
console.log("INGRESOS TOTALES: $".concat(totalIngresos.toFixed(2)));
console.log("=====================================================");
