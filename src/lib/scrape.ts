import puppeteer from "puppeteer";
import logger from "./logger";

export async function getText(url: string) {
  logger.debug("Getting page text");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });
  const text = await page.evaluate(() => {
    return document.body.innerText;
  });

  await browser.close();
  logger.debug("Got page text");

  return text;
}
