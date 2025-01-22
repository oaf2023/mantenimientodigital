import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetTypeTable } from "@/components/tables/AssetTypeTable";
import { FunctionalityTable } from "@/components/tables/FunctionalityTable";
import { CriticalityTable } from "@/components/tables/CriticalityTable";
import { LocationTable } from "@/components/tables/LocationTable";
import { MaintenanceTypeTable } from "@/components/tables/MaintenanceTypeTable";
import { LifecycleTable } from "@/components/tables/LifecycleTable";

const TablesSetup = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Configuración de Tablas</h1>
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