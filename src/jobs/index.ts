import { Queue } from "bullmq";
import connection from "./connection";
import SearchWorker from "./workers/SearchWorker";
import ResourceWorker from "./workers/ResourceWorker";

const queues = {
  search: new Queue("search", { connection }),
  resource: new Queue("resource", { connection }),
};

const workers = {
  SearchWorker,
  ResourceWorker,
};

export { connection, queues, workers };
