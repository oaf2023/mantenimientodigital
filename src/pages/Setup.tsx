import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompanyData {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  taxCondition: string;
  cuit: string;
  province: string;
  city: string;
  country: string;
  contactName: string;
}

const Setup = () => {
  const { toast } = useToast();
  const [companyData, setCompanyData] = useState<CompanyData>(() => {
    const savedData = localStorage.getItem('companyData');
    return savedData ? JSON.parse(savedData) : {
      name: "",
      address: "",
      phone: "",
      email: "",
      logo: "",
      taxCondition: "",
      cuit: "",
      province: "",
      city: "",
      country: "",
      contactName: ""
    };
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
                <Label htmlFor="taxCondition">Condición de IVA</Label>
                <Select 
                  value={companyData.taxCondition}
                  onValueChange={(value) => setCompanyData(prev => ({...prev, taxCondition: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione condición de IVA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monotributo">Monotributo</SelectItem>
                    <SelectItem value="exento">Exento</SelectItem>
                    <SelectItem value="responsable_inscripto">Responsable Inscripto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cuit">CUIT</Label>
                <Input
                  id="cuit"
                  value={companyData.cuit}
                  onChange={(e) => setCompanyData(prev => ({...prev, cuit: e.target.value}))}
                  placeholder="XX-XXXXXXXX-X"
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="country">País</Label>
                  <Input
                    id="country"
                    value={companyData.country}
                    onChange={(e) => setCompanyData(prev => ({...prev, country: e.target.value}))}
                  />
                </div>

                <div>
                  <Label htmlFor="province">Provincia</Label>
                  <Input
                    id="province"
                    value={companyData.province}
                    onChange={(e) => setCompanyData(prev => ({...prev, province: e.target.value}))}
                  />
                </div>

                <div>
                  <Label htmlFor="city">Localidad</Label>
                  <Input
                    id="city"
                    value={companyData.city}
                    onChange={(e) => setCompanyData(prev => ({...prev, city: e.target.value}))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contactName">Nombre de Contacto</Label>
                <Input
                  id="contactName"
                  value={companyData.contactName}
                  onChange={(e) => setCompanyData(prev => ({...prev, contactName: e.target.value}))}
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