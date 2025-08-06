import Navigation from "@/components/navigation";
import ClimateMetrics from "@/components/climate-metrics";
import ClimateChart from "@/components/climate-chart";
import AiChat from "@/components/ai-chat";
import CarbonCalculator from "@/components/carbon-calculator";
import CarbonCredits from "@/components/carbon-credits";
import PolicyRecommendations from "@/components/policy-recommendations";
import DataVisualization from "@/components/data-visualization";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div id="dashboard" className="mb-8 scroll-mt-20">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Climate Dashboard</h1>
          <p className="text-neutral-700">Monitor global climate metrics and optimize carbon credit allocation with AI-powered insights</p>
        </div>

        {/* Metrics Overview */}
        <ClimateMetrics />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ClimateChart />
          </div>
          <div id="ai-agent" className="scroll-mt-20">
            <AiChat />
          </div>
        </div>

        {/* Carbon Calculator and Credits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div id="calculator" className="scroll-mt-20">
            <CarbonCalculator />
          </div>
          <div id="credits" className="scroll-mt-20">
            <CarbonCredits />
          </div>
        </div>

        {/* Policy Recommendations */}
        <div id="policies" className="scroll-mt-20">
          <PolicyRecommendations />
        </div>

        {/* Data Visualization */}
        <DataVisualization />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-neutral-700">
            © 2024 Climate Action AI. Powered by advanced climate intelligence.
          </div>
        </div>
      </footer>
    </div>
  );
}
