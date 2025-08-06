import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCarbonCalculationSchema, insertChatMessageSchema } from "@shared/schema";
import { generateClimateResponse, generateCarbonCreditRecommendations } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get latest climate metrics
  app.get("/api/climate-metrics", async (req, res) => {
    try {
      const metrics = await storage.getLatestClimateMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch climate metrics" });
    }
  });

  // Calculate carbon footprint
  app.post("/api/carbon-calculation", async (req, res) => {
    try {
      const validatedData = insertCarbonCalculationSchema.parse(req.body);
      const calculation = await storage.createCarbonCalculation(validatedData);
      res.json(calculation);
    } catch (error) {
      res.status(400).json({ message: "Invalid calculation data" });
    }
  });

  // Get carbon credits
  app.get("/api/carbon-credits", async (req, res) => {
    try {
      const credits = await storage.getCarbonCredits();
      res.json(credits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch carbon credits" });
    }
  });

  // Get carbon credit recommendations
  app.post("/api/carbon-credits/recommendations", async (req, res) => {
    try {
      const { footprint, organizationType } = req.body;
      const recommendations = await generateCarbonCreditRecommendations(footprint, organizationType);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate recommendations" });
    }
  });

  // Get policy recommendations
  app.get("/api/policy-recommendations", async (req, res) => {
    try {
      const policies = await storage.getPolicyRecommendations();
      res.json(policies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch policy recommendations" });
    }
  });

  // Chat with AI assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const aiResponse = await generateClimateResponse(validatedData.message);
      
      const chatMessage = await storage.createChatMessage({
        message: validatedData.message,
        response: aiResponse
      });
      
      res.json(chatMessage);
    } catch (error) {
      res.status(400).json({ message: "Invalid chat message" });
    }
  });

  // Get chat history
  app.get("/api/chat", async (req, res) => {
    try {
      const messages = await storage.getChatMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  // Get climate data for charts
  app.get("/api/climate-data", async (req, res) => {
    try {
      // Mock historical climate data for charts
      const climateData = {
        co2Levels: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024 (Proj.)'],
          data: [411.5, 413.2, 416.4, 418.9, 421.3, 423.1]
        },
        temperatureAnomalies: {
          labels: ['2019', '2020', '2021', '2022', '2023', '2024 (Proj.)'],
          data: [0.95, 1.02, 1.14, 1.06, 1.1, 1.15]
        },
        emissionsBySection: {
          labels: ['Energy', 'Transportation', 'Industry', 'Agriculture', 'Buildings', 'Other'],
          data: [25, 24, 21, 18, 8, 4]
        }
      };
      res.json(climateData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch climate data" });
    }
  });

  // Update OpenAI API key
  app.post("/api/update-api-key", async (req, res) => {
    try {
      const { apiKey } = req.body;
      
      if (!apiKey || typeof apiKey !== 'string') {
        return res.status(400).json({ message: "Invalid API key provided" });
      }

      // Validate the API key by making a test request
      const testOpenAI = new (await import("openai")).default({ apiKey });
      
      try {
        await testOpenAI.chat.completions.create({
          model: "gpt-4o",
          messages: [{ role: "user", content: "test" }],
          max_tokens: 5
        });
        
        // If test succeeds, update the environment variable
        process.env.OPENAI_API_KEY = apiKey;
        
        res.json({ 
          success: true, 
          message: "API key updated successfully and validated" 
        });
      } catch (openaiError) {
        console.error("OpenAI API key validation failed:", openaiError);
        res.status(400).json({ 
          success: false, 
          message: "Invalid OpenAI API key. Please check your key and try again." 
        });
      }
    } catch (error) {
      console.error("Error updating API key:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to update API key" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
