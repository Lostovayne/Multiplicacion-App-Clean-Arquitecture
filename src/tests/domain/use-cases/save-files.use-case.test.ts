import { SaveFile } from "../../../domain/use-cases/save-file.use-case";
import fs, { writeFileSync } from "fs";

describe("SaveFileUseCase", () => {
  const Customoptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs/file-destination",
    fileName: "custom-table-name",
  };

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
    const checkfile = fs.existsSync(filePath); // Checkear el archivo
    const fileContent = fs.readFileSync(filePath, "utf-8");

    expect(result).toBe(true);
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
    const CustomFilePath =
      "custom-outputs/file-destination/custom-table-name.txt";

    const result = saveFile.execute(Customoptions);
    const fileContent = fs.readFileSync(CustomFilePath, "utf-8");
    const ExistFile = fs.existsSync(Customoptions.fileDestination);

    expect(ExistFile).toBe(true);
    expect(result).toBe(true);
    expect(fileContent).toBe(Customoptions.fileContent);
  });

  test("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom testing error");
    });
    const result = saveFile.execute(Customoptions);

    expect(result).toBe(false);
    expect(mkdirSpy).toHaveBeenCalled();

    // Restaurar
    mkdirSpy.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const whriteFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a custom testing error creating file");
      });

    const result = saveFile.execute({ fileContent: "Hola" });
    expect(result).toBe(false);
    whriteFileSpy.mockRestore();
  });
});
