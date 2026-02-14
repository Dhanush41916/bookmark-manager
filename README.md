🔖 Bookmark Manager

A full-stack real-time Bookmark Manager built with Next.js (App Router) and Supabase.
Users can securely log in with Google, manage private bookmarks, and see real-time updates across multiple tabs.

🌐 Live Demo

Vercel Deployment:
👉 https://bookmark-manager-three-psi.vercel.app

📂 GitHub Repository

👉 https://github.com/Dhanush41916/bookmark-manager

📌 Overview

This project demonstrates:

Google OAuth authentication

Row Level Security (RLS) with Supabase

Real-time database updates

Private user data isolation

Production deployment using Vercel

Each user can only see and manage their own bookmarks.

🚀 Features

✅ Google Sign-in (OAuth only, no email/password)

✅ Add bookmark (Title + URL)

✅ Delete own bookmarks

✅ Real-time updates across tabs

✅ Private data per user using RLS

✅ Fully deployed on Vercel

🧱 Tech Stack
Frontend

Next.js 16 (App Router)

React

Tailwind CSS

Backend / Database

Supabase

Authentication (Google OAuth)

PostgreSQL Database

Row Level Security (RLS)

Realtime Subscriptions

Deployment

Vercel

🏗 Project Structure
bookmark-manager/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── lib/
│   └── supabaseClient.ts
│
├── README.md
└── package.json
🔐 Authentication Flow

User clicks Login with Google

Supabase redirects to Google OAuth

After authentication:

User session is stored

User data becomes available

Session updates are handled using:

getSession()

onAuthStateChange()

🗄 Database Design
bookmarks table
Column	Type	Description
id	uuid	Primary Key
user_id	uuid	Linked to auth user
title	text	Bookmark title
url	text	Bookmark URL
created_at	timestamp	Auto-generated
🔒 Row Level Security (RLS)

Security policies ensure:

Users can only insert bookmarks where auth.uid() = user_id

Users can only select their own bookmarks

Users can only delete their own bookmarks

This guarantees data isolation between users.

⚡ Real-Time Implementation

Supabase Realtime is used to:

Subscribe to changes in the bookmarks table

Automatically update UI across multiple tabs

No manual page refresh required

🛠 Setup Instructions (Local Development)

Clone the repo:

git clone https://github.com/Dhanush41916/bookmark-manager.git

Install dependencies:

npm install

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key

Run:

npm run dev
⚠️ Challenges Faced
1️⃣ OAuth Redirect Loop

Issue: Login was redirecting back to login page repeatedly.
Solution: Corrected Google OAuth redirect URL and cleared local storage session.

2️⃣ 401 Unauthorized Error

Issue: Supabase returned unauthorized on /auth/v1/user.
Solution: Fixed incorrect project URL and publishable key in supabaseClient.ts.

3️⃣ RLS Policy Conflict

Issue: Policy already existed while creating SQL.
Solution: Dropped or reused existing policy instead of recreating.

📈 What This Project Demonstrates

Understanding of OAuth flows

Secure database design using RLS

Real-time frontend updates

Deployment readiness

Debugging production auth issues

👨‍💻 Author

Dhanush Peta
GitHub: https://github.com/Dhanush41916