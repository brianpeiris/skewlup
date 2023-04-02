import dotenv from "dotenv";
dotenv.config();

import logger from "./logger";

interface Result {
  url: string;
}

export async function search(query: string): Promise<string[]> {
  const BING_API_ENDPOINT = process.env.BING_API_ENDPOINT;
  const BING_API_KEY = process.env.BING_API_KEY;
  if (!BING_API_ENDPOINT || !BING_API_KEY) {
    throw new Error("Bing configuration missing");
  }

  const url = new URL(BING_API_ENDPOINT);
  url.searchParams.set("q", query);

  logger.debug("Requesting Bing search");
  const startTime = Date.now();
  const results = await fetch(url, {
    headers: {
      "Ocp-Apim-Subscription-Key": BING_API_KEY,
    },
  }).then((r) => r.json());
  logger.debug(`Received Bing search in ${Date.now() - startTime}ms`);

  return results.webPages.value.map((page: Result) => page.url);
}
