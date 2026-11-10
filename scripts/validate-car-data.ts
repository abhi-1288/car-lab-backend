import { validateAllData } from "../src/server/data/validator";

const report = validateAllData();
console.log(JSON.stringify(report, null, 2));
process.exit(report.success ? 0 : 1);
