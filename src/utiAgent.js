import { chatWithLLM } from "./openaiService.js";
import { UTI_GUIDELINES } from "./guidelines.js";
import { showDiagnosis } from "./terminal.js";
import { logUserInput, logAgentResponse, logSystemEvent, logger } from "./utils/logger.js";

export class UTIAgent {
  constructor() {
 // Prompt for the UTI AI Agent with the role and guidelines
 this.conversation = [
  {
    role: "system",
    content: `
    You are a specialized UTI treatment agent. Follow official guidelines strictly.
    Ask patient questions step by step and record answers. DO NOT show "Recorded answer" confirmations.
    Once you have all the required information to make a diagnosis, respond with the exact phrase:
   "READY_FOR_DIAGNOSIS" before giving any treatment advice.

    IMPORTANT: You may only answer questions about urinary tract infections and related clinical topics. 
    If the user asks anything unrelated (jokes, personal questions, general chat), reply exactly:
    "I'm only able to provide guidance on urinary tract infections and related clinical questions."

    Guidelines: ${UTI_GUIDELINES}
    `,
  },
];

    // Initialize the patient data
    this.patientData = {};
    logSystemEvent('agent_initialized');
  }

  // Process the user input
async processUserInput(input) {
  try {
    logUserInput(input);
    
    this.conversation.push({ role: "user", content: input });
    const response = await chatWithLLM(this.conversation);
    this.conversation.push({ role: "assistant", content: response });

    logAgentResponse(response);

    // Check if the response contains the phrase "READY_FOR_DIAGNOSIS", so diagnosis report can be generated
  if (/READY_FOR_DIAGNOSIS/i.test(response)) {
    logSystemEvent('diagnosis_ready');
    const result = await this.getDiagnosis();
    
    logSystemEvent('diagnosis_complete', {
      eligible: result.eligible,
      confidence: result.confidence
    });
    
    showDiagnosis(result);
    return "🤖 Agent: All questions collected. Assessment complete.";
  }

  return response;
  } catch (error) {
    logger.error('Error in processUserInput', {
      role: 'system',
      error: error.message,
      input: input
    });
    throw error;
  }
}

  // Get the diagnosis report
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

    // Generate the diagnosis report using the OpenAI GPT-5-mini model
    const result = await chatWithLLM(
      [
        ...this.conversation,
        {
          role: "user",
          content:
            "Based on our conversation, summarize patient info and provide structured diagnosis in JSON.",
        },
      ],
      schema
    );

    return JSON.parse(result);
  }
}
