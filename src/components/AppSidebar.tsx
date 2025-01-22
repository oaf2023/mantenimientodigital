import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Wrench, Box, ClipboardList, Camera, Video, Settings, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FieldAlert } from "./FieldAlert";
import { MeetingAlert } from "./MeetingAlert";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
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
];

const configItems = [
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
  }
];

export function AppSidebar() {
  const [companyData, setCompanyData] = useState<{ name: string; logo: string }>({ name: "", logo: "" });
  const [fieldAlertOpen, setFieldAlertOpen] = useState(false);
  const [meetingAlertOpen, setMeetingAlertOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('companyData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setCompanyData({
        name: data.name || "",
        logo: data.logo || ""
      });
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            {companyData.logo && (
              <img 
                src={companyData.logo} 
                alt="Logo de la empresa" 
                className="w-8 h-8 object-contain"
              />
            )}
            <span>{companyData.name || "GMAO System"}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link to={item.path} className="flex items-center gap-2">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton 
                      onClick={() => setFieldAlertOpen(true)}
                      className="bg-green-100 hover:bg-green-200 text-green-800"
                    >
                      <Camera className="h-5 w-5" />
                      <span>En Campo</span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Captura fotos y videos en campo para reportar incidencias</p>
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton 
                      onClick={() => setMeetingAlertOpen(true)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800"
                    >
                      <Video className="h-5 w-5" />
                      <span>Reunión</span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Inicia una videollamada con tu equipo de trabajo</p>
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Configuración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link to={item.path} className="flex items-center gap-2">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 text-center text-sm text-muted-foreground border-t">
        <p>© {currentYear} Manejadatos - Argentina</p>
        <p>Todos los derechos reservados ®</p>
      </div>
      <FieldAlert open={fieldAlertOpen} onOpenChange={setFieldAlertOpen} />
      <MeetingAlert open={meetingAlertOpen} onOpenChange={setMeetingAlertOpen} />
    </Sidebar>
  );
}