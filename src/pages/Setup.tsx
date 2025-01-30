import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CompanyForm } from "@/components/setup/CompanyForm";
import axios from "axios";

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
  disco?: string;
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
      contactName: "",
      disco: ""
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save to PythonAnywhere API
      await axios.post('https://oaf.pythonanywhere.com/api/update-empresa', companyData);
      
      // Save to localStorage for local state management
      localStorage.setItem('companyData', JSON.stringify(companyData));
      
      toast({
        title: "Configuración guardada",
        description: "Los datos de la empresa se han guardado correctamente",
      });
    } catch (error) {
      console.error('Error saving company data:', error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los datos de la empresa",
        variant: "destructive",
      });
    }
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