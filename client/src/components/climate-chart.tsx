import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ClimateData {
  co2Levels: {
    labels: string[];
    data: number[];
  };
  temperatureAnomalies: {
    labels: string[];
    data: number[];
  };
  emissionsBySection: {
    labels: string[];
    data: number[];
  };
}

export default function ClimateChart() {
  const { data: climateData, isLoading } = useQuery<ClimateData>({
    queryKey: ["/api/climate-data"],
  });

  if (isLoading) {
    return (
      <Card className="bg-white shadow">
        <CardHeader>
          <CardTitle>Climate Trends Analysis</CardTitle>
          <p className="text-sm text-neutral-700">Historical and projected data</p>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  const chartData = {
    labels: climateData?.co2Levels?.labels || [],
    datasets: [
      {
        label: "CO₂ Levels (ppm)",
        data: climateData?.co2Levels?.data || [],
        borderColor: "rgb(218, 30, 40)",
        backgroundColor: "rgba(218, 30, 40, 0.1)",
        tension: 0.4,
        yAxisID: "y",
      },
      {
        label: "Global Temperature Anomaly (°C)",
        data: climateData?.temperatureAnomalies?.data || [],
        borderColor: "rgb(241, 194, 27)",
        backgroundColor: "rgba(241, 194, 27, 0.1)",
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "CO₂ (ppm)",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <Card className="bg-white shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">Climate Trends Analysis</CardTitle>
        <p className="text-sm text-neutral-700">Historical and projected data</p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
