import { search } from "./lib/search";
import { getText } from "./lib/scrape";
import { getSummary, getTranslation } from "./lib/llm";

import sequelize from "./lib/db";
import models from "./models";

async function main() {
  models.Resource.sync({force: true});
  // const urls = await search("resources for women located in colombo");
  // await sleep(1);
  // const text = await getText(urls[0]);
  // await sleep(1);
  // const summary = await getSummary(text);
  // await sleep(1);
  // const translated = await getTranslation(summary as string, "sinhala");
  // console.log(urls[0]);
  // console.log(summary);
}
main();
