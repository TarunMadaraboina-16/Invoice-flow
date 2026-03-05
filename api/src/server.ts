import express from "express";
import invoiceRoutes from "./api/v1/invoices.routes";
import { limiter } from "./api/middlewares/rateLimit";

const app = express();

app.use(express.json());
app.use(limiter);
app.use("/v1", invoiceRoutes);

app.listen(3000, () => {
  console.log("InvoiceFlow API running on port 3000");
});
