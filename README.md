# Harish A. Portfolio Monorepo

A production-ready full-stack developer portfolio featuring a **FastAPI backend** (Python 3.11), a **React + Tailwind CSS frontend** (Vite), and **PostgreSQL/PostGIS spatial database** integration. Optimized for multi-container local execution using Docker Compose and auto-orchestrated production hosting on **Render**.

## Key Features

1. **Split-Screen Hero**: Loaded with a custom 3D GLB portrait model using React Three Fiber, executing a smooth initial rotation from 180° to 0° facing the user.
2. **Interactive Skills Ecosystem**: A dynamic floating and bubbling grid built with Framer Motion and custom category filtering.
3. **Featured Projects Showcase**: Renders repositories dynamically fetched from `/api/repos` with fallback support for offline operations.
4. **Hackathon Victories Gallery**: Showcases verified hackathon victory logs mapped directly to static image asset path anchors (`/assets/images/hackathons/*`) with custom Trophy layouts.
5. **Database Integration**: Ready to map spatial configurations utilizing Postgres with PostGIS spatial extensions.

---

## Workspace Structure

```
portfolio/
├── backend/
│   ├── app/
│   │   ├── config.py       # Configuration setting schemas
│   │   ├── database.py     # SQLAlchemy Async session mapping
│   │   └── main.py         # FastAPI endpoints & caching systems
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── models/         # 3D assets directory (copy GLB here)
│   ├── src/
│   │   ├── components/     # Modulized React widgets
│   │   ├── App.jsx         # Layout entrypoint
│   │   └── index.css       # Tailwind classes & core aesthetics
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml      # Multi-container local orchestra
└── render.yaml             # Render infrastructure blueprint spec
```

---

## Getting Started (Local Run)

Here is a complete, step-by-step guide on how to clone, set up, and run this project from scratch on another person's machine.

### Prerequisites
Make sure the new system has the following installed:
* **Git** (to clone the repository)
* **Node.js** (v18 or higher recommended, for running the Frontend React app)
* **Python** (v3.11 or higher recommended, for running the Backend FastAPI app)
* **Docker Desktop** (optional, but highly recommended for running via Docker Compose)

---

### Option A: Running with Docker Compose (Recommended)
This is the easiest and fastest way to run the entire stack (Frontend + Backend + PostgreSQL Database) in a containerized environment with a single command.

#### 1. Place/Copy the 3D Model GLB File
Vite serves assets statically from the public directory. Make sure the 3D model file `Meshy_AI_Formal_Portrait_in_a__0717190241_texture.glb` is placed in:
```text
frontend/public/models/
```
*(If you are setting this up from scratch, you must copy or download your 3D model file to this location).*

#### 2. Start the Stack
Open your terminal (PowerShell, Command Prompt, or bash) in the root directory of the project and run:
```bash
docker-compose up --build
```
This command automatically builds the Docker images for the frontend/backend and provisions a PostgreSQL/PostGIS database.

Once initialized:
* **Frontend UI**: [http://localhost:3000](http://localhost:3000)
* **FastAPI Backend API**: [http://localhost:8000](http://localhost:8000)
* **Interactive API Documentation (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)
* **Database (PostGIS)**: Runs on localhost port `5432` with username `postgres`, password `postgres` and database name `portfolio`.

---

### Option B: Running Manually (Non-Docker Local Development)
If you want to run the application components directly on your system without Docker:

#### Part 1: Setting up the Frontend
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the Node package dependencies:
   ```bash
   npm install
   ```
3. Place your 3D model GLB file (`Meshy_AI_Formal_Portrait_in_a__0717190241_texture.glb`) inside `frontend/public/models/`.
4. Start the Vite local development server:
   ```bash
   npm run dev
   ```
   *The frontend will boot up and be accessible locally (usually at [http://localhost:5173](http://localhost:5173) or similar displayed in the terminal).*

#### Part 2: Setting up the Backend
The backend uses FastAPI and connects to a PostgreSQL database.

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   * **On Windows**:
     ```powershell
     python -m venv .venv
     .venv\Scripts\Activate.ps1
     ```
   * **On macOS/Linux**:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```
3. Install the Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure the Environment Variables: Create a `.env` file inside the `backend` folder (or set them directly in your shell environment) to point to your local PostgreSQL instance:
   ```env
   DATABASE_URL=postgresql+asyncpg://<username>:<password>@localhost:5432/portfolio
   GITHUB_USERNAME=your-github-username
   CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
   ```
5. Start the FastAPI development server:
   ```bash
   python -m uvicorn app.main:app --reload --port 8000
   ```
   *The backend server will run at [http://localhost:8000](http://localhost:8000).*

---

## Deploying to Render

This monorepo is fully configured with Render Blueprint IaC (`render.yaml`). To deploy:
1. Push this codebase to a GitHub/GitLab repository.
2. Log in to your [Render Dashboard](https://dashboard.render.com).
3. Go to **Blueprints** and click **New Blueprint Instance**.
4. Link your git repository.
5. Render will auto-detect `render.yaml` and provision:
   * **FastAPI Web Service** (Docker)
   * **React Static Frontend** (SPA Routing rules enabled)
   * **PostgreSQL Database** (PostGIS extensions can be enabled by executing `CREATE EXTENSION postgis;` inside the DB console)
