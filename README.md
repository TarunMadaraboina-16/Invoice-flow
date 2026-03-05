# InvoiceFlow- Asynchronous Invoice Processing System
![CI](https://github.com/TarunMadaraboina-16/Invoice-flow/actions/workflows/ci.yml/badge.svg)

InvoiceFlow is a scalable backend system built with Node.js, TypeScript, Express, BullMQ, Redis, and Prisma.  
It demonstrates production-grade patterns used by companies like Stripe, Uber, and Goldman Sachs.

---
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-18.x-green" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue" />
  <img src="https://img.shields.io/badge/Redis-BullMQ-red" />
  <img src="https://img.shields.io/badge/Postgres-15-blue" />
  <img src="https://img.shields.io/badge/Docker-Compose-blue" />
</p>

## Features
- Asynchronous invoice processing using BullMQ
- Redis-backed job queue
- Background worker for heavy tasks
- Idempotency keys (Stripe-style)
- Rate limiting
- Prisma ORM with SQLite/Postgres
- Clean modular TypeScript architecture
- Scales to millions of invoices with worker concurrency

---

## Architecture Overview
Client → API → Redis Queue → Worker → Database

- **API** receives invoice requests and enqueues jobs  
- **Redis** stores jobs in a queue  
- **Worker** processes invoices asynchronously  
- **Prisma** writes results to the database  

---

## 🛠️ Tech Stack
- Node.js + TypeScript  
- Express  
- BullMQ  
- Redis  
- Prisma ORM  
- SQLite (dev) / Postgres (prod)  

---

## Running Locally
1. Start Redis
```bash
docker run --name redis-server -p 6379:6379 -d redis
2. Install dependencies
npm install
3. Start the API
npm run dev
4. Start the Worker
npm run worker
5. Test invoice creation
curl -X POST http://localhost:3000/v1/invoices \
  -H "Content-Type: application/json" \
  -H "idempotency-key: test-123" \
  -d '{"customerId": "CUST-1", "amount": 150.75}'

📈 Scaling
- Increase worker concurrency
- Run multiple worker processes
- Use Redis Cloud / AWS ElastiCache
- Move to Postgres for high volume
- Add retries + dead-letter queues
