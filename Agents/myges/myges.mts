import "dotenv/config";

import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { loadAgentPrompt } from "./generate_prompt.mts";
import { weather } from "./tools/weather.mts";
import { transport } from "./tools/transport.mts";
import {
  create_reminder,
  lister_reminders,
  supprimer_reminder,
} from "./tools/rappel.mts";
import { ajouterTache, listerTaches, supprimerTache } from "./tools/taches.mts";

const mygesPrompt = loadAgentPrompt("myges");

const agentModel = new ChatOpenAI({
  temperature: 0.5,
  model: "dolphin-llama-3-8b-dpo", // ou le nom de votre modèle
  configuration: {
    baseURL: "http://localhost:1234/v1",
    apiKey: "not-needed", // LMStudio ne nécessite pas de clé API réelle
  },
});

//const agentModel = new ChatOpenAI({ temperature: 0.5, model: "gpt-4o-mini" });

const agentCheckpointer = new MemorySaver();
export const mygesAgent = createReactAgent({
  prompt: mygesPrompt,
  llm: agentModel,
  tools: [
    weather,
    transport,
    create_reminder,
    lister_reminders,
    supprimer_reminder,
    ajouterTache,
    listerTaches,
    supprimerTache,
  ],
  checkpointSaver: agentCheckpointer,
});
