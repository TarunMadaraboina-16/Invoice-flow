import { Router } from "express";
import { createInvoice, listInvoices } from "./invoices.controller";
import { idempotencyMiddleware } from "../middlewares/idempotency";

const router = Router();

router.post("/invoices", idempotencyMiddleware, createInvoice);
router.get("/invoices", listInvoices);

export default router;