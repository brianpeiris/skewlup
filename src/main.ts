import dotenv from "dotenv";
dotenv.config();

import { search } from "./lib/search";
import { getText } from "./lib/scrape";
import { getSummary, getTranslation } from "./lib/llm";

function sleep(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function main() {
  const urls = await search("resources for women located in colombo, sri lanka");
  await sleep(1);
  const text = await getText(urls[0]);
  await sleep(1);
  const summary = await getSummary(text);
  await sleep(1);
  const translated = await getTranslation(summary as string, "sinhala");
  console.log(urls[0]);
  console.log(summary);
  console.log(translated);
}
main();
