import { Request, Response } from "express";
import { prisma } from "../../db/prisma";
import { invoiceQueue } from "../../queue";

export async function createInvoice(req: Request, res: Response) {
  const { customerId, amount } = req.body as {
    customerId: string;
    amount: number;
  };

  const job = await invoiceQueue.add("processInvoice", {
    customerId,
    amount,
  });

  return res.status(202).json({
    message: "Invoice is being processed",
    jobId: job.id,
  });
}

export async function listInvoices(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const invoices = await prisma.invoice.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  return res.json({
    page,
    limit,
    data: invoices,
  });
}