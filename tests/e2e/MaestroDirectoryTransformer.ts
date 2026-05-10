import jetpack from "fs-jetpack";
import path from "path";
import { FileGenerator } from "./FileGenerator";

export class MaestroDirectoryTransformer {
  public static transform(dir: string) {
    try {
      const dirHandle = jetpack.dir(dir);

      if (!dirHandle) {
        throw new Error(`Directory not found: ${dir}`);
      }

      const tsFilePaths = dirHandle
        .find({
          directories: false,
          files: true,
          recursive: true,
          matching: "*.ts",
        })
        .map((tsFilePath) => path.resolve(dir, tsFilePath));

      const fileGenerations = FileGenerator.generateJsFilesFromTs(tsFilePaths);

      if (fileGenerations.errors.length) {
        fileGenerations.errors.forEach((error, index) => {
          console.error(`\n[Error ${index + 1}] - ${error.path}\n\t${error.message}`);
        });

        return;
      }

      return fileGenerations.succeeded;
    } catch (error) {
      console.log(error);
    }
  }
}
