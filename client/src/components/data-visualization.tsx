import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ClimateData {
  emissionsBySection: {
    labels: string[];
    data: number[];
  };
}

export default function DataVisualization() {
  const { data: climateData, isLoading } = useQuery<ClimateData>({
    queryKey: ["/api/climate-data"],
  });

  const emissionsChartData = {
    labels: climateData?.emissionsBySection?.labels || [],
    datasets: [
      {
        data: climateData?.emissionsBySection?.data || [],
        backgroundColor: [
          "#DA1E28",
          "#F1C21B",
          "#0F62FE",
          "#198038",
          "#8A3FFC",
          "#525252",
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  const portfolioData = [
    { name: "Renewable Energy", credits: 450, percentage: 36, color: "bg-success-green" },
    { name: "Forest Conservation", credits: 300, percentage: 24, color: "bg-climate-green" },
    { name: "Methane Capture", credits: 497, percentage: 40, color: "bg-warning-yellow" },
  ];

  const totalValue = 34710;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-neutral-900">Emission Sources Breakdown</CardTitle>
          <p className="text-sm text-neutral-700">Current distribution by sector</p>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="h-64">
              <Doughnut data={emissionsChartData} options={chartOptions} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-neutral-900">Carbon Credit Portfolio</CardTitle>
          <p className="text-sm text-neutral-700">Allocation across project types</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 ${item.color} rounded mr-3`}></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-neutral-700">{item.credits} credits</span>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Portfolio Value</span>
                <span className="text-lg font-bold text-climate-green">
                  ${totalValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
