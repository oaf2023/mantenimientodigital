import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export function DatabaseConfigButton() {
  const [isConfigured, setIsConfigured] = useState(false);
  const { toast } = useToast();

  const handleDatabaseSetup = async () => {
    try {
      // Check if company data exists
      const companyData = localStorage.getItem('companyData');
      if (!companyData) {
        toast({
          title: "Error",
          description: "Primero debe configurar los datos de la empresa",
          variant: "destructive",
        });
        return;
      }

      const { disco } = JSON.parse(companyData);
      
      console.log("Iniciando configuración de base de datos");
      
      // Llamada al backend para crear el directorio y la base de datos
      const response = await axios.post('http://localhost:8000/api/v1/initialize-database', {
        path: disco,
        collections: [
          "otrabajo",
          "por_tipo_de_activo",
          "por_funcionalidad",
          "por_importancia_critica",
          "por_ubicacion",
          "por_modo_de_mantenimiento_aplicable",
          "por_ciclo_de_vida_del_activo"
        ]
      });

      console.log("Respuesta del servidor:", response.data);

      if (response.data.success) {
        setIsConfigured(true);
        toast({
          title: "Base de datos configurada",
          description: `Base de datos inicializada correctamente en: ${disco}`,
        });
      } else {
        throw new Error(response.data.message || "Error desconocido");
      }
    } catch (error) {
      console.error('Error en la configuración de la base de datos:', error);
      toast({
        title: "Error",
        description: "No se pudo configurar la base de datos. Verifique que MongoDB esté en ejecución.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleDatabaseSetup}
      disabled={isConfigured}
      className="relative"
      title="Configurar Base de Datos"
    >
      {isConfigured ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <Database className="h-5 w-5" />
      )}
    </Button>
  );
}