
interface Reserva {
  numeroReserva: string;
  nombreHuesped: string;
  tipoHabitacion: "simple" | "doble" | "suite";
  fechaIngreso: string;
  fechaSalida: string;
  temporada: "alta" | "baja";
  tipoHuesped: "regular" | "vip" | "corporativo";
  serviciosAdicionales: string[];
}

interface ReporteReserva {
  numeroReserva: string;
  nombreHuesped: string;
  tipoHabitacion: string;
  diasEstadia: number;
  costoBase: number;
  costoServicios: number;
  descuento: number;
  costoTotal: number;
}

function calcularDiasEstadia(ingreso: string, salida: string): number {
  const fIngreso = new Date(ingreso);
  const fSalida = new Date(salida);
  const diferencia = fSalida.getTime() - fIngreso.getTime();
  return Math.floor(diferencia / (1000 * 60 * 60 * 24));
}

function calcularCostoBase(tipo: string, temporada: string, dias: number): number {
  const preciosAlta = { simple: 120, doble: 180, suite: 350 };
  const preciosBaja = { simple: 80, doble: 120, suite: 250 };
  const precios = temporada === "alta" ? preciosAlta : preciosBaja;
  return precios[tipo as keyof typeof precios] * dias;
}

function calcularCostoServicios(servicios: string[], dias: number): number {
  const precios: Record<string, number> = {
    desayuno: 25,
    wifi: 10,
    spa: 50,
    estacionamiento: 15,
    lavanderia: 20
  };
  return servicios.reduce((total, servicio) => total + (precios[servicio] || 0) * dias, 0);
}

function calcularDescuento(base: number, servicios: number, tipo: string): number {
  const total = base + servicios;
  if (tipo === "vip") return total * 0.15;
  if (tipo === "corporativo") return total * 0.10;
  return 0;
}

function procesarReservas(reservas: Reserva[]): ReporteReserva[] {
  return reservas.map(r => {
    const dias = calcularDiasEstadia(r.fechaIngreso, r.fechaSalida);
    const base = calcularCostoBase(r.tipoHabitacion, r.temporada, dias);
    const servicios = calcularCostoServicios(r.serviciosAdicionales, dias);
    const descuento = calcularDescuento(base, servicios, r.tipoHuesped);
    const total = base + servicios - descuento;
    return {
      numeroReserva: r.numeroReserva,
      nombreHuesped: r.nombreHuesped,
      tipoHabitacion: r.tipoHabitacion,
      diasEstadia: dias,
      costoBase: base,
      costoServicios: servicios,
      descuento,
      costoTotal: total
    };
  });
}

const reservasHotel: Reserva[] = [
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

const reportesReservas = procesarReservas(reservasHotel);

console.log("============= REPORTE DE RESERVAS HOTEL =============");
let totalIngresos = 0;
reportesReservas.forEach(r => {
  console.log(`Reserva #${r.numeroReserva}`);
  console.log(`Huésped: ${r.nombreHuesped}`);
  console.log(`Habitación: ${r.tipoHabitacion}`);
  console.log(`Estadía: ${r.diasEstadia} días`);
  console.log(`Costo base: $${r.costoBase}`);
  console.log(`Servicios: $${r.costoServicios}`);
  console.log(`Descuento: $${r.descuento.toFixed(2)}`);
  console.log(`TOTAL: $${r.costoTotal.toFixed(2)}\n`);
  totalIngresos += r.costoTotal;
});
console.log(`INGRESOS TOTALES: $${totalIngresos.toFixed(2)}`);
console.log("=====================================================");