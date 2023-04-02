import { Queue } from "bullmq";
import SearchWorker from "./workers/SearchWorker";
import ResourceWorker from "./workers/ResourceWorker";

export const queues = {
  search: new Queue("search"),
  resource: new Queue("resource"),
};

export const workers = {
  SearchWorker,
  ResourceWorker,
};
