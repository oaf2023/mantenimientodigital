import { useEffect, useState } from "react";
import { SidebarGroupLabel } from "@/components/ui/sidebar";

export const SidebarHeader = () => {
  const [companyData, setCompanyData] = useState<{ name: string; logo: string }>({ 
    name: "", 
    logo: "" 
  });

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

  return (
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
  );
};