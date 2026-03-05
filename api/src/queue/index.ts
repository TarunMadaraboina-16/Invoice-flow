import { Queue } from "bullmq";
import { RedisOptions } from "ioredis";

const connection: RedisOptions = {
  host: "redis",   // <— FIXED
  port: 6379,
  maxRetriesPerRequest: null,
};

export const invoiceQueue = new Queue("invoiceQueue", {
  connection,
});