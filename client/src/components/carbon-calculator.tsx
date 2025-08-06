import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import type { CarbonCalculation } from "@shared/schema";

export default function CarbonCalculator() {
  const [formData, setFormData] = useState({
    organizationType: "",
    energyUse: "",
    transportation: "",
    wasteGeneration: "",
  });
  const [result, setResult] = useState<CarbonCalculation | null>(null);

  const calculateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/carbon-calculation", data);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateMutation.mutate({
      organizationType: formData.organizationType,
      energyUse: parseFloat(formData.energyUse),
      transportation: parseFloat(formData.transportation),
      wasteGeneration: parseFloat(formData.wasteGeneration),
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-white shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">Carbon Footprint Calculator</CardTitle>
        <p className="text-sm text-neutral-700">Calculate organizational or individual emissions</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-neutral-700 mb-2">Organization Type</Label>
            <Select value={formData.organizationType} onValueChange={(value) => handleInputChange("organizationType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manufacturing Company">Manufacturing Company</SelectItem>
                <SelectItem value="Government Agency">Government Agency</SelectItem>
                <SelectItem value="Non-profit Organization">Non-profit Organization</SelectItem>
                <SelectItem value="Individual">Individual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-neutral-700 mb-2">Annual Energy Use (kWh)</Label>
              <Input
                type="number"
                placeholder="50000"
                value={formData.energyUse}
                onChange={(e) => handleInputChange("energyUse", e.target.value)}
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-neutral-700 mb-2">Transportation (miles/year)</Label>
              <Input
                type="number"
                placeholder="25000"
                value={formData.transportation}
                onChange={(e) => handleInputChange("transportation", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-neutral-700 mb-2">Waste Generation (tons/year)</Label>
            <Input
              type="number"
              placeholder="12"
              value={formData.wasteGeneration}
              onChange={(e) => handleInputChange("wasteGeneration", e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={calculateMutation.isPending}
            className="w-full bg-climate-green text-white hover:bg-green-700"
          >
            {calculateMutation.isPending ? "Calculating..." : "Calculate Carbon Footprint"}
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-climate-green mb-2">Calculated Footprint</h4>
            <p className="text-2xl font-bold text-climate-green">
              {result.totalFootprint.toLocaleString()} kg CO₂e/year
            </p>
            <p className="text-sm text-neutral-700 mt-1">
              Based on {result.organizationType} profile
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
