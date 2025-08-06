import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function generateClimateResponse(message: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are an AI climate expert assistant. Provide helpful, accurate information about climate change, carbon emissions, sustainability, and environmental policies. Keep responses informative but concise, and always be encouraging about climate action."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    return response.choices[0].message.content || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
}

export async function generateCarbonCreditRecommendations(footprint: number, organizationType: string): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a carbon credit optimization expert. Based on the carbon footprint and organization type, recommend specific carbon credit allocations. Respond with JSON in this format: { "recommendations": [{"projectType": "string", "creditsAmount": number, "cost": number, "impactLevel": "High Impact|Medium Impact|Low Impact", "description": "string"}], "totalCredits": number, "totalCost": number }`
        },
        {
          role: "user",
          content: `Organization type: ${organizationType}, Carbon footprint: ${footprint} tons CO2e/year. Recommend carbon credit allocation.`
        }
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      recommendations: [],
      totalCredits: 0,
      totalCost: 0
    };
  }
}

export async function generatePolicyRecommendations(region: string = "general"): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a climate policy expert. Generate evidence-based policy recommendations for climate action. Respond with JSON in this format: { "policies": [{"title": "string", "category": "string", "priority": "High Priority|Medium Priority|Low Priority", "description": "string", "projectedImpact": "string", "implementationCost": "string", "timeline": "string", "icon": "fas fa-icon-name"}] }`
        },
        {
          role: "user",
          content: `Generate climate policy recommendations for ${region} region focusing on practical, implementable solutions.`
        }
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("OpenAI API error:", error);
    return { policies: [] };
  }
}
