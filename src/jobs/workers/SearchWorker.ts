import { Worker } from "bullmq";
import { search } from "../../lib/search";
import { queues } from "../index";
import logger from "../../lib/logger";

export default new Worker(
  "search",
  async (job) => {
    const urls = await search(job.data.query);
    logger.debug(`Got ${urls.length} urls`);
    for (const url of urls) {
      queues.resource.add("resource", { url });
    }
  },
  { limiter: { duration: 1000, max: 1 } }
);
