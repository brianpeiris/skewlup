import { QueueEvents, QueueEventsListener } from "bullmq";
import { queues } from "./jobs";
import logger from "./lib/logger";

const events = [
  "added",
  "completed",
  "drained",
  "failed",
  "error",
] as (keyof QueueEventsListener)[];

for (const queue of Object.values(queues)) {
  const queueEvents = new QueueEvents(queue.name);
  for (const event of events) {
    queueEvents.on(event, () => logger.debug(`${queue.name} - ${event}`));
  }
}

const query = process.argv.slice(2).join(" ");
queues.search.add("search", { query });
