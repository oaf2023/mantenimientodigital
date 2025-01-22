import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { mongoClient } from "@/lib/mongodb";

const DataSetup = () => {
  const { toast } = useToast();
  const [storageType, setStorageType] = useState("local");
  const [path, setPath] = useState("");

  useEffect(() => {
    // Cargar configuración guardada
    const savedConfig = localStorage.getItem('storageConfig');
    if (savedConfig) {
      const config = JSON.parse(savedConfig);
      setStorageType(config.storageType);
      setPath(config.path);
    }
  }, []);

  const handleSave = async () => {
    try {
      // Guardar configuración
      const config = { storageType, path };
      localStorage.setItem('storageConfig', JSON.stringify(config));

      // Intentar conectar con MongoDB
      await mongoClient.connect();
      
      toast({
        title: "Configuración guardada",
        description: "La conexión con MongoDB se ha establecido correctamente",
      });
    } catch (error) {
      console.error("Error al conectar con MongoDB:", error);
      toast({
        title: "Error de conexión",
        description: "No se pudo establecer la conexión con MongoDB. Verifique la configuración.",
        variant: "destructive"
      });
    }
  };

  const getPathPlaceholder = () => {
    switch (storageType) {
      case 'local':
        return 'mongodb://localhost:27017';
      case 'server':
        return 'ejemplo: 192.168.1.100 o servidor.dominio.com';
      case 'cloud':
        return 'mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net';
      default:
        return '';
    }
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
                <SelectItem value="cloud">Nube (MongoDB Atlas)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="path">Conexión MongoDB</Label>
            <Input
              id="path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder={getPathPlaceholder()}
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