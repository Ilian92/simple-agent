import { tool } from "@langchain/core/tools";
import { z } from "zod";

// Agent de gestion de tâches (stockage en mémoire vive, non persistant)
let taches: string[] = [];

export const ajouterTache = tool(
  async ({ tache }) => {
    taches.push(tache);
    return `✅ Tâche ajoutée : ${tache}`;
  },
  {
    name: "ajouterTache",
    description:
      "Ajoute une tâche à la todo-list (stockage temporaire, non persistant)",
    schema: z.object({
      tache: z.string().describe("Description de la tâche à ajouter"),
    }),
  }
);

export const listerTaches = tool(
  async () => {
    if (taches.length === 0) return "📋 Aucune tâche dans la liste.";
    return `📋 Tâches :\n- "${taches.join('"\n- "')}"`;
  },
  {
    name: "listerTaches",
    description: "Liste toutes les tâches de la todo-list",
    schema: z.object({}),
  }
);

export const supprimerTache = tool(
  async ({ index }) => {
    if (index < 0 || index >= taches.length)
      return "❌ Index de tâche invalide.";
    const supprimee = taches.splice(index, 1);
    return `🗑️ Tâche supprimée : ${supprimee[0]}`;
  },
  {
    name: "supprimerTache",
    description:
      "Supprime une tâche de la todo-list par son index (commence à 0)",
    schema: z.object({
      index: z
        .number()
        .describe("Index de la tâche à supprimer (commence à 0)"),
    }),
  }
);
