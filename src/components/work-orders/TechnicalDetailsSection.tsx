import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { WorkOrder } from "@/types/workOrder";

interface TechnicalDetailsSectionProps {
  form: UseFormReturn<WorkOrder>;
}

export function TechnicalDetailsSection({ form }: TechnicalDetailsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fabricante"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fabricante</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="modeloNumeroSerie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo/Número de Serie</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="horasOperacion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Horas de Operación</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="herramientasEspeciales"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Herramientas Especiales</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="manoObraRequerida"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mano de Obra Requerida</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tiempoEstimado"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tiempo Estimado (horas)</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}