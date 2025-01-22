export type Priority = "Alta" | "Media" | "Baja";
export type MaintenanceType = "Preventivo" | "Correctivo" | "Predictivo" | "Mejora";
export type WorkOrderStatus = "Pendiente" | "En Proceso" | "Completada" | "Cancelada";

export interface WorkOrder {
  numeroOrden: string;
  fechaEmision: string;
  fechaEjecucionProgramada: string;
  prioridad: Priority;
  solicitante: string;
  nombreEquipo: string;
  codigoEquipo: string;
  ubicacionEquipo: string;
  ubicacionCentro: string;
  enAltura: boolean;
  detalles: string;
  fabricante: string;
  modeloNumeroSerie: string;
  horasOperacion: number;
  tipoMantenimiento: MaintenanceType;
  descripcionDetallada: string;
  materialesRepuestos: string;
  herramientasEspeciales: string;
  manoObraRequerida: string;
  tiempoEstimado: number;
  peligrosIdentificados: string;
  medidasSeguridad: string;
  impactoAmbiental: string;
  fechaInicioReal: string;
  fechaFinalizacionReal: string;
  estadoTrabajo: WorkOrderStatus;
  resultadosInspeccion: string;
  observacionesTecnico: string;
  responsableMantenimiento: string;
  supervisorAprobador: string;
  fechaCierre: string;
}