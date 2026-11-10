import { runIntegrityCheck } from "../src/server/data/integrity";

const report = runIntegrityCheck();
console.log(JSON.stringify(report, null, 2));
process.exit(report.success ? 0 : 1);
