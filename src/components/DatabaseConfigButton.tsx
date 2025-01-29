import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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

      // Create directory dialog
      const directoryHandle = await window.showDirectoryPicker({
        startIn: 'desktop',
      });

      // Verify if we can create the mdigital directory
      try {
        const mdigitalHandle = await directoryHandle.getDirectoryHandle('mdigital', {
          create: true,
        });

        // Get the full path (this is a security-safe way to handle paths in modern web apps)
        const dbPath = `${directoryHandle.name}/mdigital`;

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