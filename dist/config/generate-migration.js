"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const args = process.argv.slice(2);
const migrationName = args[0];
if (!migrationName) {
    console.error('Please provide a migration name.');
    process.exit(1);
}
const command = `yarn typeorm migration:generate src/config/migrations/${migrationName}`;
try {
    (0, child_process_1.execSync)(command, { stdio: 'inherit' });
}
catch (error) {
    console.error('Error generating migration:', error);
    process.exit(1);
}
//# sourceMappingURL=generate-migration.js.map