import inquirer from "inquirer";
import { UTIAgent } from "./utiAgent.js";
import { showBanner, showAssistantReply, showDiagnosis, showLoading } from "./terminal.js";
import { logSystemEvent, logger } from "./utils/logger.js";
import chalk from "chalk";

// Run the UTI AI Agent
async function run() {
  try {
    logSystemEvent('session_started');
    const agent = new UTIAgent();
    showBanner();

    let running = true;

    // Run the UTI AI Agent until the user exits
    while (running) {
      // User input
      const { input } = await inquirer.prompt([
        { type: "input", name: "input", message: chalk.green("You:") },
      ]);

      // Exit the UTI AI Agent
      if (input.toLowerCase() === "exit") {
        logSystemEvent('user_exit');
        running = false;
        break;
      }

      // Manual diagnosis requested by the user
      if (input.toLowerCase() === "diagnosis") {
        logSystemEvent('manual_diagnosis_requested');
        const result = await agent.getDiagnosis();
        showDiagnosis(result);
        continue;
      }
      
      const spinner = showLoading();
      
      try {
        // Process the user input
        const reply = await agent.processUserInput(input);
        spinner.stop();
        showAssistantReply(reply);
      } catch (error) {
        spinner.stop();
        throw error;
      }
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
