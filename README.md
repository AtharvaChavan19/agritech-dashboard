# AgriTech Dashboard Portal

A state-of-the-art agricultural monitoring platform combining satellite classification ML models with IoT sensor data.

## Project Structure

```
├── frontend/                # React (Vite) App
│   ├── src/
│   │   ├── components/      # Reusable UI (GlassCard, Sidebar)
│   │   ├── pages/           # Page layouts (Dashboard, charts)
│   │   ├── services/        # Fetch API clients
│   │   ├── App.jsx          # Component binder
│   │   ├── index.css        # Glassmorphic layout design rules
│   │   └── main.jsx         # React mounting entrypoint
│   ├── index.html           # Main HTML shell (Outfit & Inter fonts)
│   ├── vite.config.js       # Vite configuration (reverse proxy setup)
│   └── package.json         # Node dependencies (React, Lucide icons)
│
├── backend/                 # FastAPI Application
│   ├── app/
│   │   ├── routes/          # Endpoints (telemetry, upload analytics)
│   │   ├── models/          # Schemas (Pydantic validation)
│   │   ├── utils/           # Generators & helper functions
│   │   ├── inference.py     # Mock ML Predictor engine
│   │   └── main.py          # FastAPI application entrypoint
│   ├── uploads/             # Directory for processed satellite images
│   └── requirements.txt     # Python packages list
│
└── README.md                # Project startup documentation
```

---

## 🛠️ Backend Setup & Startup

The FastAPI backend runs on Python and provides dynamic API routes for sensor readings and image uploads.

### Prerequisite
Ensure you have **Python 3.10+** installed. (On Windows, you can launch commands using the `py` launcher).

### Steps
1. Navigate to the `backend/` directory in your terminal:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   py -m venv venv
   ```

3. Activate the virtual environment:
   - **Command Prompt (cmd):**
     ```cmd
     venv\Scripts\activate.bat
     ```
   - **PowerShell (default VSCode terminal):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```

4. Install the backend package requirements:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the FastAPI development server using Uvicorn:
   ```bash
   py -m app.main
   ```
   The backend server will run at `http://localhost:8000`. You can access the auto-generated Swagger API documentation directly at `http://localhost:8000/docs`.

---

## 💻 Frontend Setup & Startup

The frontend is built using React 18, Vite, and pure Vanilla CSS variables mapping out custom glassmorphism components.

### Prerequisite
Ensure you have **Node.js** (v18+) and **npm** installed.

### Steps
1. Open a new terminal session and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install the web packages:
   ```bash
   npm install
   ```

3. Launch the Vite local dev server:
   ```bash
   npm run dev
   ```
   The React web client will boot at `http://localhost:3000`.

---

## ⚙️ Development Features & Dev Proxies

- **Vite Proxy Settings:** Vite's development server includes a proxy config in `vite.config.js` that maps any `/api` and `/uploads` requests directly to `http://localhost:8000` (FastAPI). This prevents CORS issues during local programming.
- **Client Fallback Mode:** If the FastAPI backend is not running when the React app loads, the API client layer (`frontend/src/services/api.js`) automatically reverts to client-side data generators. This allows you to inspect the premium dashboard UI immediately even without booting up Python.
