# Bookmark Manager

This project is a real-time Bookmark Management system built as a full-stack assignment using Next.js (App Router) and Supabase. Users can log in using Google OAuth, add private bookmarks, delete them, and see real-time updates across multiple tabs.

---

## Features

- Google OAuth login (no email/password)
- Add bookmarks (Title + URL)
- Delete your own bookmarks
- Bookmarks are private per user (Row Level Security)
- Real-time updates without page refresh
- Fully deployed on Vercel

---

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React
- Tailwind CSS

### Backend/Database
- Supabase Authentication (Google OAuth)
- Supabase PostgreSQL Database
- Supabase Realtime
- Row Level Security (RLS)

### Deployment
- Vercel

## Live Deployment 

Vercel URL: https://bookmark-manager-three-psi.vercel.app/

---
 
## Project Structure

```
bookmark-manager/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   └── supabaseClient.ts
├── public/
├── .env.local
├── package.json
├── tsconfig.json
└── README.md

```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Dhanush41916/bookmark-manager.git
cd bookmark-manager
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
```

---

### 4. Run the Project

```bash
npm install
```

App runs at: 
```bash
http://localhost:3000
```

---

## Database Setup

Create a table called `bookmarks`:
```bash
create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  created_at timestamp default now()
);
```

Enable Row Level Security:
```bash
alter table bookmarks enable row level security;
```

Create policies:
```bash
create policy "Users can read own bookmarks"
on bookmarks
for select
using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
on bookmarks
for insert
with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
on bookmarks
for delete
using (auth.uid() = user_id);
```

---

## Problems Faced

- 401 Unauthorized errors due to incorrect environment variables
- Google OAuth redirect loop caused by misconfigured redirect URLs
- RLS blocking inserts due to missing insert policy 
- Realtime updates not triggering due to missing subscription

---

## Notes

- `.env.local` is not commited for security reasons
- Google OAuth redirect URLs must be configured in:
  - Supabase Authentication settings
  - Google Cloud Console
- Environment variables must also be added in Vercel for production deployment

---

## Author

**Dhanush Peta**  
GitHub: https://github.com/Dhanush41916

Live Project (Vercel): 
https://bookmark-manager-three-psi.vercel.app/