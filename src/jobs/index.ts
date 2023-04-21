import { Queue } from "bullmq";
import connection from "./connection.js";
import SearchWorker from "./workers/SearchWorker.js";
import ResourceWorker from "./workers/ResourceWorker.js";

const queues = {
  search: new Queue("search", { connection }),
  resource: new Queue("resource", { connection }),
};

const workers = {
  SearchWorker,
  ResourceWorker,
};

export { connection, queues, workers };
