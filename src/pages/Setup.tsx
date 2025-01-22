import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CompanyForm } from "@/components/setup/CompanyForm";

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
            <CompanyForm data={companyData} onChange={setCompanyData} />
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