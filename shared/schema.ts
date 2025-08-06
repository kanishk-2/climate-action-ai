import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const climateMetrics = pgTable("climate_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  co2Level: real("co2_level").notNull(),
  temperature: real("temperature").notNull(),
  creditsAllocated: real("credits_allocated").notNull(),
  policyScore: real("policy_score").notNull(),
  recordedAt: timestamp("recorded_at").defaultNow().notNull(),
});

export const carbonCalculations = pgTable("carbon_calculations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationType: text("organization_type").notNull(),
  energyUse: real("energy_use").notNull(),
  transportation: real("transportation").notNull(),
  wasteGeneration: real("waste_generation").notNull(),
  totalFootprint: real("total_footprint").notNull(),
  calculatedAt: timestamp("calculated_at").defaultNow().notNull(),
});

export const carbonCredits = pgTable("carbon_credits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectType: text("project_type").notNull(),
  creditsAmount: integer("credits_amount").notNull(),
  cost: real("cost").notNull(),
  impactLevel: text("impact_level").notNull(),
  description: text("description").notNull(),
});

export const policyRecommendations = pgTable("policy_recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  priority: text("priority").notNull(),
  description: text("description").notNull(),
  projectedImpact: text("projected_impact").notNull(),
  implementationCost: text("implementation_cost").notNull(),
  timeline: text("timeline").notNull(),
  icon: text("icon").notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertClimateMetricsSchema = createInsertSchema(climateMetrics).omit({
  id: true,
  recordedAt: true,
});

export const insertCarbonCalculationSchema = createInsertSchema(carbonCalculations).omit({
  id: true,
  calculatedAt: true,
  totalFootprint: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
  response: true,
});

export type ClimateMetrics = typeof climateMetrics.$inferSelect;
export type InsertClimateMetrics = z.infer<typeof insertClimateMetricsSchema>;
export type CarbonCalculation = typeof carbonCalculations.$inferSelect;
export type InsertCarbonCalculation = z.infer<typeof insertCarbonCalculationSchema>;
export type CarbonCredit = typeof carbonCredits.$inferSelect;
export type PolicyRecommendation = typeof policyRecommendations.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
