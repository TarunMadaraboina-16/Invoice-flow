import { Worker } from "bullmq";
import { RedisOptions } from "ioredis";
import { prisma } from "../db/prisma";

const connection: RedisOptions = {
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,   // REQUIRED
};

const worker = new Worker(
  "invoiceQueue",
  async job => {
    const { customerId, amount } = job.data;

    await prisma.invoice.create({
      data: {
        customerId,
        amount,
        status: "COMPLETED",
      },
    });

    console.log(`Processed invoice for ${customerId}`);
  },
  { connection }
);

worker.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});

   