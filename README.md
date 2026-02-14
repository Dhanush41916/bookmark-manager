🔖 Bookmark Manager

A production-ready full-stack real-time Bookmark Manager built with Next.js (App Router) and Supabase.

This application demonstrates secure authentication, row-level data isolation, real-time database updates, and deployment on Vercel.

🚀 Live Demo

Deployed on Vercel:
👉 https://bookmark-manager-three-psi.vercel.app

📌 Project Objective

Build and deploy a real-time bookmark manager that:

Supports Google OAuth only

Allows authenticated users to add and delete bookmarks

Ensures strict data privacy per user

Updates bookmark list in real-time across multiple tabs

Is deployed and publicly accessible

🧠 Technical Overview

This project uses Supabase for:

Authentication (Google OAuth)

PostgreSQL Database

Row Level Security (RLS)

Real-time subscriptions

The frontend is built using:

Next.js (App Router architecture)

React Hooks

Tailwind CSS

🛠 Tech Stack

Frontend:

Next.js 16 (App Router)

React

Tailwind CSS

Backend:

Supabase (Auth + Database + Realtime)

PostgreSQL

Deployment:

Vercel

🔐 Authentication

Google OAuth via Supabase

No email/password authentication

Secure session handling using Supabase client

Automatic auth state tracking

🗂 Database Design

Table: bookmarks

Column	Type	Description
id	uuid	Primary Key
user_id	uuid	References authenticated user
title	text	Bookmark title
url	text	Bookmark URL
created_at	timestamp	Auto-generated
🔒 Row Level Security (RLS)

RLS is enabled on the bookmarks table to ensure:

Users can only read their own bookmarks

Users can only insert their own bookmarks

Users can only delete their own bookmarks

Policies use:

auth.uid() = user_id

This ensures complete data isolation between users.

⚡ Real-Time Functionality

The application subscribes to database changes using Supabase Realtime.

If two browser tabs are open:

Adding a bookmark in one tab automatically updates the other.

Deleting a bookmark syncs instantly.

No page refresh required.

📁 Project Structure
bookmark-manager/
│
├── app/
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   └── supabaseClient.ts
│
├── .env.local
├── package.json
└── README.md
🚧 Problems Faced & Solutions
1️⃣ OAuth Redirect Issues

Problem: Google login looped or returned 401 errors.
Solution: Correctly configured Redirect URLs in:

Supabase Auth settings

Google Cloud Console OAuth credentials

2️⃣ RLS Policy Errors

Problem: Policy already exists / blocked inserts.
Solution: Ensured proper RLS setup and avoided duplicate policy creation.

3️⃣ Invalid Supabase URL Error

Problem: Placeholder values used in createClient.
Solution: Configured proper environment variables and restarted dev server.

4️⃣ Realtime Not Triggering

Problem: Missing subscription cleanup or incorrect channel usage.
Solution: Properly subscribed to postgres_changes and handled cleanup.

🧪 How To Run Locally
git clone <your-repo-url>
cd bookmark-manager
npm install

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key

Then:

npm run dev
🌍 Deployment

GitHub repository connected to Vercel

Environment variables configured in Vercel dashboard

Production build auto-deployed from main branch

👤 Author

Dhanush Peta
Full-Stack Developer
Focused on secure, scalable web applications.

GitHub: https://github.com/Dhanush41916

📈 Key Takeaways

This project demonstrates:

Secure OAuth implementation

Database isolation using RLS

Real-time subscriptions

Full deployment workflow

Git workflow and version control