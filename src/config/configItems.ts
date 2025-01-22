import { Settings, Database, Table2 } from "lucide-react";

export const configItems = [
  {
    title: "Configuración",
    icon: Settings,
    path: "/setup",
    description: "Configuración general de la empresa y el sistema"
  },
  {
    title: "Configuración de Data",
    icon: Database,
    path: "/data-setup",
    description: "Configuración del almacenamiento de datos y archivos del sistema"
  },
  {
    title: "Configuración de Tablas",
    icon: Table2,
    path: "/tables-setup",
    description: "Configuración de tablas para clasificación de activos"
  }
];