const fs = require('fs');
const path = require('path');
const { handleMain } = require('../src/index');

describe('main', () => {
  test('should check if output file exists', async () => {
    const outputPath = 'output.json';
    process.env.DSD_OUTPUT = outputPath;

    await handleMain();

    const filePath = path.resolve(__dirname, '..', outputPath);
    const fileExists = fs.existsSync(filePath);

    expect(fileExists).toBe(true);
  });
});
