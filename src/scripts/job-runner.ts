import { QueueEvents, QueueEventsListener } from "bullmq";
import { connection, queues } from "../jobs";
import models from "../models";
import logger from "../lib/logger";

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
    queueEvents.on(event, (e: any) => {
      if (e.failedReason) {
        logger.debug(`${queue.name} - ${event} - ${e.failedReason}`);
      } else {
        logger.debug(`${queue.name} - ${event}`);
      }
    });
  }
}

const country = process.argv[2];
const city = process.argv[3];
const query = process.argv.slice(4).join(" ");
queues.search.add("search", { country, city, query });
