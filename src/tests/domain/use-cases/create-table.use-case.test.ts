import { CreateTable } from "../../../domain/use-cases/create-table.use-case";

describe("CreateTableUseCase", () => {
  test("should create table with default values", () => {
    const createTable = new CreateTable();
    expect(createTable).toBeInstanceOf(CreateTable);
  });
});
