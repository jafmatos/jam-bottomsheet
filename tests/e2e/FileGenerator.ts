import jetpack from "fs-jetpack";

type FileGenerationError = {
  path: string;
  message: string;
};

export class FileGenerator {
  public static generateJsFilesFromTs(tsFilePaths: string[]): { succeeded: string[]; errors: FileGenerationError[] } {
    const errors: FileGenerationError[] = [];
    const generatedJsFilePaths: string[] = [];

    for (const tsFilePath of tsFilePaths) {
      try {
        const tsFileExports = require(tsFilePath);
        const tsFileDefaultExport = tsFileExports?.["default"];

        if (!tsFileExports || !tsFileDefaultExport) {
          errors.push({
            path: tsFilePath,
            message: "Original TS file does not have a default export",
          });

          continue;
        }

        const pathToWriteGeneratedJs = tsFilePath.replace(/\.ts$/, ".js");

        jetpack.write(pathToWriteGeneratedJs, `output = ${JSON.stringify(tsFileDefaultExport, null, 2)}`);

        generatedJsFilePaths.push(pathToWriteGeneratedJs);
      } catch (error: any) {
        errors.push({
          path: tsFilePath,
          message: error.message,
        });
      }
    }

    return { succeeded: generatedJsFilePaths, errors };
  }
}
