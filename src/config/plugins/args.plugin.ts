import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(process.argv)
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Es la base de la tabla de multiplicar",
  })
  .option("l", {
    alias: "listar",
    type: "number",
    default: 10,
    describe: "Muestra el limite de la  tabla",
  })
  .option("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "Muestra la tabla en consola",
  })

  .option("n", {
    alias: "name",
    type: "string",
    default: "multiplicacion-table",
    describe: "File name",
  })

  .option("d", {
    alias: "destination",
    type: "string",
    default: "outputs",
    describe: "File destination",
  })

  .check((argv, options) => {
    if (argv.b < 1) throw "la base tiene que ser mayor a 0";
    return true;
  })

  .parseSync();
