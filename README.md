Bookmark Manager

This project is a real-time Bookmark Management system built as part of a full-stack technical assignment. It allows users to log in using Google OAuth, add private bookmarks, and see updates instantly across multiple tabs.

Features

Login using Google (OAuth only)

Add bookmarks (Title + URL)

Delete your own bookmarks

Bookmarks are private per user

Real-time updates without page refresh

Deployed on Vercel

Tech Stack
Frontend

Next.js (App Router)

React

Tailwind CSS

Backend / Database

Supabase (Auth)

Supabase (PostgreSQL Database)

Supabase (Realtime)

Row Level Security (RLS)

Project Structure
bookmark-manager/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── lib/
│   └── supabaseClient.ts
│
├── public/
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
Setup Instructions
1. Clone the Repository
git clone https://github.com/Dhanush41916/bookmark-manager.git
cd bookmark-manager
2. Install Dependencies
npm install
3. Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
4. Run the Project
npm run dev

App runs at:

http://localhost:3000
Database Setup

Create a table called bookmarks with:

id (uuid, primary key)

user_id (uuid)

title (text)

url (text)

created_at (timestamp, default now())

Enable Row Level Security and create policies:

Users can read their own bookmarks

Users can insert their own bookmarks

Users can delete their own bookmarks

Deployment

Deployed on Vercel:

https://bookmark-manager-three-psi.vercel.app
Author

Dhanush Peta
GitHub: https://github.com/Dhanush41916