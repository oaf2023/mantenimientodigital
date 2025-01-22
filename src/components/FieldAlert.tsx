import { useState } from "react";
import { Camera, Video, Upload, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const PRIORITY_LEVELS = {
  critical: { label: "Crítico", color: "bg-red-500" },
  urgent: { label: "Urgente", color: "bg-orange-500" },
  quick: { label: "Rápido", color: "bg-yellow-500" },
  moderate: { label: "Moderado", color: "bg-blue-500" },
  consider: { label: "A considerar", color: "bg-gray-500" },
};

export function FieldAlert({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [priority, setPriority] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const handleCapture = async (type: 'photo' | 'video') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: type === 'video'
      });
      
      // Aquí iría la lógica para capturar foto/video
      // Por ahora solo mostramos un mensaje
      toast({
        title: `Captura de ${type === 'photo' ? 'foto' : 'video'} iniciada`,
        description: "Esta función estará disponible próximamente",
      });
      
      // Importante: liberar la cámara
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo acceder a la cámara",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setMediaFiles(prev => [...prev, ...Array.from(files)]);
      toast({
        title: "Archivos añadidos",
        description: `${files.length} archivo(s) añadido(s)`,
      });
    }
  };

  const handleSubmit = () => {
    if (!priority) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor seleccione un nivel de prioridad",
      });
      return;
    }

    // Aquí iría la lógica para enviar los archivos y la alerta
    console.log('Enviando alerta:', { priority, mediaFiles });
    toast({
      title: "Alerta enviada",
      description: `Prioridad: ${PRIORITY_LEVELS[priority as keyof typeof PRIORITY_LEVELS].label}`,
    });
    
    // Limpiar el formulario
    setPriority("");
    setMediaFiles([]);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Captura en Campo</SheetTitle>
          <SheetDescription>
            Capture fotos o videos y envíe una alerta al sistema
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => handleCapture('photo')}>
              <Camera className="mr-2 h-4 w-4" />
              Tomar Foto
            </Button>
            <Button onClick={() => handleCapture('video')}>
              <Video className="mr-2 h-4 w-4" />
              Grabar Video
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <label>
                <Upload className="mr-2 h-4 w-4" />
                Subir Archivos
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </Button>
            <span className="text-sm text-muted-foreground">
              {mediaFiles.length} archivo(s) seleccionado(s)
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nivel de Prioridad</label>
            <Select value={priority} onValueChange={setPriority}>
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

          <Button onClick={handleSubmit} className="mt-4">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Enviar Alerta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}