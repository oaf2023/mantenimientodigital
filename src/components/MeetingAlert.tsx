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

interface MeetingAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MeetingAlert({ open, onOpenChange }: MeetingAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Iniciar Reunión
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta funcionalidad de videollamadas estará disponible próximamente.
            Podrás realizar llamadas individuales o grupales con tu equipo de trabajo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              Entendido
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}