import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Plus, Activity, Clock, CheckCircle2, Settings, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();

  // Datos de ejemplo para los gráficos
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

  const COLORS = ['#16A34A', '#EA580C', '#EF4444', '#F59E0B'];

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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Activas</CardTitle>
            <Activity className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Medio Reparación</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas Hoy</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Medio Reparación</CardTitle>
            <DollarSign className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
          </CardContent>
        </Card>
      </div>

      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atención Requerida</AlertTitle>
        <AlertDescription>
          3 equipos requieren mantenimiento preventivo esta semana.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Órdenes Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Revisión Bomba #123", "Calibración Sensor PT100", "Lubricación Cinta #2"].map((task) => (
                <div key={task} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{task}</span>
                  <Button variant="outline" size="sm">Ver Detalles</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equipos Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Bomba Centrífuga #2", "Motor Principal", "Compresor Industrial"].map((equipment) => (
                <div key={equipment} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{equipment}</span>
                  <span className="px-2 py-1 text-xs bg-accent text-white rounded">Atención</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estadísticas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-4">Órdenes Semanales</h3>
              <ChartContainer className="h-[300px]" config={{}}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#16A34A" />
                </BarChart>
              </ChartContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Estado Mensual de Órdenes</h3>
              <ChartContainer className="h-[300px]" config={{}}>
                <PieChart>
                  <Pie
                    data={monthlyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {monthlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;