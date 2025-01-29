import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetTypeTable } from "@/components/tables/AssetTypeTable";
import { FunctionalityTable } from "@/components/tables/FunctionalityTable";
import { CriticalityTable } from "@/components/tables/CriticalityTable";
import { LocationTable } from "@/components/tables/LocationTable";
import { MaintenanceTypeTable } from "@/components/tables/MaintenanceTypeTable";
import { LifecycleTable } from "@/components/tables/LifecycleTable";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const TablesSetup = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  const initializeDatabase = async () => {
    setIsInitializing(true);
    try {
      const response = await axios.post('https://oaf.pythonanywhere.com/api/initialize-database', {
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

      if (response.data.success) {
        toast({
          title: "Base de datos inicializada",
          description: "Las colecciones han sido creadas exitosamente.",
        });
        setIsInitialized(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo inicializar la base de datos.",
        variant: "destructive",
      });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Configuración de Tablas</h1>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline"
              disabled={isInitialized || isInitializing}
            >
              {isInitializing ? "Inicializando..." : "Inicializar Base de Datos"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Inicializar Base de Datos?</AlertDialogTitle>
              <AlertDialogDescription>
                Esto creará el directorio /mdigital/ y la base de datos MongoDB "mantenimientodigital" 
                con todas las colecciones necesarias. Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={initializeDatabase}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <Card className="p-6">
        <Tabs defaultValue="assetType" className="space-y-4">
          <TabsList className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <TabsTrigger value="assetType">Tipo de Activo</TabsTrigger>
            <TabsTrigger value="functionality">Funcionalidad</TabsTrigger>
            <TabsTrigger value="criticality">Importancia Crítica</TabsTrigger>
            <TabsTrigger value="location">Ubicación</TabsTrigger>
            <TabsTrigger value="maintenance">Modo de Mantenimiento</TabsTrigger>
            <TabsTrigger value="lifecycle">Ciclo de Vida</TabsTrigger>
          </TabsList>

          <TabsContent value="assetType">
            <AssetTypeTable />
          </TabsContent>
          
          <TabsContent value="functionality">
            <FunctionalityTable />
          </TabsContent>
          
          <TabsContent value="criticality">
            <CriticalityTable />
          </TabsContent>
          
          <TabsContent value="location">
            <LocationTable />
          </TabsContent>
          
          <TabsContent value="maintenance">
            <MaintenanceTypeTable />
          </TabsContent>
          
          <TabsContent value="lifecycle">
            <LifecycleTable />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TablesSetup;