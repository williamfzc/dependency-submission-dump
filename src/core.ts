import { main as nodeMain } from './node';
import { main as golangMain } from './golang';
import * as fs from 'fs';

interface EcosystemStrategy {
  execute(options: Record<string, any>): Promise<void>;
}

class NodeEcosystemStrategy implements EcosystemStrategy {
  async execute(options: Record<string, any>): Promise<void> {
    const { outputPath } = options;
    const snapshot = await nodeMain();

    if (outputPath) {
      fs.writeFileSync(outputPath, JSON.stringify(snapshot));
    } else {
      console.error(
        'Output file path is not provided. Please set the "DSD_OUTPUT" environment variable.'
      );
    }
  }
}

class GolangEcosystemStrategy implements EcosystemStrategy {
  async execute(options: Record<string, any>): Promise<void> {
    const { outputPath } = options;
    const snapshot = await golangMain();

    if (outputPath) {
      fs.writeFileSync(outputPath, JSON.stringify(snapshot));
    } else {
      console.error(
        'Output file path is not provided. Please set the "DSD_OUTPUT" environment variable.'
      );
    }
  }
}

const ecosystemStrategies: Record<string, EcosystemStrategy> = {
  node: new NodeEcosystemStrategy(),
  golang: new GolangEcosystemStrategy()
};

export async function handleMain() {
  const ecosystem = process.env.DSD_ECOSYSTEM || 'node';
  const strategy = ecosystemStrategies[ecosystem];
  console.log(
    `current using ecosystem: ${ecosystem}, matches stratgy: ${strategy}`
  );

  if (strategy) {
    const options = {
      outputPath: process.env.DSD_OUTPUT || ''
    };

    await strategy.execute(options);
  } else {
    console.error(`Unsupported ECOSYSTEM value: ${ecosystem}`);
  }
}
