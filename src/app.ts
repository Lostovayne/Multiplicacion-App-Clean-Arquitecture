import { yarg } from "./config/plugins/args.plugin";


(async () => {
  await main();
})();

async function main() {
  console.log(yarg);
}
