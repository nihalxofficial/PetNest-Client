<div align="center">

# 🐾 PetNest

### *Find your perfect companion. Give them a forever home.*

**A full-stack Pet Adoption Platform where users can explore pets, submit adoption requests, and manage listings — all with secure authentication and a beautiful responsive UI.**

[![Live Site](https://img.shields.io/badge/Live-Site-2ea44f?style=for-the-badge)](https://petnest-olive.vercel.app/)
[![Client Repo](https://img.shields.io/badge/Client-Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nihalxofficial/PetNest-Client)
[![Server Repo](https://img.shields.io/badge/Server-Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nihalxofficial/PetNest-Server)
[![Docker](https://img.shields.io/badge/Docker-Images-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/r/nihalxofficial/petnest-client)

</div>

<!-- 📸 Add a banner screenshot or GIF of the app here -->
<img width="1356" height="2008" alt="Petnest-Home" src="https://github.com/user-attachments/assets/ce97ebb4-d815-41dd-8ca0-ab55c011bd1a" />


---

## 📑 Table of Contents

- [About](#-about)
- [Project Overview](#-project-overview)
  - [Objective](#objective)
  - [Target Audience](#target-audience)
  - [Platforms Used](#platforms-used)
  - [Deployments](#deployments)
- [Key Features](#-key-features)
- [User Flows](#️-user-flows)
- [Authentication Flow (JWT + Better Auth)](#-authentication-flow-jwt--better-auth)
- [Tech Stack](#️-tech-stack)
- [npm Packages Used](#-npm-packages-used)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started-without-docker)
- [Running with Docker](#-running-with-docker)
- [Roadmap](#️-roadmap)
- [License](#-license)

---

## 📖 About

PetNest is a real-world pet adoption portal that connects animal lovers with shelters and individual pet owners. Instead of a static listing page with a "contact owner" button, PetNest treats adoption as an actual workflow — with requests, statuses, and safeguards on both sides.

**What makes it different from a typical pet-listing clone:**

- **Real adoption request lifecycle** — adopters submit a request with a preferred pickup date and track it (Pending / Approved / Rejected) from a dedicated dashboard, instead of just messaging an owner.
- **Ownership safeguards built in** — owners can't submit requests for their own pets, and once a request is approved the pet is automatically locked from further requests, enforced on both client and server.
- **Secure, invisible auth** — Better Auth issues JWTs stored in HTTPOnly cookies (email/password + Google OAuth), with every protected route verifying the cookie before processing the request.
- **Shipped like a real product** — fully containerized with Docker (published images for both client and server) and deployed live, not just run locally.

---

## 🎯 Project Overview

### Objective
To design and build a complete pet adoption platform — from public browsing and search, through authenticated adoption requests, to owner-side listing and request management — while practicing secure authentication, request-state workflows, and containerized deployment.

### Target Audience
- **Adopters** looking to browse, search, and adopt pets online.
- **Pet Owners / Shelters** who want a simple way to list pets and manage incoming adoption requests.
- **Developers / Recruiters** reviewing this project as a demonstration of full-stack, auth-secured application development.

### Platforms Used
- **Frontend:** React + Next.js, Tailwind CSS, HeroUI
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Auth:** Better Auth (JWT plugin) with Google OAuth
- **Containerization:** Docker + Docker Compose, images published to Docker Hub
- **Hosting:** Vercel (client + server)

### Deployments
| Resource | Link |
|---|---|
| 🌐 Live Site | [petnest-olive.vercel.app](https://petnest-olive.vercel.app/) |
| 📁 Client Repo | [PetNest-Client](https://github.com/nihalxofficial/PetNest-Client) |
| 📁 Server Repo | [PetNest-Server](https://github.com/nihalxofficial/PetNest-Server) |
| 🐳 Client Docker Image | [nihalxofficial/petnest-client](https://hub.docker.com/r/nihalxofficial/petnest-client) |
| 🐳 Server Docker Image | [nihalxofficial/petnest-server](https://hub.docker.com/r/nihalxofficial/petnest-server) |

---

## ✨ Key Features

> Only the features that set PetNest apart are listed here — standard auth/CRUD basics are covered later in the docs.

- **Adoption Request Lifecycle** — authenticated users submit requests with a preferred pickup date; status (Pending / Approved / Rejected) is tracked live on the "My Requests" dashboard.
- **Adoption Lock & Ownership Guard** — pet owners cannot adopt their own pets; once a request is approved, the pet is auto-marked as adopted and further requests are disabled.
- **Owner Dashboard** — add, edit, or delete listings, and approve/reject incoming adoption requests per pet, all from one place.
- **Secure Authentication** — email/password and Google OAuth via Better Auth, with JWT stored in HTTPOnly cookies (invisible to JavaScript, resistant to XSS).
- **Persistent Protected Routes** — private routes stay accessible on reload; logged-in users are never unexpectedly bounced back to login.
- **Fully Responsive, Animated UX** — Framer Motion transitions and a dark/light theme toggle across mobile, tablet, and desktop.

---

## 🗂️ User Flows

### 🐾 For Adopters
1. **Register / Login** — sign up with email & password or continue with Google OAuth.
2. **Browse Pets** — search by name or filter by species on the All Pets page.
3. **View Pet Profile** — see full details: photos, description, age, species, and owner info.
4. **Submit Adoption Request** — fill in a short form with a preferred pickup date and submit.
5. **Track Requests** — the "My Requests" dashboard shows all submitted requests and their current status.

### 🏠 For Pet Owners / Shelters
1. **Add a Listing** — use the "Add Pet" form with photos, name, species, age, and description.
2. **Manage Listings** — edit or delete active listings from the "My Listings" dashboard.
3. **Handle Requests** — view incoming adoption requests per pet and approve or reject individually.
4. **Adoption Lock** — once a request is approved, the pet is automatically marked adopted and further requests are disabled.

### 🔐 Authentication & Authorization
- Better Auth handles the full auth lifecycle (sign up, sign in, session management, Google OAuth).
- On login, the server issues a JWT stored in an HTTPOnly cookie — invisible to JavaScript, resistant to XSS attacks.
- Every protected API route verifies the cookie before processing the request.
- Pet owners cannot submit adoption requests for their own pets (enforced on both client and server).

---

## 🔑 Authentication Flow (JWT + Better Auth)

**How it works, end to end:**

```
User Login (Better Auth) → authClient.token() / auth.api.getToken() → JWT from Better Auth → Sent in Authorization header to Express → Middleware verifies token → Private route access granted
```

### Setting Up Better Auth

Better Auth must be configured on both the client and server before token retrieval works. PetNest uses the **`jwt()` plugin** (backed by [`jose-cjs`](https://www.npmjs.com/package/jose-cjs)), which handles signing and verifying JWTs natively within Better Auth — no manual `jwt.sign()` call needed.

Install the peer dependency first:

```bash
npm install jose-cjs
```

#### Server-side Auth Setup (`lib/auth.ts`)

```ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import clientPromise from "./mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(await clientPromise.then(c => c.db())),
  plugins: [jwt()],
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: [process.env.CLIENT_URL!],
});
```

> ⚠️ The `jwt()` plugin is **required** on the server. It uses `jose-cjs` under the hood to sign tokens. Without it, `auth.api.getToken()` will return `null`.

#### Client-side Auth Setup (`lib/auth-client.ts`)

```ts
import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
  plugins: [jwtClient()],
});
```

> ⚠️ The `jwtClient()` plugin is **required** on the client. Without it, `authClient.token()` will return `null` or fail silently.

---

#### 1. Getting the Token — Client Side

```js
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function SomeProtectedComponent() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const { data: jwtData } = await authClient.token();
      setToken(jwtData?.token);
    };
    getToken();
  }, []);

  const fetchProtectedData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  };
}
```

#### 2. Getting the Token — Server Side

```ts
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${process.env.SERVER_URL}/pets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}
```

#### 3. Backend — Verifying the Token

```js
// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = verifyToken;
```

#### 4. Protecting Routes

```js
const verifyToken = require('../middleware/verifyToken');

router.post('/pets', verifyToken, async (req, res) => {
  const pet = await Pet.create({ ...req.body, ownerEmail: req.user.email });
  res.status(201).json(pet);
});

router.post('/adoptions', verifyToken, async (req, res) => {
  const request = await Adoption.create({ ...req.body, userEmail: req.user.email });
  res.status(201).json(request);
});
```

#### 5. Logout

```js
await authClient.signOut();
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Next.js | UI framework & SSR/routing |
| Tailwind CSS | Utility-first styling |
| Hero UI | Component library |
| Framer Motion | Animations & transitions |
| React Icons / Lucide React / Gravity UI Icons | Icon sets |
| React Toast | Toast notifications |
| Marquee | Scrolling banner component |
| JavaScript ES6+ | Core scripting |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB Atlas | Cloud database |
| Better Auth | Authentication provider |
| JWT (jsonwebtoken) | Stateless session tokens |
| Cookie-parser | HTTPOnly cookie handling |
| CORS | Cross-origin request configuration |
| dotenv | Environment variable management |

### DevOps & Deployment
| Technology | Purpose |
|---|---|
| Docker | Containerising client and server apps |
| Docker Compose | Multi-container orchestration |
| Docker Hub | Public image registry for distribution |
| Vercel | Frontend & backend cloud deployment |

---

## 📦 npm Packages Used

| Package | Purpose |
|---|---|
| `next` | React framework with App Router, SSR, and routing |
| `react` / `react-dom` | Core UI library |
| `@heroui/react` | Component library |
| `tailwindcss` | Utility-first CSS framework |
| `framer-motion` | Animations & transitions |
| `react-icons` | Icon library |
| `lucide-react` | Additional icon set |
| `@gravity-ui/icons` | Icon set (Gravity UI) |
| `react-hot-toast` | Toast notifications |
| `react-fast-marquee` | Scrolling banner component |
| `better-auth` | Authentication (JWT, social login) |
| `express` | REST API server (backend) |
| `mongoose` | MongoDB object modeling (backend) |
| `jsonwebtoken` | JWT signing/verification (backend) |
| `cookie-parser` | HTTPOnly cookie handling (backend) |
| `cors` | Cross-origin request configuration (backend) |
| `dotenv` | Environment variable management (backend) |
| `jose-cjs` | JWT signing peer dependency for Better Auth (backend) |

---

## 🔑 Environment Variables

**Client `.env.local`**
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Server `.env`**
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
PORT=5000
```

> Never commit `.env` / `.env.local` to version control.

---

## 🚀 Getting Started (Without Docker)

```bash
# Client
git clone https://github.com/nihalxofficial/PetNest-Client
cd PetNest-Client
npm install
npm run dev   # starts on :3000
```

```bash
# Server (separate terminal)
git clone https://github.com/nihalxofficial/PetNest-Server
cd PetNest-Server
npm install
npm run dev   # starts on :5000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Running with Docker

PetNest is fully containerised. You can run the entire stack locally using Docker without installing Node.js or any dependencies.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

Verify with:
```bash
docker version
docker compose version
```

### Option A — Pull images from Docker Hub *(recommended)*

No need to clone the repo. Just create these two files and run.

**Step 1 — Create `docker-compose.yml`**
```yaml
version: "3.9"

services:
  client:
    image: nihalxofficial/petnest-client:v1
    ports:
      - "3000:3000"
    env_file:
      - ./client.env
    depends_on:
      - server
    networks:
      - petnest-net

  server:
    image: nihalxofficial/petnest-server:v1
    ports:
      - "5000:5000"
    env_file:
      - ./server.env
    networks:
      - petnest-net

networks:
  petnest-net:
    driver: bridge
```

**Step 2 — Create `client.env`**
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Step 3 — Create `server.env`**
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
PORT=5000
```

**Step 4 — Pull and run**
```bash
docker compose pull
docker compose up -d
```

Visit **[http://localhost:3000](http://localhost:3000)** 🎉

### Option B — Build from source

```bash
# Clone both repos into the same folder
git clone https://github.com/nihalxofficial/PetNest-Client petnest
git clone https://github.com/nihalxofficial/PetNest-Server petnest-server

# Add your env files (see Environment Variables section above)
# petnest/.env.local
# petnest-server/.env

# Build and start
docker compose up --build
```

### Useful Docker Commands

| Command | Description |
|---|---|
| `docker compose up -d` | Start all containers in the background |
| `docker compose down` | Stop and remove containers |
| `docker compose logs -f` | Watch live logs from all containers |
| `docker compose logs -f client` | Watch client logs only |
| `docker compose logs -f server` | Watch server logs only |
| `docker compose ps` | Check container status |
| `docker compose up --build` | Rebuild images and start |
| `docker compose pull` | Pull latest images from Docker Hub |

---

## 🗺️ Roadmap

<!-- Optional: list planned improvements -->
- [ ] In-app messaging between adopters and owners
- [ ] Wishlist / favorites for adopters
- [ ] Multi-image upload per listing
- [ ] Email notifications for adoption request status changes
- [ ] Map-based pet search by location

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Made with ❤️ by <a href="https://github.com/nihalxofficial">nihalxofficial</a>

</div>
