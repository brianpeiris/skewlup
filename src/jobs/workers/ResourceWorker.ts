import { Worker } from "bullmq";
import { getText } from "../../lib/scrape";
import { getSummary } from "../../lib/llm";
import models from "../../models";

function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export default new Worker(
  "resource",
  async (job) => {
    const { url } = job.data;

    const { title, text } = await getText(url);
    await sleep(1);
    const summary = await getSummary(text);

    await models.Resource.create({
      title,
      url,
      summary,
    });
  },
  { limiter: { duration: 1000, max: 1 } }
);
