import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CompanyLogo } from "./CompanyLogo";
import { DatabaseConfigButton } from "../DatabaseConfigButton";

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

interface CompanyFormProps {
  data: CompanyData;
  onChange: (data: CompanyData) => void;
}

export function CompanyForm({ data, onChange }: CompanyFormProps) {
  const handleChange = (field: keyof CompanyData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <CompanyLogo 
        logo={data.logo} 
        onLogoChange={(logo) => handleChange('logo', logo)} 
      />
      
      <div>
        <Label htmlFor="name">Nombre de la Empresa</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="taxCondition">Condición de IVA</Label>
        <Select 
          value={data.taxCondition}
          onValueChange={(value) => handleChange('taxCondition', value)}
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
          value={data.cuit}
          onChange={(e) => handleChange('cuit', e.target.value)}
          placeholder="XX-XXXXXXXX-X"
        />
      </div>

      <div>
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          value={data.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="country">País</Label>
          <Input
            id="country"
            value={data.country}
            onChange={(e) => handleChange('country', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="province">Provincia</Label>
          <Input
            id="province"
            value={data.province}
            onChange={(e) => handleChange('province', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="city">Localidad</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="contactName">Nombre de Contacto</Label>
        <Input
          id="contactName"
          value={data.contactName}
          onChange={(e) => handleChange('contactName', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Label>Configuración de Base de Datos</Label>
        <DatabaseConfigButton />
      </div>
    </div>
  );
}