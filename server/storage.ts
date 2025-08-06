import { 
  type ClimateMetrics, 
  type InsertClimateMetrics,
  type CarbonCalculation,
  type InsertCarbonCalculation,
  type CarbonCredit,
  type PolicyRecommendation,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Climate metrics
  getLatestClimateMetrics(): Promise<ClimateMetrics | undefined>;
  createClimateMetrics(metrics: InsertClimateMetrics): Promise<ClimateMetrics>;
  
  // Carbon calculations
  createCarbonCalculation(calculation: InsertCarbonCalculation): Promise<CarbonCalculation>;
  getCarbonCalculation(id: string): Promise<CarbonCalculation | undefined>;
  
  // Carbon credits
  getCarbonCredits(): Promise<CarbonCredit[]>;
  
  // Policy recommendations
  getPolicyRecommendations(): Promise<PolicyRecommendation[]>;
  
  // Chat messages
  createChatMessage(message: InsertChatMessage & { response: string }): Promise<ChatMessage>;
  getChatMessages(): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private climateMetrics: Map<string, ClimateMetrics>;
  private carbonCalculations: Map<string, CarbonCalculation>;
  private carbonCredits: Map<string, CarbonCredit>;
  private policyRecommendations: Map<string, PolicyRecommendation>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.climateMetrics = new Map();
    this.carbonCalculations = new Map();
    this.carbonCredits = new Map();
    this.policyRecommendations = new Map();
    this.chatMessages = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize climate metrics
    const currentMetrics: ClimateMetrics = {
      id: randomUUID(),
      co2Level: 421.3,
      temperature: 1.1,
      creditsAllocated: 1200000,
      policyScore: 8.4,
      recordedAt: new Date(),
    };
    this.climateMetrics.set(currentMetrics.id, currentMetrics);

    // Initialize carbon credits
    const credits: CarbonCredit[] = [
      {
        id: randomUUID(),
        projectType: "Renewable Energy Credits",
        creditsAmount: 450,
        cost: 12600,
        impactLevel: "High Impact",
        description: "Wind and solar project investments for direct emission reduction"
      },
      {
        id: randomUUID(),
        projectType: "Forest Conservation",
        creditsAmount: 300,
        cost: 7200,
        impactLevel: "Medium Impact",
        description: "Reforestation and forest protection initiatives"
      },
      {
        id: randomUUID(),
        projectType: "Methane Capture",
        creditsAmount: 497,
        cost: 14910,
        impactLevel: "High Impact",
        description: "Agricultural and landfill methane reduction programs"
      }
    ];
    credits.forEach(credit => this.carbonCredits.set(credit.id, credit));

    // Initialize policy recommendations
    const policies: PolicyRecommendation[] = [
      {
        id: randomUUID(),
        title: "Industrial Emissions Cap",
        category: "Industry",
        priority: "High Priority",
        description: "Implement mandatory emissions reduction targets for heavy industry with graduated penalties and incentives.",
        projectedImpact: "-15% emissions",
        implementationCost: "$2.1B",
        timeline: "18 months",
        icon: "fas fa-industry"
      },
      {
        id: randomUUID(),
        title: "EV Infrastructure Expansion",
        category: "Transportation",
        priority: "Medium Priority",
        description: "Accelerate electric vehicle adoption through public charging infrastructure investment and purchase incentives.",
        projectedImpact: "-8% transport emissions",
        implementationCost: "$850M",
        timeline: "24 months",
        icon: "fas fa-car-side"
      },
      {
        id: randomUUID(),
        title: "Urban Green Spaces",
        category: "Urban Planning",
        priority: "Low Priority",
        description: "Expand urban forestry and green infrastructure to improve air quality and carbon sequestration.",
        projectedImpact: "-3% urban emissions",
        implementationCost: "$425M",
        timeline: "36 months",
        icon: "fas fa-seedling"
      }
    ];
    policies.forEach(policy => this.policyRecommendations.set(policy.id, policy));
  }

  async getLatestClimateMetrics(): Promise<ClimateMetrics | undefined> {
    const metrics = Array.from(this.climateMetrics.values());
    return metrics.sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime())[0];
  }

  async createClimateMetrics(insertMetrics: InsertClimateMetrics): Promise<ClimateMetrics> {
    const metrics: ClimateMetrics = {
      ...insertMetrics,
      id: randomUUID(),
      recordedAt: new Date(),
    };
    this.climateMetrics.set(metrics.id, metrics);
    return metrics;
  }

  async createCarbonCalculation(insertCalculation: InsertCarbonCalculation): Promise<CarbonCalculation> {
    // Simple carbon footprint calculation
    const energyFootprint = insertCalculation.energyUse * 0.4; // kg CO2 per kWh
    const transportFootprint = insertCalculation.transportation * 0.4; // kg CO2 per mile
    const wasteFootprint = insertCalculation.wasteGeneration * 1000; // kg CO2 per ton
    const totalFootprint = energyFootprint + transportFootprint + wasteFootprint;

    const calculation: CarbonCalculation = {
      ...insertCalculation,
      id: randomUUID(),
      totalFootprint: Math.round(totalFootprint),
      calculatedAt: new Date(),
    };
    this.carbonCalculations.set(calculation.id, calculation);
    return calculation;
  }

  async getCarbonCalculation(id: string): Promise<CarbonCalculation | undefined> {
    return this.carbonCalculations.get(id);
  }

  async getCarbonCredits(): Promise<CarbonCredit[]> {
    return Array.from(this.carbonCredits.values());
  }

  async getPolicyRecommendations(): Promise<PolicyRecommendation[]> {
    return Array.from(this.policyRecommendations.values());
  }

  async createChatMessage(insertMessage: InsertChatMessage & { response: string }): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: randomUUID(),
      message: insertMessage.message,
      response: insertMessage.response,
      createdAt: new Date(),
    };
    this.chatMessages.set(message.id, message);
    return message;
  }

  async getChatMessages(): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

export const storage = new MemStorage();
