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
import { LayoutDashboard, Wrench, Box, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Activos",
    icon: Box,
    path: "/assets",
  },
  {
    title: "Órdenes de Trabajo",
    icon: ClipboardList,
    path: "/work-orders",
  },
  {
    title: "Mantenimiento",
    icon: Wrench,
    path: "/maintenance",
  },
];

export function AppSidebar() {
  const [companyData, setCompanyData] = useState<{ name: string; logo: string }>({ name: "", logo: "" });

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
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
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
    </Sidebar>
  );
}