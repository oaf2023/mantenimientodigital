import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Task {
  title: string;
  status?: string;
}

interface TaskListProps {
  title: string;
  tasks: Task[];
  showStatus?: boolean;
}

export function TaskList({ title, tasks, showStatus = false }: TaskListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.title} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span>{task.title}</span>
              {showStatus ? (
                <span className="px-2 py-1 text-xs bg-accent text-white rounded">
                  {task.status || 'Atención'}
                </span>
              ) : (
                <Button variant="outline" size="sm">Ver Detalles</Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}