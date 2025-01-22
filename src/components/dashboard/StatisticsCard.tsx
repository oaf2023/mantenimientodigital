import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const COLORS = ['#16A34A', '#EA580C', '#EF4444', '#F59E0B'];

interface StatisticsCardProps {
  weeklyData: Array<{ name: string; value: number }>;
  monthlyData: Array<{ name: string; value: number }>;
}

export function StatisticsCard({ weeklyData, monthlyData }: StatisticsCardProps) {
  return (
    <UITooltip>
      <TooltipTrigger asChild>
        <Card className="w-full">
          <CardHeader className="pb-1">
            <CardTitle className="text-base">Estadísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold mb-2">Órdenes Semanales</h3>
                <ChartContainer className="h-[200px]" config={{}}>
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#16A34A" />
                  </BarChart>
                </ChartContainer>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Estado Mensual de Órdenes</h3>
                <ChartContainer className="h-[200px]" config={{}}>
                  <PieChart>
                    <Pie
                      data={monthlyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={60}
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
      </TooltipTrigger>
      <TooltipContent>
        <p>Visualización de estadísticas semanales y mensuales de órdenes de trabajo</p>
      </TooltipContent>
    </UITooltip>
  );
}