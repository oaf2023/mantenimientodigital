import { Card } from "@/components/ui/card";

const TablesSetup = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Configuración de Tablas</h1>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Clasificación de Activos</h2>
        <p className="text-muted-foreground">
          Configure las tablas y categorías para la clasificación de activos del sistema.
        </p>
      </Card>
    </div>
  );
};

export default TablesSetup;