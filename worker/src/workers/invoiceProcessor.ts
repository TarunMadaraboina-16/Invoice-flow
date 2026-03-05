import { Worker } from "bullmq";
import { prisma } from "../db/prisma";

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
  {
    connection: {
      host: process.env.REDIS_HOST || "redis",
      port: 6379
    }
  }
);

worker.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});