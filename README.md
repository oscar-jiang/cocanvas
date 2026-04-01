# cocanvas

A real-time collaborative document editing and project management platform. Create shared workspaces (rooms), invite teammates, co-edit rich-text documents, and chat — all in one place.

---

## Features

- **Real-time collaboration** — Multiple users can edit documents and chat simultaneously, powered by Socket.io.
- **Rich text editor** — Full-featured editor built on [Tiptap](https://tiptap.dev/) with formatting toolbar, floating menu, and bubble menu.
- **Rooms & workspaces** — Create up to 10 rooms per user; each room holds up to 9 documents.
- **Collaborator management** — Invite users by email, accept/decline invitations via an inbox, and manage room access.
- **Real-time chat** — Per-room messaging with image support and read-receipt tracking.
- **Project templates** — Bootstrap new rooms from pre-built templates.
- **Authentication** — JWT-based auth stored in httpOnly cookies with bcrypt password hashing.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite 7 | Build tool & dev server |
| Tailwind CSS 4 + DaisyUI 5 | Styling & components |
| Zustand 5 | Client-side state management |
| Tiptap 3 | Rich text editor |
| Socket.io-client 4 | Real-time communication |
| Axios | HTTP client |
| React Router DOM 7 | Client-side routing |
| Lucide React | Icons |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 + TypeScript | Web server |
| MongoDB + Mongoose 8 | Database & ODM |
| Socket.io 4 | Real-time communication |
| JSON Web Token (JWT) | Authentication |
| bcryptjs | Password hashing |
| Cloudinary | Image uploads |
| UUID | Resource ID generation |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **MongoDB** instance (local or hosted, e.g. MongoDB Atlas)
- **Cloudinary** account (for image upload support)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/oscar-jiang/cocanvas.git
   cd cocanvas
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running in Development

**Backend** (starts on `http://localhost:5001`):

```bash
cd backend
npm run dev
```

**Frontend** (starts on `http://localhost:5173`):

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

### Building for Production

```bash
cd frontend
npm run build
```

---

## Project Structure

```
cocanvas/
├── backend/
│   └── src/
│       ├── controllers/   # Route handler logic
│       ├── lib/           # DB connection, Socket.io setup
│       ├── middleware/     # Auth, room-access guards
│       ├── models/        # Mongoose schemas (User, Room, Document, Message, Invitation, Template)
│       ├── routes/        # Express routers
│       └── index.ts       # Entry point
└── frontend/
    └── src/
        ├── components/    # Reusable UI components
        ├── pages/         # Route-level page components
        ├── store/         # Zustand state stores
        ├── lib/           # Axios instance, Socket.io client
        ├── types/         # TypeScript type definitions
        └── App.tsx        # Root component & routes
```

---

## API Overview

| Prefix | Description |
|---|---|
| `/api/auth` | Sign up, log in, log out, profile update, auth check |
| `/api/room` | Create, read, update, delete rooms; manage collaborators |
| `/api/doc` | Create, save, retrieve, delete documents within a room |
| `/api/message` | Send and retrieve room chat messages |
| `/api/inbox` | Send, accept, and decline room invitations |
| `/api/template` | Browse and create room templates |
