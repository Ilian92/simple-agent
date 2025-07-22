export const lister_reminders = tool(
  async () => {
    if (rappels.length === 0) return "⏰ Aucun rappel enregistré.";
    return (
      "⏰ Rappels :\n" +
      rappels.map((r, i) => `#${i} : "${r.texte}" pour le ${r.date}`).join("\n")
    );
  },
  {
    name: "lister_reminders",
    description:
      "Liste tous les rappels enregistrés (stockage temporaire, non persistant)",
    schema: z.object({}),
  }
);

export const supprimer_reminder = tool(
  async ({ index }) => {
    if (index < 0 || index >= rappels.length)
      return "❌ Index de rappel invalide.";
    const supprime = rappels.splice(index, 1);
    return `🗑️ Rappel supprimé : "${supprime[0].texte}" pour le ${supprime[0].date}`;
  },
  {
    name: "supprimer_reminder",
    description: "Supprime un rappel par son index (commence à 0)",
    schema: z.object({
      index: z.number().describe("Index du rappel à supprimer (commence à 0)"),
    }),
  }
);
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const rappels: { texte: string; date: string }[] = [];

export const create_reminder = tool(
  async ({ texte, date }) => {
    rappels.push({ texte, date });
    return `⏰ Rappel créé : "${texte}" pour le ${date}`;
  },
  {
    name: "create_reminder",
    description:
      "Crée un rappel avec un texte et une date (stockage temporaire, non persistant)",
    schema: z.object({
      texte: z.string().describe("Texte du rappel (ex: Appeler le docteur)"),
      date: z.string().describe("Date/heure du rappel (ex: 2025-07-22 14:00)"),
    }),
  }
);
