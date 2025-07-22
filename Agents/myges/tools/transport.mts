import { tool } from "@langchain/core/tools";
import { z } from "zod";

// Cet agent donne des infos de transport (exemple fictif, à adapter à une vraie API si besoin)
export const transport = tool(
  async ({ ville, type }) => {
    // Ici, on simule une réponse. Pour une vraie API, remplacer ce bloc par un fetch vers une API de transport.
    if (!ville) return "❌ Ville non précisée.";
    if (!type)
      return "❌ Type de transport non précisé (métro, bus, train, etc.).";
    return `🚉 Prochains horaires pour ${type} à ${ville} :\n- 08:15\n- 08:30\n- 08:45 (simulation)`;
  },
  {
    name: "transport",
    description:
      "Donne les prochains horaires de transport en commun pour une ville et un type de transport (simulation, à brancher sur une vraie API)",
    schema: z.object({
      ville: z.string().describe("Nom de la ville (ex: Paris)"),
      type: z.string().describe("Type de transport (métro, bus, train, etc.)"),
    }),
  }
);
