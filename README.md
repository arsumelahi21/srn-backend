# Job Matcher Backend

This is the backend service for the Job Matcher technical test. It is built using **NestJS**, **Prisma**, and deployed on **Railway**. The backend handles job and candidate creation and performs vector similarity matching using PostgreSQL + pgvector.

---

## 🛠 Tech Stack

- **NestJS** – TypeScript-based Node.js framework
- **Prisma ORM** – Database toolkit
- **PostgreSQL** – Hosted on Supabase (with `pgvector` extension)
- **pgvector** – Used for semantic similarity matching
- **Railway** – Hosting for the backend

---

## 📦 Setup

### 1. Clone the Repository


git clone [https://github.com/your-username/job-matcher-backend.git](https://github.com/arsumelahi21/srn-backend.git)

cd srn-backend

npm install

---

### 2. Install Dependencies

npm install

---

### 3. Set Environment Variables

Create a .env file with the following contents:

DATABASE_URL=postgresql://your-user:your-password@your-host:5432/your-db

Make sure the pgvector extension is enabled on your PostgreSQL instance.

---

### 4. Generate Prisma Client


npx prisma generate

---

### 5. Run the Development Server

npm run start:dev

---

🧪 API Endpoints

| Method | Endpoint        | Description                  |
|--------|-----------------|------------------------------|
| POST   | `api/jobs`         | Add a new job                |
| POST   | `api/candidates`   | Add a new candidate          |
| POST   | `api/match`        | Get candidate matches        |



