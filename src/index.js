import inquirer from "inquirer";
import { UTIAgent } from "./utiAgent.js";
import { showBanner, showAssistantReply, showDiagnosis } from "./terminal.js";
import { logSystemEvent, logger } from "./utils/logger.js";
import chalk from "chalk";

async function run() {
  try {
    logSystemEvent('session_started');
    const agent = new UTIAgent();
    showBanner();

    let running = true;

    while (running) {
      const { input } = await inquirer.prompt([
        { type: "input", name: "input", message: chalk.green("You:") },
      ]);

      if (input.toLowerCase() === "exit") {
        logSystemEvent('user_exit');
        running = false;
        break;
      }

      if (input.toLowerCase() === "diagnosis") {
        logSystemEvent('manual_diagnosis_requested');
        const result = await agent.getDiagnosis();
        showDiagnosis(result);
        continue;
      }

      const reply = await agent.processUserInput(input);
      showAssistantReply(reply);
    }

    logSystemEvent('session_ended');
    
  } catch (error) {
    logger.error('Error', {
      role: 'system',
      error: error.message,
      stack: error.stack
    });
    console.error("Unexpected error:", error.message);
    process.exit(1);
  }
}

run();
