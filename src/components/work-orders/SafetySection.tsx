import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { WorkOrder } from "@/types/workOrder";

interface SafetySectionProps {
  form: UseFormReturn<WorkOrder>;
}

export function SafetySection({ form }: SafetySectionProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="peligrosIdentificados"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Peligros Identificados</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="medidasSeguridad"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medidas de Seguridad</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="impactoAmbiental"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Impacto Ambiental</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}