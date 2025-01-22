import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkOrder } from "@/types/workOrder";
import { Switch } from "@/components/ui/switch";
import { MediaControls } from "@/components/field-alert/MediaControls";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { TechnicalDetailsSection } from "./TechnicalDetailsSection";
import { SafetySection } from "./SafetySection";

interface WorkOrderFormProps {
  onComplete: () => void;
  initialData?: WorkOrder;
}

export function WorkOrderForm({ onComplete, initialData }: WorkOrderFormProps) {
  const form = useForm<WorkOrder>();
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const generateOrderNumber = () => {
    const now = new Date();
    const date = now.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '');
    const time = now.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(':', '');
    return `${date}_${time}_01_TAG001`;
  };

  const onSubmit = (data: WorkOrder) => {
    console.log('Form submitted:', { ...data, mediaFiles });
    toast({
      title: "Orden de trabajo creada",
      description: "La orden se ha guardado correctamente",
    });
    onComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="numeroOrden"
            defaultValue={generateOrderNumber()}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Orden</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fechaEmision"
              defaultValue={new Date().toISOString().split('T')[0]}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Emisión</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fechaEjecucionProgramada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Ejecución Programada</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="prioridad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioridad</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione la prioridad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Media">Media</SelectItem>
                      <SelectItem value="Baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoMantenimiento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Mantenimiento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Preventivo">Preventivo</SelectItem>
                      <SelectItem value="Correctivo">Correctivo</SelectItem>
                      <SelectItem value="Predictivo">Predictivo</SelectItem>
                      <SelectItem value="Mejora">Mejora</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="solicitante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solicitante</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsableMantenimiento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsable de Mantenimiento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nombreEquipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Equipo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codigoEquipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código del Equipo (Tag)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ubicacionEquipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación del Equipo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ubicacionFisica"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación Física</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="enAltura"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Trabajo en Altura</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descripcionDetallada"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción Detallada</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <TechnicalDetailsSection form={form} />
        <SafetySection form={form} />

        <div className="space-y-4">
          <MediaControls onFileUpload={(files) => setMediaFiles(prev => [...prev, ...files])} />
          <span className="text-sm text-muted-foreground">
            {mediaFiles.length} archivo(s) seleccionado(s)
          </span>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onComplete}>
            Cancelar
          </Button>
          <Button type="submit">Guardar Orden</Button>
        </div>
      </form>
    </Form>
  );
}