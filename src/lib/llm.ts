import { Configuration, OpenAIApi } from "openai";
import logger from "./logger";

async function getResponse(prompt: string) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI configuration missing");
  }
  const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));

  const truncatedPrompt = prompt.slice(0, 2048);

  logger.debug("Requesting OpenAI completion");
  const startTime = Date.now();
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
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

export async function getSummary(text: string) {
  return getResponse(
    `Summarize the following website in less than 100 words. \n --- \n ${text}`
  );
}

export async function getTranslation(text: string, lang: string) {
  return getResponse(
    `Translate the following to ${lang}. \n --- \n ${text}`
  );
}
