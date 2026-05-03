import "dotenv/config";
import path from "path";
import jetpack from "fs-jetpack";

const FLOWS_DIRNAME = process.env.FLOWS_DIRNAME || "flows";
const FLOW_SETUP_FILENAME = process.env.FLOW_SETUP_FILENAME || "setup";
const FLOW_SETUP_FUNCTION_NAME = process.env.FLOW_SETUP_FUNCTION_NAME || "setup";
const FLOWS_PATH = path.resolve(__dirname, FLOWS_DIRNAME);

const transform = ({ dir, setupFileName, setupFunctionName }: { dir: string; setupFileName: string; setupFunctionName: string }) => {
  const errors: { path: string; message: string }[] = [];
  const flowsDirHandle = jetpack.dir(dir);

  if (!flowsDirHandle) {
    console.warn(`No flows directory found in ${dir}`);

    return process.exit(1);
  }

  const tsFiles = flowsDirHandle.find({
    directories: false,
    files: true,
    recursive: true,
    matching: `${setupFileName}.ts`,
  });

  for (const tsFile of tsFiles) {
    const absolutePath = path.resolve(dir, tsFile);
    const tsFileExports = require(absolutePath);
    const setupFunction = tsFileExports[setupFileName];

    if (!tsFileExports || !setupFunction) {
      errors.push({
        path: absolutePath,
        message: `Setup file does not export a function named "${setupFunctionName}"`,
      });

      continue;
    }

    try {
      const setupOutput = setupFunction();

      if (!setupOutput.url) throw new Error(`${setupFunctionName} function does not return a "url" property`);

      const pathToWriteTransformedSetup = absolutePath.replace(new RegExp(`${setupFileName}.ts$`), `${setupFileName}.js`);

      jetpack.write(pathToWriteTransformedSetup, `output = ${JSON.stringify(setupOutput, null, 2)}`);
    } catch (error: any) {
      errors.push({
        path: absolutePath,
        message: error.message,
      });
    }
  }

  if (errors.length > 0) {
    console.error("\nErrors encountered during transformation:\n");
    errors.forEach((error, index) => {
      console.error(`ERROR #${index + 1}`);
      console.error(`File: ${error.path}`);
      console.error(`Issue: ${error.message}\n`);
    });

    process.exit(1);
  } else {
    console.log("\nAll setup files transformed successfully!");
  }
};

transform({
  dir: FLOWS_PATH,
  setupFileName: FLOW_SETUP_FILENAME,
  setupFunctionName: FLOW_SETUP_FUNCTION_NAME,
});
