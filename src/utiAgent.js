import { chatWithLLM } from "./openaiService.js";
import { UTI_GUIDELINES } from "./guidelines.js";
import { showDiagnosis } from "./terminal.js";

export class UTIAgent {
  constructor() {
   this.conversation = [
  {
    role: "system",
    content: `
You are a specialized UTI treatment agent. Follow official guidelines strictly.
Ask patient questions step by step and record answers.
Once you have all the required information to make a diagnosis, respond with the exact phrase:
"READY_FOR_DIAGNOSIS"
before giving any treatment advice.
Guidelines: ${UTI_GUIDELINES}
    `,
  },
];
    this.patientData = {};
  }

async processUserInput(input) {
  this.conversation.push({ role: "user", content: input });

  const response = await chatWithLLM(this.conversation);
  this.conversation.push({ role: "assistant", content: response });

  if (/READY_FOR_DIAGNOSIS/i.test(response)) {
    const result = await this.getDiagnosis();
    showDiagnosis(result);

    return "🤖 Agent: All questions collected. Assessment complete.";
  }

  return response;
}


  async getDiagnosis() {
    const schema = {
      name: "DiagnosisSchema",
      schema: {
        type: "object",
        properties: {
          eligible: { type: "boolean" },
          confidence: { type: "number" },
          reasoning: { type: "string" },
          treatmentRecommendation: {
            type: "object",
            properties: {
              antibiotic: { type: "string" },
              dosage: { type: "string" },
              duration: { type: "string" },
              instructions: { type: "array", items: { type: "string" } },
            },
          },
          referralNeeded: { type: "boolean" },
          redFlags: { type: "array", items: { type: "string" } },
        },
        required: ["eligible", "confidence", "reasoning"],
      },
    };

    const result = await chatWithLLM(
      [
        ...this.conversation,
        {
          role: "user",
          content: `Based on our conversation, summarize patient info and provide structured diagnosis in JSON.`,
        },
      ],
      schema
    );

    return JSON.parse(result);
  }
}
