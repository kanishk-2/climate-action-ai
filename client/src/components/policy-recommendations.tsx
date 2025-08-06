import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePolicyReport } from "@/lib/report-generator";
import type { PolicyRecommendation, ClimateMetrics, CarbonCredit } from "@shared/schema";

export default function PolicyRecommendations() {
  const { toast } = useToast();
  
  const { data: policies = [], isLoading } = useQuery<PolicyRecommendation[]>({
    queryKey: ["/api/policy-recommendations"],
  });

  const { data: climateMetrics } = useQuery<ClimateMetrics>({
    queryKey: ["/api/climate-metrics"],
  });

  const { data: carbonCredits = [] } = useQuery<CarbonCredit[]>({
    queryKey: ["/api/carbon-credits"],
  });

  const { data: climateData } = useQuery({
    queryKey: ["/api/climate-data"],
  });

  const handleExportReport = () => {
    try {
      generatePolicyReport({
        climateMetrics,
        policies,
        carbonCredits,
        climateData
      });
      
      toast({
        title: "Report Downloaded",
        description: "Policy recommendations report has been downloaded successfully.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the report. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High Priority":
        return "bg-success-green text-white";
      case "Medium Priority":
        return "bg-ibm-blue text-white";
      default:
        return "bg-warning-yellow text-white";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Industry":
        return "🏭";
      case "Transportation":
        return "🚗";
      case "Urban Planning":
        return "🌱";
      default:
        return "📋";
    }
  };

  return (
    <Card className="bg-white shadow mb-8">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">AI-Generated Policy Recommendations</CardTitle>
        <p className="text-sm text-neutral-700">Evidence-based climate policy suggestions tailored to your region</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {policies.map((policy) => (
                <div key={policy.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-xl">
                      {getCategoryIcon(policy.category)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral-900">{policy.title}</h4>
                      <Badge className={getPriorityColor(policy.priority)}>
                        {policy.priority}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-700 mb-4">{policy.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-700">Projected Impact:</span>
                      <span className="font-medium text-success-green">{policy.projectedImpact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-700">Implementation Cost:</span>
                      <span className="font-medium">{policy.implementationCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-700">Timeline:</span>
                      <span className="font-medium">{policy.timeline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="text-sm text-neutral-700">
                  <span className="font-medium">Combined Impact:</span> Projected 26% emissions reduction over 5 years
                </div>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={handleExportReport}
                    disabled={isLoading}
                  >
                    <Download className="mr-2" size={16} />
                    Export Report
                  </Button>
                  <Button className="bg-ibm-blue text-white hover:bg-blue-700 flex items-center">
                    <Rocket className="mr-2" size={16} />
                    Start Implementation
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
