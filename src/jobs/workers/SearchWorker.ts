import { Worker } from "bullmq";
import connection from "../connection.js";
import { search } from "../../lib/search.js";
import { queues } from "../index.js";
import logger from "../../lib/logger.js";

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
