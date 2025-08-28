import chalk from "chalk";
import ora from "ora";

// Show the welcome banner
export function showBanner() {
  console.log(chalk.greenBright("\nUTI Clinical AI Agent\n"));
}

// Loading spinner
export function showLoading() {
  return ora({
    color: 'blue',
    spinner: 'dots',
    text: 'Processing...'
  }).start();
}

// Show the UTI AI Agent's reply
export function showAssistantReply(text) {
  console.log(chalk.blue("🤖 Agent:"), chalk.white(text));
}

// Show the diagnosis result in a structured format
export function showDiagnosis(result) {
  console.log(chalk.yellow("\nCLINICAL ASSESSMENT\n"));
  console.log("Eligibility:", result.eligible ? "Eligible" : "Not eligible");
  console.log("Confidence:", (result.confidence * 100).toFixed(1) + "%");
  console.log("\nReasoning:", result.reasoning);

  if (result.treatmentRecommendation) {
    console.log("\nTREATMENT:");
    console.log("• Antibiotic:", result.treatmentRecommendation.antibiotic);
    console.log("• Dosage:", result.treatmentRecommendation.dosage);
    console.log("• Duration:", result.treatmentRecommendation.duration);
    console.log("Instructions:", result.treatmentRecommendation.instructions.join(", "));
  }

  if (result.redFlags?.length) {
    console.log(chalk.red("\nRed Flags:"), result.redFlags.join(", "));
  }

  if (result.referralNeeded) {
    console.log(chalk.red("\nReferral required!"));
  }
}
