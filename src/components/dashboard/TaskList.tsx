import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Task {
  title: string;
  status?: string;
  orderDetails?: {
    date: string;
    time: string;
    area: string;
    tag: string;
    description?: string;
    equipment?: string;
    priority?: string;
    assignedTo?: string;
  };
}

interface TaskListProps {
  title: string;
  tasks: Task[];
  showStatus?: boolean;
  description?: string;
}

export function TaskList({ 
  title, 
  tasks, 
  showStatus = false, 
  description = `Lista de ${title.toLowerCase()}`
}: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formatOrderNumber = (task: Task) => {
    if (!task.orderDetails) return task.title;
    const { date, time, area, tag } = task.orderDetails;
    return `${date}_${time}_${area}_${tag}`;
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0.5">
                {tasks.map((task) => (
                  <div key={task.title} className="flex items-center justify-between p-1 bg-gray-50 rounded text-xs">
                    <span>{formatOrderNumber(task)}</span>
                    {showStatus ? (
                      <span className="px-1.5 py-0.5 text-xs bg-accent text-white rounded">
                        {task.status || 'Atención'}
                      </span>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs py-0.5 h-6 px-2"
                            onClick={() => {
                              setSelectedTask(task);
                              setIsDialogOpen(true);
                            }}
                          >
                            Ver Detalles
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ver detalles completos de esta tarea</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Orden de Trabajo</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm">Número de Orden</h4>
                  <p className="text-sm">{formatOrderNumber(selectedTask)}</p>
                </div>
                {selectedTask.orderDetails?.equipment && (
                  <div>
                    <h4 className="font-semibold text-sm">Equipo</h4>
                    <p className="text-sm">{selectedTask.orderDetails.equipment}</p>
                  </div>
                )}
                {selectedTask.orderDetails?.priority && (
                  <div>
                    <h4 className="font-semibold text-sm">Prioridad</h4>
                    <p className="text-sm">{selectedTask.orderDetails.priority}</p>
                  </div>
                )}
                {selectedTask.orderDetails?.assignedTo && (
                  <div>
                    <h4 className="font-semibold text-sm">Asignado a</h4>
                    <p className="text-sm">{selectedTask.orderDetails.assignedTo}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-sm">Fecha</h4>
                  <p className="text-sm">{selectedTask.orderDetails?.date}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Hora</h4>
                  <p className="text-sm">{selectedTask.orderDetails?.time}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Área</h4>
                  <p className="text-sm">{selectedTask.orderDetails?.area}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Tag</h4>
                  <p className="text-sm">{selectedTask.orderDetails?.tag}</p>
                </div>
              </div>
              {selectedTask.orderDetails?.description && (
                <div>
                  <h4 className="font-semibold text-sm">Descripción</h4>
                  <p className="text-sm">{selectedTask.orderDetails.description}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}