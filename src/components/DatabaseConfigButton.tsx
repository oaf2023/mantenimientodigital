import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

declare global {
  interface Window {
    electron: {
      openDirectory: () => Promise<string>;
    };
  }
}

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

      try {
        // Use Electron's dialog through our preload script
        const selectedPath = await window.electron.openDirectory();
        if (!selectedPath) {
          return; // User cancelled the dialog
        }

        // Construct the mdigital path
        const dbPath = `${selectedPath}/mdigital`;

        // Update the empresas.json file in PythonAnywhere with the new disk location
        await axios.post('https://oaf.pythonanywhere.com/api/update-empresa', {
          disco: dbPath
        });

        setIsConfigured(true);
        toast({
          title: "Base de datos configurada",
          description: `Directorio creado en: ${dbPath}`,
        });
      } catch (error) {
        console.error('Error creating directory:', error);
        toast({
          title: "Error",
          description: "No se pudo crear el directorio de la base de datos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error in database setup:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al configurar la base de datos",
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