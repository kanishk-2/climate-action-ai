import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Coins, Thermometer, TrendingUp } from "lucide-react";
import type { ClimateMetrics } from "@shared/schema";

export default function ClimateMetrics() {
  const { data: metrics, isLoading } = useQuery<ClimateMetrics>({
    queryKey: ["/api/climate-metrics"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-white shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700">Global CO₂ Level</p>
              <p className="text-2xl font-bold text-error-red">{metrics?.co2Level} ppm</p>
              <p className="text-xs text-error-red mt-1">↗ +2.1% from last year</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Activity className="text-error-red text-xl" size={20} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700">Credits Allocated</p>
              <p className="text-2xl font-bold text-success-green">
                {metrics?.creditsAllocated ? `${(metrics.creditsAllocated / 1000000).toFixed(1)}M tons` : '0M tons'}
              </p>
              <p className="text-xs text-success-green mt-1">↗ +15% this month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Coins className="text-success-green text-xl" size={20} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700">Global Temperature</p>
              <p className="text-2xl font-bold text-warning-yellow">+{metrics?.temperature}°C</p>
              <p className="text-xs text-warning-yellow mt-1">Above pre-industrial</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Thermometer className="text-warning-yellow text-xl" size={20} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700">Policy Impact Score</p>
              <p className="text-2xl font-bold text-ibm-blue">{metrics?.policyScore}/10</p>
              <p className="text-xs text-ibm-blue mt-1">Effectiveness rating</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <TrendingUp className="text-ibm-blue text-xl" size={20} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
