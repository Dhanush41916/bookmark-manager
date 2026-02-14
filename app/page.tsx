'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null
      setUser(sessionUser)
      if (sessionUser) fetchBookmarks(sessionUser.id)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user ?? null
        setUser(sessionUser)
        if (sessionUser) fetchBookmarks(sessionUser.id)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  const fetchBookmarks = async (userId: string) => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  const addBookmark = async () => {
    if (!title || !url || !user) return

    await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user.id
    })

    setTitle('')
    setUrl('')
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel('bookmarks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks'
        },
        () => {
          fetchBookmarks(user.id)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={login}
          className="px-6 py-3 bg-black text-white rounded"
        >
          Login with Google
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 gap-6">
      <p className="font-bold">{user.email}</p>

      <div className="flex flex-col gap-3 w-full max-w-md">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={addBookmark}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Bookmark
        </button>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-bold">{b.title}</p>
              <a
                href={b.url}
                target="_blank"
                className="text-blue-500 text-sm"
              >
                {b.url}
              </a>
            </div>
            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={logout}
        className="px-6 py-3 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  )
}