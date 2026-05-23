<div align="center">

<img src="https://img.shields.io/badge/PetNest-Live-brightgreen?style=for-the-badge" alt="Live">
<img src="https://img.shields.io/badge/Stack-MERN%20%2B%20Next.js-blue?style=for-the-badge" alt="Stack">
<img src="https://img.shields.io/badge/Auth-Better%20Auth%20%2B%20JWT-orange?style=for-the-badge" alt="Auth">

# 🐾 PetNest

### *Find your perfect companion. Give them a forever home.*

A full-stack Pet Adoption Platform where users can explore pets, submit adoption requests and manage listings — all with secure authentication and a beautiful responsive UI.

[🌐 Live Site](https://petnest-olive.vercel.app/) · [🖥️ Server](https://petnest-server-sepia.vercel.app/) · [📁 Client Repo](https://github.com/nihalxofficial/PetNest-Client) · [📁 Server Repo](https://github.com/nihalxofficial/PetNest-Server)

</div>

---

## 📌 Purpose

PetNest is a real-world pet adoption portal that connects animal lovers with shelters and individual pet owners. Users can browse available pets, view detailed profiles and submit adoption requests. Pet owners/shelters can manage their listings and handle incoming adoption requests — all within a clean, secure and responsive interface.

---

## ✨ Features

- 🐶 **Browse & Search Pets** — Explore all available pets with search by name, filter by species and sorted listings using MongoDB `$regex` and `$in` operators
- 🔐 **Secure Authentication** — Email/password and Google OAuth login powered by Better Auth with JWT stored in HTTPOnly cookies
- 📋 **Adoption Request System** — Authenticated users can submit adoption requests with pickup dates; only one request per pet can be approved
- 🏠 **Owner Dashboard** — Pet owners can add, edit, delete listings and approve or reject incoming adoption requests
- 📱 **Fully Responsive Design** — Mobile, tablet and desktop layouts with Dark/Light theme toggle
- 🔒 **Protected Routes** — Private routes stay accessible on reload; logged-in users are never unexpectedly redirected to login
- ✅ **Adoption Control** — Pet owners cannot adopt their own pets; once a request is approved the pet is marked as adopted and no further requests are accepted
- 🎞️ **Smooth Animations** — Framer Motion transitions throughout the app for a polished experience

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

---

## 🗂️ How PetNest Works — Core User Flows

### 🐾 For Adopters

1. **Register / Login** — Sign up with email & password or continue with Google OAuth.
2. **Browse Pets** — Visit the All Pets page to search by name or filter by species. Each card shows key info at a glance.
3. **View Pet Profile** — Click any pet to see their full profile: photos, description, age, species and owner details.
4. **Submit Adoption Request** — Authenticated users can fill in a short form including their preferred pickup date and submit a request.
5. **Track Requests** — The "My Requests" dashboard shows all submitted requests along with their current status (Pending / Approved / Rejected).

### 🏠 For Pet Owners / Shelters

1. **Add a Listing** — Use the "Add Pet" form to create a new listing with photos, name, species, age and description.
2. **Manage Listings** — Edit or delete any of your active listings from the "My Listings" dashboard.
3. **Handle Requests** — View incoming adoption requests per pet and approve or reject them individually.
4. **Adoption Lock** — Once a request is approved, the pet is automatically marked as adopted and further requests are disabled.

### 🔐 Authentication & Authorization

- Better Auth handles the full auth lifecycle (sign up, sign in, session management, Google OAuth).
- On login, the server issues a JWT stored in an HTTPOnly cookie — invisible to JavaScript, resistant to XSS attacks.
- Every protected API route verifies the cookie before processing the request.
- Pet owners cannot submit adoption requests for their own pets (enforced on both client and server).

---

## 🔐 JWT Authentication Flow

### How It Works — End to End

```
User Login (Better Auth) → authClient.token() / auth.api.getToken() → JWT from Better Auth → Sent in Authorization header to Express → Middleware verifies token → Private route access granted
```

### Setting Up Better Auth

Better Auth must be configured on both the client and server sides before token retrieval works. PetNest uses the **`jwt()` plugin** (backed by [`jose-cjs`](https://www.npmjs.com/package/jose-cjs)) which handles signing and verifying JWTs natively within Better Auth — no manual `jwt.sign()` call needed.

Install the peer dependency first:

```bash
npm install jose-cjs
```

#### Server-side Auth Setup (`lib/auth.ts`)

```ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";  // ← jwt plugin
import clientPromise from "./mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(await clientPromise.then(c => c.db())),
  plugins: [jwt()], // ← required for auth.api.getToken() to work
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
import { jwtClient } from "better-auth/client/plugins"; // ← jwtClient, not bearerClient

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
  plugins: [jwtClient()], // ← required for authClient.token() to work
});
```

> ⚠️ The `jwtClient()` plugin is **required** on the client. Without it, `authClient.token()` will return `null` or fail silently. It must match the `jwt()` plugin used on the server.

---

### 1. Getting the Token — Client Side (React Component)

In client components, use `authClient.token()` to retrieve the JWT. Store it in state so it's available for authenticated API calls:

```js
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function SomeProtectedComponent() {
  const [token, setToken] = useState(null);

  // ─── Get JWT token once on mount ─────────────────────────────────────────
  useEffect(() => {
    const getToken = async () => {
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;
      setToken(jwtData?.token);
    };
    getToken();
  }, []);

  // Use token in your API calls
  const fetchProtectedData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  };

  // ...
}
```

---

### 2. Getting the Token — Server Side (Next.js Server Component / Route Handler)

In server components or API route handlers, use `auth.api.getToken()` with the incoming request headers:

```ts
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const { token } = await auth.api.getToken({
    headers: await headers(), //   passes cookies/auth headers from the request
  });

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Use token to call your Express backend
  const res = await fetch(`${process.env.SERVER_URL}/pets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}
```

---

### 3. Backend — Verifying the Token (Middleware)

The Express backend verifies the JWT from the `Authorization` header on every protected route:

```js
// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded payload to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = verifyToken;
```

---

### 4. Protecting Private Routes

```js
// routes/pets.js
const verifyToken = require('../middleware/verifyToken');

// Any route using verifyToken is protected
router.post('/pets', verifyToken, async (req, res) => {
  // Only reaches here if JWT is valid
  const pet = await Pet.create({ ...req.body, ownerEmail: req.user.email });
  res.status(201).json(pet);
});

router.post('/adoptions', verifyToken, async (req, res) => {
  // req.user.email is available from the decoded JWT
  const request = await Adoption.create({ ...req.body, userEmail: req.user.email });
  res.status(201).json(request);
});
```

### 5. Logout — Clearing the Session

Better Auth handles session destruction on logout. Call `authClient.signOut()` on the client:

```js
await authClient.signOut();
// Redirect to home or login page
```

---

## 📁 Project Structure

```
PetNest-Client/
├── app/
│   ├── (main)/              # Public layout
│   │   ├── page.jsx         # Home page
│   │   ├── all-pets/        # Browse pets
│   │   └── pets/[id]/       # Pet details + adoption form
│   ├── (dashboard)/         # Protected dashboard
│   │   ├── my-requests/
│   │   ├── add-pet/
│   │   └── my-listings/
│   └── login/ register/
├── components/
├── lib/
│   ├── auth.ts              # Better Auth server config (with bearer plugin)
│   └── auth-client.ts       # Better Auth client config (with bearerClient plugin)
└── public/

PetNest-Server/
├── routes/
│   ├── pets.js              # CRUD for pets
│   └── adoptions.js         # Adoption request logic
├── middleware/
│   └── verifyToken.js       # JWT verification middleware
├── models/
└── index.js
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Better Auth credentials

### Clone & Install

```bash
# Client
git clone https://github.com/nihalxofficial/PetNest-Client
cd PetNest-Client
npm install

# Server
git clone https://github.com/nihalxofficial/PetNest-Server
cd PetNest-Server
npm install
```

### Environment Variables

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

### Run

```bash
# Server
npm run dev   # starts on :5000

# Client (separate terminal)
npm run dev   # starts on :3000
```

---

## 📦 NPM Packages Used

### Client
`next` · `react` · `tailwindcss` · `@heroui/react` · `framer-motion` · `react-icons` · `lucide-react` · `@gravity-ui/icons` · `react-hot-toast` · `react-fast-marquee` · `better-auth`

### Server
`express` · `mongoose` · `jsonwebtoken` · `cookie-parser` · `cors` · `dotenv` · `better-auth` · `jose-cjs`

---

## 🌐 Live Links

| Resource | URL |
|---|---|
| 🌍 Live Site | https://petnest-olive.vercel.app/ |
| 🖥️ API Server | https://petnest-server-sepia.vercel.app/ |
| 📁 Client Repo | https://github.com/nihalxofficial/PetNest-Client |
| 📁 Server Repo | https://github.com/nihalxofficial/PetNest-Server |

---

## 📜 License

This project was built as part of an academic assignment. Feel free to explore the code for learning purposes.

---

<div align="center">
Made with ❤️ by <a href="https://github.com/nihalxofficial">nihalxofficial</a>
</div>