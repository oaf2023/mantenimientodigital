import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const DataSetup = () => {
  const { toast } = useToast();
  const [storageType, setStorageType] = useState("local");
  const [path, setPath] = useState("");

  const handleSave = () => {
    // Aquí se implementará la lógica para guardar la configuración
    toast({
      title: "Configuración guardada",
      description: "La configuración de almacenamiento se ha actualizado correctamente",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Configuración de Data</h1>
      <Card>
        <CardHeader>
          <CardTitle>Almacenamiento del Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storage-type">Tipo de Almacenamiento</Label>
            <Select value={storageType} onValueChange={setStorageType}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione tipo de almacenamiento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Máquina Local</SelectItem>
                <SelectItem value="server">Servidor</SelectItem>
                <SelectItem value="cloud">Nube</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="path">Directorio de Almacenamiento</Label>
            <Input
              id="path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder={storageType === 'local' ? 'C:/GMAO/data' : storageType === 'server' ? '\\\\servidor\\GMAO\\data' : 'bucket/GMAO/data'}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Guardar Configuración
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSetup;