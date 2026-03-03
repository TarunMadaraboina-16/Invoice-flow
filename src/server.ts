 import express from "express";
import invoiceRoutes from "./api/v1/invoices.routes";
import { limiter } from "./api/middlewares/rateLimit";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Apply rate limiting to all routes
app.use(limiter);

// Mount versioned API routes
app.use("/v1", invoiceRoutes);

// Start the server
app.listen(3000, () => {
  console.log("InvoiceFlow API running on port 3000");
});
