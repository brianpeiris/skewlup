import { QueueEvents, QueueEventsListener } from "bullmq";
import { connection, queues } from "./jobs";
import logger from "./lib/logger";

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

const query = process.argv.slice(2).join(" ");
queues.search.add("search", { query });
