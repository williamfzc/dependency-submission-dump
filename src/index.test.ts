import fs from 'fs';
const path = require('path');
const { handleMain } = require('./core');

describe('main', () => {
  test('should check if output file exists', async () => {
    const outputPath = 'output.json';
    process.env.DSD_OUTPUT = outputPath;

    await handleMain();

    const filePath = path.resolve(__dirname, '..', outputPath);
    console.log('filepath: ' + filePath);
    const fileExists = fs.existsSync(filePath);

    expect(fileExists).toBe(true);
  });
});
