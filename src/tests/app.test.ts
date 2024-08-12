import { ServerApp } from "../presentation/server-app";

describe("Test App.ts", () => {
  test("should call Server.run with values", async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = ["node", "app.ts", "-b", "10", "-l", "5", "test-file", "-d", "testdestination"];

    await import("../app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      fileDestination: "testdestination",
      fileName: "multiplicacion-table",
      limit: 5,
      showTable: false,
    });
  });
});
