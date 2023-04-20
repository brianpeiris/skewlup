import puppeteer from "puppeteer";
import logger from "./logger";
import { createWriteStream, mkdirSync } from "fs";
import { randomUUID } from "crypto";
import * as stream from "stream";
import { ReadableStream } from "stream/web";
import * as jimp from "jimp";

export async function getText(url: string) {
  logger.debug("Getting page text");
  const browser = await launchBrowser();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });
  const title = await page.evaluate(() => {
    return document.title;
  });
  const text = await page.evaluate(() => {
    return document.body.innerText;
  });

  await browser.close();
  logger.debug("Got page text");

  return { title, text };
}

export async function saveThumbnail(url: string) {
  logger.debug("Saving thumbnail");
  const browser = await launchBrowser();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  let thumbnailSourceUrl = await page.evaluate(() => {
    return (
      document.querySelector("meta[property='og:image']") as HTMLMetaElement
    )?.content;
  });

  let thumbnailStream: stream.Readable;
  let thumbnailExtension: string;

  if (thumbnailSourceUrl) {
    const response = await fetch(thumbnailSourceUrl);
    thumbnailStream = stream.Readable.fromWeb(
      response.body as ReadableStream<any>
    );
    thumbnailExtension = response.headers.get("content-type").split("/")[1];
  } else {
    thumbnailStream = stream.Readable.from(
      await page.screenshot({ type: "jpeg" })
    );
    thumbnailExtension = "jpeg";
  }

  const thumbnailPath = await saveThumbnailStream(
    thumbnailStream,
    thumbnailExtension
  );

  await browser.close();
  logger.debug("Saved thumbnail");

  const thumbnailUrl = `/${thumbnailPath.split("/").slice(1).join("/")}`;
  return thumbnailUrl;
}

async function saveThumbnailStream(thumbnailStream, thumbnailExtension) {
  const thumbnailUuid = randomUUID();
  const uuidA = thumbnailUuid.slice(0, 2);
  const uuidB = thumbnailUuid.slice(2, 4);

  const thumbnailDirectory = `public/thumbnails/${uuidA}/${uuidB}`;
  mkdirSync(thumbnailDirectory, { recursive: true });
  const thumbnailPath = `${thumbnailDirectory}/${thumbnailUuid}.${thumbnailExtension}`;

  const writeStream = createWriteStream(thumbnailPath);
  const writeFinish = new Promise((resolve) =>
    writeStream.on("finish", resolve)
  );
  thumbnailStream.pipe(writeStream);
  await writeFinish;

  const image = await jimp.read(thumbnailPath);
  await new Promise((resolve) =>
    image.scaleToFit(400, 300).write(thumbnailPath, resolve)
  );

  return thumbnailPath;
}

function launchBrowser() {
  return puppeteer.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox"],
  });
}
