import { validateAllData } from "../src/server/data/validator";

const dryRun = process.argv.includes("--dry-run");
const report = validateAllData();
console.log("Import validation report:");
console.log(JSON.stringify(report, null, 2));
if (!report.success) {
  console.error("Import aborted due to validation errors.");
  process.exit(1);
}
if (dryRun) {
  console.log("Dry run: no changes written.");
} else {
  console.log("Import complete (canonical files already present).");
}
process.exit(0);
