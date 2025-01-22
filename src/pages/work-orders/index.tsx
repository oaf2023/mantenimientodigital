import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WorkOrderList } from "@/components/work-orders/WorkOrderList";
import { WorkOrderForm } from "@/components/work-orders/WorkOrderForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function WorkOrdersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
            <WorkOrderForm onComplete={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <WorkOrderList />
    </div>
  );
}