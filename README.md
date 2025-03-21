# Medium__blog

## My First Project

Creating a blogging website using **serverless functions** with **Hono** as the backend framework. The backend is deployed on **Cloudflare Workers**, and the frontend is built with **React + TypeScript**.

Check it out: [Live Demo](https://rishi-medium.vercel.app/signup)

---

## Project Structure
```
Medium__blog/
├── backend/   # Hono backend with Wrangler & Prisma
├── frontend/  # React + TypeScript frontend
```

## Setup Guide

### Prerequisites
- **Node.js** (v16+ recommended)
- **Wrangler CLI** (for Cloudflare Workers)
- **Vercel CLI** (for frontend deployment)
- **Prisma CLI** (for database management)

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/Medium__blog.git
cd Medium__blog
```

### 2. Backend Setup (Hono + Prisma)
```sh
cd backend
npm install
npm run dev
```
- Configure your backend in `src/config.ts`:
  ```ts
  export const BACKEND_URL = "your_backend_url_here";
  ```
- In `wrangler.toml`, add:
  ```toml
  DATABASE_URL = "your_prisma_accelerate_url"
  SECRET_KEY = "your_secret_key"
  ```

### 3. Database Setup (Prisma)
```sh
cd backend
```
- Use **NeonDB** or **PlanetScale** as the database.
- Update `DATABASE_URL` in `.env`:
  ```env
  DATABASE_URL="your_database_url_here"
  ```
- Run migrations:
  ```sh
  npx prisma migrate dev
  ```

### 4. Frontend Setup (React + TypeScript)
```sh
cd frontend
npm install
npm run dev
```
- Update `src/config.ts` with your backend URL:
  ```ts
  export const BACKEND_URL = "your_backend_url_here";
  ```

### 5. Features
- **Write, Edit, and Save Drafts**
- **Publish Later**
- **Image Uploads using Cloudinary**
- **Authentication & Authorization**

### 6. Deployment
- **Backend (Cloudflare Workers)**
  ```sh
  wrangler publish
  ```
- **Frontend (Vercel)**
  ```sh
  vercel --prod
  ```
