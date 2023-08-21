import { main as nodeMain } from './node';
import { main as golangMain } from './golang';
import * as fs from 'fs';
import * as path from 'path';
import { Snapshot } from '@github/dependency-submission-toolkit';

interface EcosystemStrategy {
  execute(options: Options): Promise<any>;
}

class NodeEcosystemStrategy implements EcosystemStrategy {
  async execute(options: Options): Promise<Snapshot | undefined> {
    return nodeMain();
  }
}

class GolangEcosystemStrategy implements EcosystemStrategy {
  async execute(options: Options): Promise<Snapshot | undefined> {
    return golangMain();
  }
}

class Options {
  outputPath: string;
  ecosystem: string;
  addonPath: string;

  constructor(outputPath: string, ecosystem: string, addonPath: string) {
    this.outputPath = outputPath;
    this.ecosystem = ecosystem;
    this.addonPath = addonPath;
  }
}

async function postDispatch(
  options: Options,
  snapshot: Snapshot
): Promise<void> {
  if (!snapshot) {
    console.error('snapshot is empty, something error');
  }
  if (options.addonPath) {
    const addonPath = path.resolve(options.addonPath);
    const addonScript = require(addonPath);
    addonScript['dsdHandler'](snapshot);
  }

  if (options.outputPath) {
    fs.writeFileSync(options.outputPath, JSON.stringify(snapshot));
  } else {
    console.error(
      'Output file path is not provided. Please set the "DSD_OUTPUT" environment variable.'
    );
  }
}

export async function dispatchOptions(ops: Options) {
  const strategy = getEcosystemStrategy(ops.ecosystem);
  console.log(
    `Currently using ecosystem: ${ops.ecosystem}, matching strategy: ${strategy}`
  );

  if (strategy) {
    const snapshot = await strategy.execute(ops);
    await postDispatch(ops, snapshot);
  } else {
    console.error(`Unsupported ECOSYSTEM value: ${ops.ecosystem}`);
  }
}

function getEcosystemStrategy(
  ecosystem: string
): EcosystemStrategy | undefined {
  switch (ecosystem) {
    case 'node':
      return new NodeEcosystemStrategy();
    case 'golang':
      return new GolangEcosystemStrategy();
    default:
      return undefined;
  }
}

export async function handleMain() {
  const options = new Options(
    process.env.DSD_OUTPUT || '',
    process.env.DSD_ECOSYSTEM || 'node',
    process.env.DSD_ADDON || ''
  );
  return dispatchOptions(options);
}
