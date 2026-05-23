<div align="center">

<img src="https://img.shields.io/badge/PetNest-Live-brightgreen?style=for-the-badge" alt="Live">
<img src="https://img.shields.io/badge/Stack-MERN%20%2B%20Next.js-blue?style=for-the-badge" alt="Stack">
<img src="https://img.shields.io/badge/Auth-Better%20Auth%20%2B%20JWT-orange?style=for-the-badge" alt="Auth">

# 🐾 PetNest

### *Find your perfect companion. Give them a forever home.*

A full-stack Pet Adoption Platform where users can explore pets, submit adoption requests, and manage listings — all with secure authentication and a beautiful responsive UI.

[🌐 Live Site](https://petnest-olive.vercel.app/) · [🖥️ Server](https://petnest-server-sepia.vercel.app/) · [📁 Client Repo](https://github.com/nihalxofficial/PetNest-Client) · [📁 Server Repo](https://github.com/nihalxofficial/PetNest-Server)

</div>

---

## 📌 Purpose

PetNest is a real-world pet adoption portal that connects animal lovers with shelters and individual pet owners. Users can browse available pets, view detailed profiles, and submit adoption requests. Pet owners/shelters can manage their listings and handle incoming adoption requests — all within a clean, secure, and responsive interface.

---

## ✨ Features

- 🐶 **Browse & Search Pets** — Explore all available pets with search by name, filter by species, and sorted listings using MongoDB `$regex` and `$in` operators
- 🔐 **Secure Authentication** — Email/password and Google OAuth login powered by Better Auth with JWT stored in HTTPOnly cookies
- 📋 **Adoption Request System** — Authenticated users can submit adoption requests with pickup dates; only one request per pet can be approved
- 🏠 **Owner Dashboard** — Pet owners can add, edit, delete listings and approve or reject incoming adoption requests
- 📱 **Fully Responsive Design** — Mobile, tablet, and desktop layouts with Dark/Light theme toggle
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

## 🔐 JWT Authentication Flow

### How It Works — End to End

```
User Login → Server generates JWT → Stored in HTTPOnly Cookie → Sent automatically on every request → Express middleware verifies token → Private route access granted
```

### 1. Frontend — Requesting & Storing the Token

After a successful login (via Better Auth), the client calls the backend to generate a session token:

```js
// lib/auth.js (client-side)
export const getJwtToken = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/jwt`, {
    method: 'POST',
    credentials: 'include', // ← sends & receives cookies automatically
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: session.user.email }),
  });
  return res.json();
};
```

The server responds by setting an **HTTPOnly cookie** — JavaScript on the client cannot read or steal it, making it XSS-resistant.

```js
// Calling the token function after login succeeds
useEffect(() => {
  if (session?.user) {
    getJwtToken(); // triggers the cookie to be set server-side
  }
}, [session]);
```

### 2. Backend — Generating & Setting the Token

```js
// routes/auth.js
const jwt = require('jsonwebtoken');

router.post('/auth/jwt', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  const token = jwt.sign(
    { email },                         // payload
    process.env.JWT_SECRET,            // secret from .env
    { expiresIn: '7d' }                // expiry
  );

  res
    .cookie('petnest_token', token, {
      httpOnly: true,                  // ← not accessible via JS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',                // required for cross-origin (Vercel → Render)
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
    })
    .json({ success: true });
});
```

### 3. Backend — Verifying the Token (Middleware)

```js
// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies?.petnest_token;

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

### 5. Logout — Clearing the Cookie

```js
// routes/auth.js
router.post('/auth/logout', (req, res) => {
  res
    .clearCookie('petnest_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    })
    .json({ success: true });
});
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
├── lib/                     # Auth helpers, API utils
└── public/

PetNest-Server/
├── routes/
│   ├── auth.js              # JWT generation & logout
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
`express` · `mongoose` · `jsonwebtoken` · `cookie-parser` · `cors` · `dotenv` · `better-auth`

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