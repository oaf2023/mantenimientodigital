import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TablesSetup = () => {
  const { toast } = useToast();
  const [isInitializing, setIsInitializing] = useState(false);

  const collections = [
    "otrabajo",
    "por_tipo_de_activo",
    "por_funcionalidad",
    "por_importancia_critica",
    "por_ubicacion",
    "por_modo_de_mantenimiento_aplicable",
    "por_ciclo_de_vida_del_activo"
  ];

  const handleInitializeDatabase = async () => {
    setIsInitializing(true);
    try {
      console.log("Iniciando inicialización de la base de datos...");
      const response = await axios.post('http://localhost:8000/initialize-database', {
        collections
      });
      
      console.log("Respuesta del servidor:", response.data);
      
      if (response.data.success) {
        toast({
          title: "Base de datos inicializada",
          description: "Las colecciones han sido creadas exitosamente",
        });
      }
    } catch (error) {
      console.error("Error al inicializar la base de datos:", error);
      toast({
        title: "Error",
        description: "No se pudo inicializar la base de datos. Verifique que MongoDB esté ejecutándose.",
        variant: "destructive",
      });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Configuración de Tablas</h1>
      <Card>
        <CardHeader>
          <CardTitle>Inicialización de Base de Datos</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                className="w-full"
                disabled={isInitializing}
              >
                {isInitializing ? "Inicializando..." : "Inicializar Base de Datos"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción creará la base de datos MongoDB y las colecciones necesarias.
                  Se crearán las siguientes colecciones:
                  <ul className="list-disc pl-6 mt-2">
                    {collections.map((collection) => (
                      <li key={collection}>{collection}</li>
                    ))}
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleInitializeDatabase}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default TablesSetup;