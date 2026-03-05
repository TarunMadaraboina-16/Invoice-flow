# InvoiceFlow - Distributed Invoice Processing System
![CI](https://github.com/TarunMadaraboina-16/Invoice-flow/actions/workflows/ci.yml/badge.svg)
 
InvoiceFlow is a production‑style backend system designed to demonstrate real‑world distributed architecture patterns used by companies like Stripe, Uber, and Amazon. It processes invoices asynchronously using a queue‑based pipeline, enabling high throughput, fault tolerance, and horizontal scalability.
This project showcases senior‑level backend engineering concepts including background job processing, rate limiting, idempotency, container orchestration, and multi‑service architecture.

---
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-18.x-green" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue" />
  <img src="https://img.shields.io/badge/Redis-BullMQ-red" />
  <img src="https://img.shields.io/badge/Postgres-15-blue" />
  <img src="https://img.shields.io/badge/Docker-Compose-blue" />
</p>

🚀 Architecture Overview

InvoiceFlow is built as a distributed system with clear service boundaries:
- API Service (Node.js + TypeScript)
Receives invoice creation requests, validates input, applies rate limiting and idempotency, and enqueues jobs.
- Worker Service (Node.js + TypeScript + BullMQ)
Processes invoice jobs asynchronously, performs business logic, and writes results to Postgres.
- Redis (Queue Broker)
Acts as the message broker for BullMQ, enabling fast, reliable job scheduling.
- Postgres (Database)
Stores invoice records and processing results.
- Docker Compose
Orchestrates all services locally, simulating a production‑like environment.

Client → API → Redis Queue → Worker → Postgres

This architecture mirrors real production systems that need to handle high traffic and long‑running tasks without blocking API responses.

🧩 Key Features

- Asynchronous Invoice Processing
Heavy work is offloaded to background workers for speed and reliability.
- Rate Limiting
Protects the API from abuse, spikes, and accidental overload.
- Idempotency Keys
Ensures duplicate requests do not create duplicate invoices.
- Distributed Architecture
API and Worker run as separate services, enabling independent scaling.
- BullMQ Queue System
High‑performance job scheduling backed by Redis.
- Postgres + Prisma ORM
Strong schema, migrations, and type‑safe database access.
- Dockerized Services
Fully containerized environment for consistent local development.
- Scalable Design
Worker concurrency and horizontal scaling allow millions of jobs per hour.

📦 Tech Stack
- Node.js + TypeScript
- Express.js
- BullMQ
- Redis
- PostgreSQL
- Prisma ORM
- Docker & Docker Compose

🛠️ Running the System Locally
1. Clone the repository
git clone https://github.com/TarunMadaraboina-16/Invoice-flow.git
cd Invoice-flow

2. Create environment files
Copy .env.example into the API and Worker folders:
api/.env
worker/.env
Fill in the required variables (Postgres URL, Redis URL, etc.).

3. Start all services
docker compose up --build
This launches:
- API service
- Worker service
- Redis
- Postgres

4. Test the API
Send a POST request:
POST http://localhost:3000/v1/invoices
Content-Type: application/json
idempotency-key: test-123

{
  "customerId": "CUST-001",
  "amount": 1200
}

You’ll receive an immediate response while the worker processes the invoice in the background.

📈 Scaling Strategy
InvoiceFlow is designed to scale horizontally with minimal changes.
API Scaling
- Stateless API → scale with multiple containers
- Add a load balancer (AWS ALB)
- Redis handles high request throughput
Worker Scaling
- Increase concurrency:
new Worker("invoiceQueue", handler, { concurrency: 50 });
  - Run multiple worker containers
- Scale based on queue depth
Redis Scaling
- Move to AWS ElastiCache
- Enable clustering for millions of jobs
Database Scaling
- Move to AWS RDS
- Add read replicas
- Use connection pooling
Deployment Targets
- AWS ECS (Fargate) for API + Worker
- ElastiCache for Redis
- RDS for Postgres
This architecture supports millions of invoices per hour with proper scaling.

📚 Folder Structure
Invoice-flow/
│
├── api/
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   └── package.json
│
├── worker/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── .env.example


🧭 Future Enhancements
- Add Bull Board UI for job monitoring
- Add structured logging (Pino/Winston)
- Add metrics (Prometheus + Grafana)
- Add authentication (JWT or API keys)
- Deploy to AWS ECS with CI/CD
- Add dead‑letter queues and retry strategies

