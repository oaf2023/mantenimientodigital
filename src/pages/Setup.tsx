import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface CompanyData {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
}

const Setup = () => {
  const { toast } = useToast();
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "",
    address: "",
    phone: "",
    email: "",
    logo: "",
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyData(prev => ({
          ...prev,
          logo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guardar en localStorage para persistencia
    localStorage.setItem('companyData', JSON.stringify(companyData));
    toast({
      title: "Configuración guardada",
      description: "Los datos de la empresa se han guardado correctamente",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Configuración de la Empresa</h1>
      <Card>
        <CardHeader>
          <CardTitle>Datos Empresariales</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="logo">Logo de la Empresa</Label>
                <div className="mt-2 flex items-center gap-4">
                  {companyData.logo && (
                    <img 
                      src={companyData.logo} 
                      alt="Logo de la empresa" 
                      className="w-20 h-20 object-contain"
                    />
                  )}
                  <div className="flex-1">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="name">Nombre de la Empresa</Label>
                <Input
                  id="name"
                  value={companyData.name}
                  onChange={(e) => setCompanyData(prev => ({...prev, name: e.target.value}))}
                />
              </div>

              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData(prev => ({...prev, address: e.target.value}))}
                />
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={companyData.phone}
                  onChange={(e) => setCompanyData(prev => ({...prev, phone: e.target.value}))}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData(prev => ({...prev, email: e.target.value}))}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Guardar Configuración
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setup;