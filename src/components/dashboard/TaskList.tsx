import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Task {
  title: string;
  status?: string;
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
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {tasks.map((task) => (
                <div key={task.title} className="flex items-center justify-between p-1.5 bg-gray-50 rounded text-sm">
                  <span className="text-sm">{task.title}</span>
                  {showStatus ? (
                    <span className="px-2 py-0.5 text-xs bg-accent text-white rounded">
                      {task.status || 'Atención'}
                    </span>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="text-xs py-1 h-7">Ver Detalles</Button>
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
  );
}