import { main as nodeMain } from './node';
import { main as golangMain } from './golang';
import * as fs from 'fs';

interface EcosystemStrategy {
  execute(options: Options): Promise<void>;
}

class NodeEcosystemStrategy implements EcosystemStrategy {
  async execute(options: Options): Promise<void> {
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
  async execute(options: Options): Promise<void> {
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

class Options {
  outputPath: string;
  ecosystem: string;

  constructor(outputPath: string, ecosystem: string) {
    this.outputPath = outputPath;
    this.ecosystem = ecosystem;
  }
}

const ecosystemStrategies: Record<string, EcosystemStrategy> = {
  node: new NodeEcosystemStrategy(),
  golang: new GolangEcosystemStrategy()
};

export async function dispatchOptions(ops: Options) {
  const strategy = ecosystemStrategies[ops.ecosystem];
  console.log(
    `Currently using ecosystem: ${ops.ecosystem}, matching strategy: ${strategy}`
  );

  if (strategy) {
    await strategy.execute(ops);
  } else {
    console.error(`Unsupported ECOSYSTEM value: ${ops.ecosystem}`);
  }
}

export async function handleMain() {
  const options = new Options(
    process.env.DSD_OUTPUT || '',
    process.env.DSD_ECOSYSTEM || 'node'
  );
  return dispatchOptions(options);
}
