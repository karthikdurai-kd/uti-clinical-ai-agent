import chalk from "chalk";

export function showBanner() {
  console.log(chalk.greenBright("\n💊 UTI Clinical AI Agent\n"));
}

export function showAssistantReply(text) {
  console.log(chalk.blue("🤖 Agent:"), chalk.white(text));
}

export function showDiagnosis(result) {
  console.log(chalk.yellow("\n📊 CLINICAL ASSESSMENT\n"));
  console.log("Eligibility:", result.eligible ? "✅ Eligible" : "❌ Not eligible");
  console.log("Confidence:", (result.confidence * 100).toFixed(1) + "%");
  console.log("\nReasoning:", result.reasoning);

  if (result.treatmentRecommendation) {
    console.log("\n💊 TREATMENT:");
    console.log("• Antibiotic:", result.treatmentRecommendation.antibiotic);
    console.log("• Dosage:", result.treatmentRecommendation.dosage);
    console.log("• Duration:", result.treatmentRecommendation.duration);
    console.log("Instructions:", result.treatmentRecommendation.instructions.join(", "));
  }

  if (result.redFlags?.length) {
    console.log(chalk.red("\n⚠️ Red Flags:"), result.redFlags.join(", "));
  }

  if (result.referralNeeded) {
    console.log(chalk.red("\n🏥 Referral required!"));
  }
}
