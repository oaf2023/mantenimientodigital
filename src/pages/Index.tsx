import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Activity, Clock, CheckCircle2, DollarSign } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";

const Dashboard = () => {
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
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard
          title="Órdenes Activas"
          value={12}
          Icon={Activity}
          description="Número total de órdenes de trabajo actualmente en proceso"
        />
        <StatCard
          title="Tiempo Medio Reparación"
          value="2.5h"
          Icon={Clock}
          iconClassName="text-accent"
          description="Tiempo promedio que toma completar una orden de trabajo"
        />
        <StatCard
          title="Completadas Hoy"
          value={8}
          Icon={CheckCircle2}
          description="Cantidad de órdenes de trabajo completadas en el día"
        />
        <StatCard
          title="Costo Medio Reparación"
          value="$2,450"
          Icon={DollarSign}
          description="Costo promedio por reparación realizada"
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
        <TaskList 
          title="Órdenes Pendientes" 
          tasks={pendingTasks} 
          description="Lista de órdenes de trabajo que requieren atención"
        />
        <TaskList 
          title="Equipos Críticos" 
          tasks={criticalEquipment} 
          showStatus 
          description="Equipos que requieren atención prioritaria"
        />
      </div>

      <StatisticsCard 
        weeklyData={weeklyData} 
        monthlyData={monthlyData} 
      />
    </div>
  );
};

export default Dashboard;