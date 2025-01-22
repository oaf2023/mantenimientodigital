import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { WorkOrder } from "@/types/workOrder";

export function WorkOrderList() {
  // This would typically come from an API or state management
  const workOrders: WorkOrder[] = [];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número de Orden</TableHead>
            <TableHead>Fecha Emisión</TableHead>
            <TableHead>Equipo</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No hay órdenes de trabajo registradas
              </TableCell>
            </TableRow>
          ) : (
            workOrders.map((order) => (
              <TableRow key={order.numeroOrden}>
                <TableCell>{order.numeroOrden}</TableCell>
                <TableCell>{order.fechaEmision}</TableCell>
                <TableCell>{order.nombreEquipo}</TableCell>
                <TableCell>{order.prioridad}</TableCell>
                <TableCell>{order.estadoTrabajo}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}