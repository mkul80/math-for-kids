const fs = require("fs");
const path = require("path");

// Read package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./package.json"), "utf8")
);

// Create version object
const versionData = {
  version: packageJson.version,
};

// Write to version.json
fs.writeFileSync(
  path.join(__dirname, "./src/assets/version.json"),
  JSON.stringify(versionData, null, 2),
  "utf8"
);

console.log(`Version ${packageJson.version} has been written to version.json`);
