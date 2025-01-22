import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WorkOrderList } from "@/components/work-orders/WorkOrderList";
import { WorkOrderForm } from "@/components/work-orders/WorkOrderForm";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export default function WorkOrdersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOrderComplete = () => {
    setIsFormOpen(false);
    toast({
      title: "Orden de trabajo creada",
      description: "La orden se ha guardado correctamente",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Órdenes de Trabajo</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Orden
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nueva Orden de Trabajo</DialogTitle>
              <DialogDescription>
                Complete los detalles de la nueva orden de trabajo
              </DialogDescription>
            </DialogHeader>
            <WorkOrderForm onComplete={handleOrderComplete} />
          </DialogContent>
        </Dialog>
      </div>
      <WorkOrderList />
    </div>
  );
}