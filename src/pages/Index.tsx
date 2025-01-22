import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Plus, Activity, Clock, CheckCircle2, Settings, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const weeklyData = [
    { name: 'Completadas', value: 35 },
    { name: 'Pendientes', value: 15 },
  ];

  const monthlyData = [
    { name: 'Completadas', value: 120 },
    { name: 'Falta Repuestos', value: 20 },
    { name: 'Falta Tiempo', value: 15 },
    { name: 'Falta Personal', value: 10 },
  ];

  const pendingTasks = [
    "Revisión Bomba #123",
    "Calibración Sensor PT100",
    "Lubricación Cinta #2"
  ].map(title => ({ title }));

  const criticalEquipment = [
    "Bomba Centrífuga #2",
    "Motor Principal",
    "Compresor Industrial"
  ].map(title => ({ title }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/setup")}>
            <Settings className="mr-2 h-4 w-4" /> Configuración
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nueva Orden
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard
          title="Órdenes Activas"
          value={12}
          Icon={Activity}
        />
        <StatCard
          title="Tiempo Medio Reparación"
          value="2.5h"
          Icon={Clock}
          iconClassName="text-accent"
        />
        <StatCard
          title="Completadas Hoy"
          value={8}
          Icon={CheckCircle2}
        />
        <StatCard
          title="Costo Medio Reparación"
          value="$2,450"
          Icon={DollarSign}
        />
      </div>

      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atención Requerida</AlertTitle>
        <AlertDescription>
          3 equipos requieren mantenimiento preventivo esta semana.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <TaskList title="Órdenes Pendientes" tasks={pendingTasks} />
        <TaskList title="Equipos Críticos" tasks={criticalEquipment} showStatus />
      </div>

      <StatisticsCard weeklyData={weeklyData} monthlyData={monthlyData} />
    </div>
  );
};

export default Dashboard;