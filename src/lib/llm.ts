import dotenv from "dotenv";
dotenv.config();

import { Configuration, OpenAIApi } from "openai";
import logger from "./logger";

async function getResponse(prompt: string): Promise<string> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI configuration missing");
  }
  const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));

  const truncatedPrompt = prompt.slice(0, 2048);

  logger.debug("Requesting OpenAI completion");
  const startTime = Date.now();
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: truncatedPrompt,
      },
    ],
  });
  logger.debug(`Received OpenAI completion in ${Date.now() - startTime}ms`);

  return completion.data.choices[0].message?.content;
}

export async function getSummary(
  text: string
): Promise<{ summary: string; tags: string[] }> {
  const response = await getResponse(`
    Respond with json in the following format: {"summary": <summary>, "tags": [<tag1>, <tag2>, ...]}
    Summarize the following in less than 100 words and generate 5 tags that generally categorize the text. Each tag must be a single lowercase word.
    ---
    ${text}`);
  logger.debug(`summary ${response}`);
  return JSON.parse(response);
}

export async function isPrimarySource(text: string, query: string) {
  const response = await getResponse(`
    Respond with json in the following format: {"reasoning": <reasoning>, "isProvider": <boolean>}
    Based on the following text from a website, does this website provide ${query}?
    If the website is a review site, a blog, a news article, or a list article, it is not a provider.
    If the provider is not located in the specified city, it does not qualify.
    --- 
    ${text}
  `);
  logger.debug(`isPrimarySource\n${response}`);
  return JSON.parse(response).isProvider;
}
