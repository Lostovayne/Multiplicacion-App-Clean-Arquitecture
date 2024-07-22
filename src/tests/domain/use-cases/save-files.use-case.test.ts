import { SaveFile } from "../../../domain/use-cases/save-file.use-case";
import fs from "fs";

describe("SaveFileUseCase", () => {
  afterEach(() => {
    if (fs.existsSync("outputs/table.txt")) {
      fs.unlinkSync("outputs/table.txt");
    }
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";

    const options = {
      fileContent: "Hello World",
    };

    const result = saveFile.execute(options);

    expect(result).toBe(true);

    const checkfile = fs.existsSync(filePath); // Checkear el archivo
    const fileContent = fs.readFileSync(filePath, "utf-8");
    expect(fileContent).toBe(options.fileContent);
    expect(checkfile).toBe(true);
  });

  afterEach(() => {
    if (
      fs.existsSync("custom-outputs/file-destination/custom-table-name.txt")
    ) {
      fs.unlinkSync("custom-outputs/file-destination/custom-table-name.txt");
    }
  });

  test("should save file with custom values", () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: "custom content",
      fileDestination: "custom-outputs/file-destination",
      fileName: "custom-table-name",
    };

    const result = saveFile.execute(options);
    const fileContent = fs.readFileSync(
      `${options.fileDestination}/${options.fileName}.txt`,
      "utf-8"
    );

    const ExistFile = fs.existsSync(options.fileDestination);

    expect(ExistFile).toBe(true);
    expect(result).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });
});
