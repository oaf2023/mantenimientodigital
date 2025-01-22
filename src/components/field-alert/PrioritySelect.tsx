import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PRIORITY_LEVELS = {
  critical: { label: "Crítico", color: "bg-red-500" },
  urgent: { label: "Urgente", color: "bg-orange-500" },
  quick: { label: "Rápido", color: "bg-yellow-500" },
  moderate: { label: "Moderado", color: "bg-blue-500" },
  consider: { label: "A considerar", color: "bg-gray-500" },
} as const;

interface PrioritySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function PrioritySelect({ value, onValueChange }: PrioritySelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Nivel de Prioridad</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccione el nivel de prioridad" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(PRIORITY_LEVELS).map(([key, { label }]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}