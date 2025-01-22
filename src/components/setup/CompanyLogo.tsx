import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CompanyLogoProps {
  logo: string;
  onLogoChange: (logo: string) => void;
}

export function CompanyLogo({ logo, onLogoChange }: CompanyLogoProps) {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Label htmlFor="logo">Logo de la Empresa</Label>
      <div className="mt-2 flex items-center gap-4">
        {logo && (
          <img 
            src={logo} 
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
  );
}