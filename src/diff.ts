const fs = require('fs');
const diffpatcher = require('jsondiffpatch').create();

export async function handleDiff() {
  const targetPath = process.env.DSD_TARGET;
  const sourcePath = process.env.DSD_SOURCE;
  const outputPath = process.env.DSD_OUTPUT;

  const a = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  const b = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

  const delta = diffpatcher.diff(a, b);
  const deltaJSON = JSON.stringify(delta);

  fs.writeFileSync(outputPath, deltaJSON, 'utf8');
  console.log(`Delta successfully written to ${outputPath}`);
}
