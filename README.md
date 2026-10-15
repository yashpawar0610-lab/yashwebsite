# PULSE Full-Stack Web Application Walkthrough

The **PULSE** Analytics Suite is a full-stack, enterprise-grade web application built with a modern glassmorphism design aesthetic, robust Express.js backend, MongoDB with Mongoose ODM, and a React + Vite frontend.

![Pulse Browser Session Demo](file:///C:/Users/yash%20pawar/.gemini/antigravity-ide/brain/96756ab1-074f-4e43-9a03-7b50f432d536/pulse_app_demo_1792066281463.webp)

---

## 1. Project Architecture & Monorepo Structure

```
C:\Users\yash pawar\.gemini\antigravity-ide\scratch\pulse-dashboard\
├── package.json                         # Root orchestration scripts
├── backend/
│   ├── config/
│   │   └── db.js                        # Mongoose connection to local MongoDB
│   ├── controllers/
│   │   ├── authController.js            # Register, Login, Me handlers
│   │   ├── dashboardController.js       # KPI aggregation & SVG chart endpoints
│   │   └── reportController.js          # CRUD, filtering, & CSV/JSON export
│   ├── middleware/
│   │   └── authMiddleware.js            # JWT verification & RBAC authorization
│   ├── models/
│   │   ├── User.js                      # User schema with bcrypt encryption
│   │   ├── Report.js                    # Report schema with status & metrics map
│   │   └── Activity.js                  # Audit log & activity stream schema
│   ├── routes/
│   │   ├── authRoutes.js                # /api/auth
│   │   ├── dashboardRoutes.js           # /api/dashboard
│   │   └── reportRoutes.js              # /api/reports
│   ├── seed/
│   │   └── seedData.js                  # Seed script with mock reports & accounts
│   ├── .env                             # Environment configuration
│   ├── package.json
│   └── server.js                        # Express server entry point (Port 5000)
└── frontend/
    ├── public/
    │   └── favicon.svg                  # SVG cyan pulse icon
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── GlassCard.jsx        # Translucent glass card container
    │   │   │   ├── Navbar.jsx           # Floating glass topbar with demo switcher
    │   │   │   ├── Sidebar.jsx          # Glass navigation sidebar
    │   │   │   ├── ThemeToggle.jsx      # Dark / Light theme switch
    │   │   │   ├── Modal.jsx            # Glass modal dialog
    │   │   │   └── Toast.jsx            # Auto-dismissing notification banner
    │   │   ├── auth/
    │   │   │   ├── LoginForm.jsx        # Glassmorphic login with quick demo roles
    │   │   │   └── RegisterForm.jsx     # Registration with RBAC role selection
    │   │   ├── dashboard/
    │   │   │   ├── StatCard.jsx         # KPI stat cards with trend badges
    │   │   │   ├── MetricChart.jsx      # Interactive SVG chart with area gradients
    │   │   │   ├── ActivityFeed.jsx     # Live security & audit timeline
    │   │   │   └── QuickActions.jsx     # Shortcut triggers
    │   │   └── reports/
    │   │       ├── ReportTable.jsx      # Sortable, paginated table with CSV/JSON export
    │   │       ├── ReportFilters.jsx    # Real-time search & category pills
    │   │       └── CreateReportModal.jsx# Report synthesis modal with custom KPI builder
    │   ├── context/
    │   │   ├── AuthContext.jsx          # JWT authentication and user state
    │   │   └── ThemeContext.jsx         # Dark / Light glassmorphism engine
    │   ├── services/
    │   │   └── api.js                   # Client REST service with Bearer token injection
    │   ├── App.css                      # Layout, grid, and animations
    │   ├── App.jsx                      # Main app shell & router
    │   ├── index.css                    # Glass tokens, typography, and resets
    │   └── main.jsx                     # React DOM root
    ├── index.html                       # HTML5 entry with Google Fonts
    ├── package.json
    └── vite.config.js
```

---

## 2. Key Features Implemented

1. **Classy Glassmorphism Design System**:
   - Translucent frosted glass surfaces (`backdrop-filter: blur(16px)`).
   - Radial ambient cyan and violet glowing background orbs that slowly pulse in the background.
   - Dual-theme engine (Dark mode & Light mode) with instantaneous, flash-free toggling.
   - Elegant typography using `Outfit` for bold headings and `Plus Jakarta Sans` for body copy.

2. **Full-Stack REST API & Database Integration**:
   - **Database**: MongoDB running on default port `27017` with **Mongoose ODM**.
   - **Authentication**: JWT token issuance with bcrypt password hashing and Bearer header authorization.
   - **Quick Demo Switcher**: Instant 1-click access to pre-configured accounts:
     - **Admin**: `admin@pulse.io` / `pulse123` (`Alexander Vance`)
     - **Analyst**: `sarah.analyst@pulse.io` / `pulse123` (`Sarah Connor`)

3. **Interactive Executive Dashboard**:
   - 4 Live KPI Stat Cards with trend badges (`+14.8%`, `+22.4%`, `+4.2%`, `+31.0%`).
   - Custom SVG time-series throughput & latency chart supporting `7D`, `30D`, and `90D` data slices with hover tooltips and gradient fills.
   - Real-time audit log and activity timeline.

4. **Analytics & Reports Repository**:
   - Multi-parameter live filtering (Category pills: `All`, `Financial`, `Operational`, `Marketing`, `System`).
   - Instant search across titles, summaries, and tags.
   - Status filtering (`Completed`, `Processing`, `Draft`, `Archived`).
   - Expandable report details showing executive synthesis and custom KPI badges.
   - Direct data export in **CSV** and **JSON** formats with automated download triggers.
   - Report Creation modal supporting dynamic custom key-value metrics.

---

## 3. How to Run Locally

You can run the entire monorepo with the following commands:

```bash
# Set your active directory
cd "C:\Users\yash pawar\.gemini\antigravity-ide\scratch\pulse-dashboard"

# 1. Seed or re-seed the MongoDB database:
npm run seed:backend

# 2. Start the Express Backend API (Runs on http://localhost:5000):
npm run start:backend

# 3. Start the Vite React Frontend (Runs on http://localhost:5173):
npm run start:frontend
```
