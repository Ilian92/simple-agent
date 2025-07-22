import { tool } from "@langchain/core/tools";
import { z } from "zod";

const rappels: { texte: string; date: string }[] = [];

export const rappel = tool(
  async ({ texte, date }) => {
    rappels.push({ texte, date });
    return `⏰ Rappel créé : "${texte}" pour le ${date}`;
  },
  {
    name: "rappel",
    description:
      "Crée un rappel avec un texte et une date (stockage temporaire, non persistant)",
    schema: z.object({
      texte: z.string().describe("Texte du rappel (ex: Appeler le docteur)"),
      date: z.string().describe("Date/heure du rappel (ex: 2025-07-22 14:00)"),
    }),
  }
);
