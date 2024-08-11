const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("../../../config/plugins/args.plugin");
  return yarg;
};

describe("Test args", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);
    console.log(argv);
    expect(argv).toEqual(
      expect.objectContaining({ b: 5, l: 10, s: false, n: "multiplicacion-table" })
    );
  });

  test("should return custom values", async () => {
    const argv = await runCommand(["-b", "5", "-l", "20", "-s", "-n", "custom-table-name"]);
    expect(argv).toEqual(expect.objectContaining({ b: 5, l: 20, s: true, n: "custom-table-name" }));
  });
});
