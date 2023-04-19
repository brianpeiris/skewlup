import { Worker } from "bullmq";
import connection from "../connection";
import { search } from "../../lib/search";
import { queues } from "../index";
import logger from "../../lib/logger";

export default new Worker(
  "search",
  async (job) => {
    const { country, city, query } = job.data;
    const urls = await search(query);
    logger.debug(`Got ${urls.length} urls`);
    for (const url of urls) {
      queues.resource.add("resource", { country, city, query, url });
    }
  },
  { connection, limiter: { duration: 1000, max: 1 } }
);
