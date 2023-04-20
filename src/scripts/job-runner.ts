import { QueueEvents, QueueEventsListener } from "bullmq";
import { connection, queues } from "../jobs";
import logger from "../lib/logger";
import { friendlyName } from "../lib/names";

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

const country = process.argv[2];
const city = process.argv[3];
const topic = process.argv.slice(4).join(" ");
queues.search.add("search", {
  country,
  city,
  query: `${topic} located in ${friendlyName(city)} ${friendlyName(country)}`,
});
