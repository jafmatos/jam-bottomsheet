import jetpack from "fs-jetpack";
import path from "path";
import { MaestroRunner } from "./MaestroRunner";
import { MaestroDirectoryTransformer } from "./MaestroDirectoryTransformer";

const EXECUTION_DIR = process.cwd();
const FLOWS_DIR = path.resolve(EXECUTION_DIR, "e2e/flows");
const SCREENSHOTS_DIR = path.resolve(EXECUTION_DIR, "e2e/screenshots");
const BASELINE_FLOWS_DIR = path.resolve(FLOWS_DIR, "baselines");
const TEST_FLOWS_DIR = path.resolve(FLOWS_DIR, "tests");

const generatedFilePaths = MaestroDirectoryTransformer.transform(FLOWS_DIR);

if (!generatedFilePaths?.length) {
  process.exit(1);
}

MaestroRunner.run({
  flowsDir: BASELINE_FLOWS_DIR,
  screenshotsDir: SCREENSHOTS_DIR,
  forwardArgs: process.argv.slice(2).join(" "),
});

MaestroRunner.run({
  flowsDir: TEST_FLOWS_DIR,
  screenshotsDir: SCREENSHOTS_DIR,
  forwardArgs: process.argv.slice(2).join(" "),
});

for (const generatedFilePath of generatedFilePaths) {
  jetpack.remove(generatedFilePath);
}
