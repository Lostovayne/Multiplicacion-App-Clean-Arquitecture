import { CreateTable } from "../../domain/use-cases/create-table.use-case";
import { SaveFile } from "../../domain/use-cases/save-file.use-case";
import { ServerApp } from "../../presentation/server-app";

describe("ServerApp", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileName: "test-fileName",
    fileDestination: "test-destination",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create ServerApp instance", () => {
    const serverApp = new ServerApp(); // Create Instance
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  // Prueba de Integracion!

  test("should run ServerApp with options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith("File Created Successfully");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({ base: 2, limit: 10 });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileName: options.fileName,
      fileDestination: options.fileDestination,
    });

    logSpy.mockRestore();
  });

  test("should run with custom values mocked", () => {
    // Mocks
    const logMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("2 x 1 = 2"); // Retornaba undefined por lo que se agrega un retorno
    const saveFileMock = jest.fn().mockReturnValue(true); // Agregar retorno a la funcion

    console.log = logMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server Running...");
    expect(logMock).toHaveBeenCalledWith("File Created Successfully");

    expect(createMock).toHaveBeenCalledWith({ base: 2, limit: 10 });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: "2 x 1 = 2",
      fileName: options.fileName,
      fileDestination: options.fileDestination,
    });
  });
});
