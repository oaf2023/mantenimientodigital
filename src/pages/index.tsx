import { useEffect, useState } from "react";
import axios from "axios";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Users 
} from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-lg">Cargando datos...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="p-3 text-sm shadow-md">
          <div className="font-medium">
            {format(new Date(), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}
          </div>
          <div className="text-lg font-bold text-secondary">
            {format(new Date(), "HH:mm:ss")}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5 mb-6">
        <StatCard
          title="Órdenes Activas"
          value={dashboardData?.ordenes_activas || 0}
          Icon={ClipboardList}
          description="Número total de órdenes de trabajo actualmente en proceso"
        />
        <StatCard
          title="Tiempo Medio Reparación"
          value={`${dashboardData?.tiempo_medio_reparacion || 0}h`}
          Icon={Clock}
          description="Tiempo promedio que toma completar una orden de trabajo"
        />
        <StatCard
          title="Completadas Hoy"
          value={dashboardData?.completadas_hoy || 0}
          Icon={CheckCircle2}
          description="Cantidad de órdenes de trabajo completadas en el día"
        />
        <StatCard
          title="Costo Medio Reparación"
          value={`$${dashboardData?.costo_medio_reparacion || 0}`}
          Icon={DollarSign}
          description="Costo promedio por reparación realizada"
        />
        <StatCard
          title="Personal por Orden"
          value={dashboardData?.personal_por_orden || 0}
          Icon={Users}
          description="Cantidad media de personal asignado por orden de trabajo"
        />
      </div>

      <TaskList
        title="Órdenes Pendientes"
        tasks={dashboardData?.ordenes_pendientes || []}
        description="Lista de órdenes de trabajo que requieren atención"
      />

      <StatisticsCard 
        weeklyData={dashboardData?.ordenes_semanales || []} 
        monthlyData={dashboardData?.estado_mensual || []} 
      />
    </div>
  );
};

export default Dashboard;