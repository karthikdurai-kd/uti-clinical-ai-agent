import inquirer from "inquirer";
import { UTIAgent } from "./utiAgent.js";
import { showBanner, showAssistantReply, showDiagnosis } from "./terminal.js";
import chalk from "chalk";

async function run() {
  const agent = new UTIAgent();
  showBanner();

  let running = true;

  while (running) {
    const { input } = await inquirer.prompt([
      { type: "input", name: "input", message: chalk.green("You:") },
    ]);

    if (input.toLowerCase() === "exit") {
      running = false;
      break;
    }

    if (input.toLowerCase() === "diagnosis") {
      const result = await agent.getDiagnosis();
      showDiagnosis(result);
      continue;
    }

    const reply = await agent.processUserInput(input);
    showAssistantReply(reply);
  }
}

run();
