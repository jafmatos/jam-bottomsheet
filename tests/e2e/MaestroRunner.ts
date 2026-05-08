import { execSync } from "child_process";

interface RunOptions {
  log?: boolean;
  shards?: number;
  forwardArgs?: string;
  flowsDir: string;
  screenshotsDir: string;
}

export class MaestroRunner {
  public static run(options: RunOptions) {
    try {
      const command = `maestro test --config=config.yaml ${options.flowsDir} ${options.forwardArgs || ""} --env SCREENSHOTS_DIR=${options.screenshotsDir}`;

      options.log && console.log(command);

      execSync(command, { stdio: "inherit" });
    } catch (error) {
      options.log && console.error(error);
    }
  }
}
