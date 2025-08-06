import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import type { CarbonCredit } from "@shared/schema";

export default function CarbonCredits() {
  const [recommendations, setRecommendations] = useState<any>(null);

  const { data: credits = [], isLoading } = useQuery<CarbonCredit[]>({
    queryKey: ["/api/carbon-credits"],
  });

  const generateRecommendationsMutation = useMutation({
    mutationFn: async (data: { footprint: number; organizationType: string }) => {
      const response = await apiRequest("POST", "/api/carbon-credits/recommendations", data);
      return response.json();
    },
    onSuccess: (data) => {
      setRecommendations(data);
    },
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High Impact":
        return "bg-success-green text-white";
      case "Medium Impact":
        return "bg-ibm-blue text-white";
      default:
        return "bg-warning-yellow text-white";
    }
  };

  const displayCredits = recommendations?.recommendations || credits;
  const totalCredits = recommendations?.totalCredits || credits.reduce((sum, credit) => sum + credit.creditsAmount, 0);
  const totalCost = recommendations?.totalCost || credits.reduce((sum, credit) => sum + credit.cost, 0);

  return (
    <Card className="bg-white shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">Carbon Credit Recommendations</CardTitle>
        <p className="text-sm text-neutral-700">AI-optimized credit allocation suggestions</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {displayCredits.map((credit: any, index: number) => (
              <div key={credit.id || index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-neutral-900">{credit.projectType}</h4>
                  <Badge className={getImpactColor(credit.impactLevel)}>
                    {credit.impactLevel}
                  </Badge>
                </div>
                <p className="text-sm text-neutral-700 mb-3">{credit.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Recommended: {credit.creditsAmount} credits
                  </span>
                  <span className="text-sm text-climate-green">
                    ${credit.cost.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total Recommended Credits:</span>
                <span className="text-lg font-bold text-climate-green">
                  {totalCredits.toLocaleString()} credits
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total Cost:</span>
                <span className="text-lg font-bold text-climate-green">
                  ${totalCost.toLocaleString()}
                </span>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => generateRecommendationsMutation.mutate({ footprint: 1247, organizationType: "Manufacturing Company" })}
                  disabled={generateRecommendationsMutation.isPending}
                  className="w-full bg-neutral-700 text-white hover:bg-neutral-800"
                >
                  {generateRecommendationsMutation.isPending ? "Generating..." : "Generate AI Recommendations"}
                </Button>
                <Button className="w-full bg-ibm-blue text-white hover:bg-blue-700">
                  Allocate Credits
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
