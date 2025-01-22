import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Activity, Clock, CheckCircle2, DollarSign, Users } from "lucide-react";
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
    { 
      title: "OT-001",
      orderDetails: {
        date: "15032024",
        time: "1430",
        area: "MANT",
        tag: "BOM01",
        equipment: "Bomba Centrífuga #123",
        priority: "Alta",
        description: "Revisión y mantenimiento preventivo de bomba centrífuga",
        assignedTo: "Juan Pérez"
      }
    },
    { 
      title: "OT-002",
      orderDetails: {
        date: "15032024",
        time: "1445",
        area: "ELEC",
        tag: "MOT02",
        equipment: "Motor Principal #456",
        priority: "Media",
        description: "Calibración de sensor de temperatura",
        assignedTo: "María González"
      }
    },
    { 
      title: "OT-003",
      orderDetails: {
        date: "15032024",
        time: "1500",
        area: "MEC",
        tag: "CIN03",
        equipment: "Cinta Transportadora #789",
        priority: "Baja",
        description: "Lubricación programada",
        assignedTo: "Carlos Rodríguez"
      }
    }
  ];

  const criticalEquipment = [
    { title: "Bomba Centrífuga #2" },
    { title: "Motor Principal" },
    { title: "Compresor Industrial" }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-5 mb-6">
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
        <StatCard
          title="Personal por Orden"
          value="3.5"
          Icon={Users}
          iconClassName="text-blue-500"
          description="Cantidad media de personal asignado por orden de trabajo"
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
