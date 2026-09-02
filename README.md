# DEV.NEXUS26

Dev.Nexus26 is a full-stack AI tools directory and developer learning hub for **@dev.nexus26**. It combines searchable AI tools, courses, roadmaps, resources, articles, authentication, premium-content flags, feedback, uploads, and a protected admin workspace.

## Stack

- **Client:** React 19, Vite, TypeScript, React Router, Tailwind CSS v4, Framer Motion, Zustand, Axios, Lucide
- **Server:** Node.js, Express 5, TypeScript, Mongoose, MongoDB Atlas, Argon2, JWT HTTP-only cookie authentication, Helmet, CORS, Multer
- **Storage:** local `uploads/` in development; the upload service is isolated so it can be replaced with S3/Cloudinary in production

## Project structure

```text
client/src/
  components/ layouts/ pages/ services/ store/
server/src/
  config/ controllers/ middleware/ models/ routes/ utils/ validators/
```

## Features

- Public homepage, AI tools search/filter/detail pages, courses, resources, blog, roadmaps, and contact form
- User registration/login/logout with Argon2 password hashes and generated `DEV-000001` IDs
- Protected user dashboard and admin-only routes
- Single-admin seed flow using environment credentials
- Mongoose models for users, AI tools, posts, courses, resources, roadmaps, feedback, and bookmarks
- Admin CRUD API foundations for content plus protected upload endpoint
- Premium/free flags are stored server-side and ready for entitlement checks
- Responsive navigation, branded visual system, loading/empty states, and social links

## Prerequisites

- Node.js 20+
- npm 10+
- MongoDB Atlas database (or a local MongoDB instance)

## Installation

```powershell
git clone <your-repository-url>
cd dev-nexus26
npm install --prefix server
npm install --prefix client
Copy-Item .env.example server\.env
```

Edit `server/.env` with a MongoDB URI and long random JWT secrets. Never commit this file.

## Run locally

Use two terminals:

```powershell
# Terminal 1
npm run dev --prefix server

# Terminal 2
npm run dev --prefix client
```

Open [http://localhost:5173](http://localhost:5173). The API health check is [http://localhost:5000/health](http://localhost:5000/health).

## Create the admin

After MongoDB is configured:

```powershell
npm run seed:admin --prefix server
```

The command reads `ADMIN_EMAIL` and `ADMIN_PASSWORD`, hashes the password with Argon2, creates `DEV-000000`, and refuses to create a duplicate admin. Sign in at `/admin/login`.

## Step-by-step admin guide

1. Open the project folder in VS Code:

   ```text
   C:\Users\ar187\OneDrive\Desktop\PROJECT\dev-nexus26
   ```

2. Start MongoDB Atlas or your local MongoDB server. Confirm that `server/.env` contains:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_long_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_strong_password
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

3. Create the admin account once:

   ```powershell
   npm run seed:admin --prefix server
   ```

   `Admin user seeded successfully!` means the account was created. `Admin user already exists!` means it is ready to use.

4. Open a VS Code terminal and start the backend:

   ```powershell
   npm run dev:server
   ```

   Check that `http://localhost:5000/health` returns a success response.

5. Open a second terminal and start the frontend:

   ```powershell
   npm run dev:client
   ```

6. Open the admin login page:

   ```text
   http://localhost:5173/admin/login
   ```

7. Sign in with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values from `server/.env`. Do not put these credentials in frontend code or share them publicly.

8. After login, use these admin pages:

   ```text
   Dashboard: http://localhost:5173/admin/dashboard
   AI tools:  http://localhost:5173/admin/ai-tools
   ```

   The dashboard loads live statistics from the protected admin API. AI Tools allows searching, publishing, and deleting tools.

9. If the dashboard redirects to `/login`, the browser does not have a valid admin session. Return to `/admin/login`, confirm both servers are running, and sign in again. Normal users and invalid credentials are denied admin access.

10. Stop either development server with `Ctrl+C`. Never commit `server/.env`; it contains private database and admin credentials.

## Build and production start

```powershell
npm run build --prefix client
npm run build --prefix server
npm run start --prefix server
```

Deploy the client to Vercel/Netlify and the server to Render/Railway. Set `VITE_API_URL` in the client deployment to the public server API URL, and set `CLIENT_URL` in the server deployment to the client URL.

## API overview

| Area | Endpoints |
| --- | --- |
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/profile` |
| AI tools | `GET/POST /api/ai-tools`, `GET /api/ai-tools/:slug`, protected `PUT/DELETE /api/ai-tools/:id` |
| Posts | `GET/POST /api/posts`, `GET /api/posts/:slug`, protected `PUT/DELETE /api/posts/:id` |
| Learning content | `/api/courses`, `/api/resources`, `/api/roadmaps` |
| Community | `POST /api/feedback`, `/api/bookmarks` |
| Uploads | `POST /api/upload` (admin protected) |
| Monitoring | `GET /health` |

## Security notes

- Passwords are never stored or returned; only Argon2 hashes are persisted.
- JWTs are sent via HTTP-only cookies and admin authorization is checked server-side.
- Keep MongoDB, JWT, admin, email, and cloud-storage credentials in environment variables.
- Configure MongoDB Atlas network access and a least-privilege database user before deployment.
- Replace development local uploads with private object storage and signed URLs for premium files.

## Content operations

The admin UI currently provides AI-tool management, while the server API is structured for posts, courses, resources, roadmaps, feedback, bookmarks, and uploads. Add future CMS screens by consuming the protected admin endpoints; publishing content does not require changing the public page components.

## Verification

Run both builds before deployment:

```powershell
npm run build --prefix client
npm run build --prefix server
```

Then start both dev servers and verify the home page, AI tools search/detail route, registration/login, dashboard guard, feedback form, API health check, and admin login.
