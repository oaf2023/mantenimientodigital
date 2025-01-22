import { LayoutDashboard, Wrench, Box, ClipboardList, Camera, Video, Users } from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
    description: "Panel principal con indicadores y estadísticas del sistema"
  },
  {
    title: "Activos",
    icon: Box,
    path: "/assets",
    description: "Gestión de equipos y recursos de la empresa"
  },
  {
    title: "Órdenes de Trabajo",
    icon: ClipboardList,
    path: "/work-orders",
    description: "Administración de órdenes de trabajo y mantenimientos"
  },
  {
    title: "Mantenimiento",
    icon: Wrench,
    path: "/maintenance",
    description: "Planificación y seguimiento de mantenimientos preventivos"
  },
  {
    title: "Equipo de Trabajo",
    icon: Users,
    path: "/teams",
    description: "Gestión de equipos y grupos de trabajo"
  },
];

export const actionItems = [
  {
    title: "En Campo",
    icon: Camera,
    action: "field",
    className: "bg-green-100 hover:bg-green-200 text-green-800",
    description: "Captura fotos y videos en campo para reportar incidencias"
  },
  {
    title: "Reunión",
    icon: Video,
    action: "meeting",
    className: "bg-blue-100 hover:bg-blue-200 text-blue-800",
    description: "Inicia una videollamada con tu equipo de trabajo"
  }
];