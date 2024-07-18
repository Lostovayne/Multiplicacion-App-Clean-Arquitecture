import fs from "fs";

import { yarg } from "./config/plugins/args.plugin";

let outputMessage = "";
const base = yarg.base as number;
const listar = yarg.listar as number;

const headerMessage = `
=======================================
        Tabla del ${base}
=======================================
`;

for (let i = 1; i <= listar; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`;
}

outputMessage = headerMessage + outputMessage;

if (yarg.show) {
  console.log(outputMessage);
}

// crear la ubicacion de la carpeta
if (!fs.existsSync("./outputs")) {
  fs.mkdirSync("./outputs");
}

fs.writeFileSync(`./outputs/tabla-${base}.txt`, outputMessage);

console.log("File created successfully.");
