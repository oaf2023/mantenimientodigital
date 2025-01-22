import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { MediaControls } from "./MediaControls";
import { PrioritySelect, PRIORITY_LEVELS } from "./PrioritySelect";

interface FieldAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FieldAlert({ open, onOpenChange }: FieldAlertProps) {
  const [priority, setPriority] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setMediaFiles(prev => [...prev, ...files]);
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

    console.log('Enviando alerta:', { priority, mediaFiles });
    toast({
      title: "Alerta enviada",
      description: `Prioridad: ${PRIORITY_LEVELS[priority as keyof typeof PRIORITY_LEVELS].label}`,
    });
    
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
          <MediaControls onFileUpload={handleFileUpload} />
          
          <div className="text-sm text-muted-foreground">
            {mediaFiles.length} archivo(s) seleccionado(s)
          </div>

          <PrioritySelect value={priority} onValueChange={setPriority} />

          <Button onClick={handleSubmit} className="mt-4">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Enviar Alerta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}