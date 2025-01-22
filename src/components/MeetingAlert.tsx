import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useState } from "react";
import { VideoCall } from "./VideoCall";

interface MeetingAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MeetingAlert({ open, onOpenChange }: MeetingAlertProps) {
  const [showVideoCall, setShowVideoCall] = useState(false);

  const handleStartCall = () => {
    onOpenChange(false);
    setShowVideoCall(true);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Iniciar Reunión
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Deseas iniciar una videollamada? Esta es una demostración básica de la funcionalidad.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleStartCall}
              >
                Iniciar Demo
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showVideoCall && (
        <VideoCall onClose={() => setShowVideoCall(false)} />
      )}
    </>
  );
}