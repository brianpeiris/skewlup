import { QueueEvents, QueueEventsListener } from "bullmq";
import { connection, queues } from "../jobs/index.js";
import logger from "../lib/logger.js";
import { friendlyName } from "../lib/names.js";
import { readFileSync } from "fs";

const events = [
  "added",
  "completed",
  "drained",
  "failed",
  "error",
] as (keyof QueueEventsListener)[];

for (const queue of Object.values(queues)) {
  const queueEvents = new QueueEvents(queue.name, { connection });
  for (const event of events) {
    queueEvents.on(event, async (e: any) => {
      if (e.failedReason) {
        logger.debug(`${queue.name} - ${event} - ${e.failedReason}`);
      } else {
        logger.debug(`${queue.name} - ${event}`);
      }
      logger.debug(
        `${queue.name} - ${JSON.stringify(await queue.getJobCounts())}`
      );
    });
  }
}

const firstArg = process.argv[2];

if (firstArg.endsWith(".txt")) {
  const entries = readFileSync(firstArg, { encoding: "utf8" }).trim().split("\n");
  for (const entry of entries) {
    const [country, city, ...rest] = entry.split(" ");
    const topic = rest.join(" ");
    addSearch(country, city, topic);
  }
} else {
  const country = firstArg;
  const city = process.argv[3];
  const topic = process.argv.slice(4).join(" ");
  addSearch(country, city, topic);
}

function addSearch(country, city, topic) {
  queues.search.add("search", {
    country,
    city,
    query: `${topic} located in ${friendlyName(city)} ${friendlyName(country)}`,
  });
}
