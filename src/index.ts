import { main as nodeMain } from './node';
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
        'Output file path is not provided. Please set the "output" environment variable.'
      );
    }
  }
}

const ecosystemStrategies: Record<string, EcosystemStrategy> = {
  node: new NodeEcosystemStrategy()
};

export function handleMain() {
  const ecosystem = process.env.DSD_ECOSYSTEM || 'node';
  const strategy = ecosystemStrategies[ecosystem];

  if (strategy) {
    const options = {
      outputPath: process.env.DSD_OUTPUT || ''
    };

    strategy.execute(options);
  } else {
    console.error(`Unsupported ECOSYSTEM value: ${ecosystem}`);
  }
}
