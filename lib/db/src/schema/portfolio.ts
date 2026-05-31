import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const portfolioTable = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  title_en: text("title_en").notNull().default(""),
  category: text("category").notNull(),
  category_en: text("category_en").notNull().default(""),
  description: text("description"),
  description_en: text("description_en"),
  imageUrl: text("image_url").notNull(),
  client: text("client"),
  year: integer("year"),
});

export const insertPortfolioSchema = createInsertSchema(portfolioTable).omit({ id: true });
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type PortfolioItem = typeof portfolioTable.$inferSelect;
