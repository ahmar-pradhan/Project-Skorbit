'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setMessage(`Error: ${error.message}`)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel - dark hero */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-black p-12 text-white">
        <div className="text-xl font-bold">Skorbit</div>
        <div>
          <p className="mb-2 text-sm uppercase tracking-widest text-gray-400">
            Learn. Build. Belong.
          </p>
          <h1 className="text-5xl font-bold leading-tight">
            Build what <span className="text-indigo-400">matters.</span>
          </h1>
          <p className="mt-4 max-w-sm text-gray-400">
            Real-world projects. Expert feedback. Recognized credentials.
          </p>
        </div>
        <div className="text-sm text-gray-500">Skorbit © 2025</div>
      </div>

      {/* Right panel - form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-8">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-bold text-black">Welcome back</h2>
          <p className="text-sm text-gray-500">Log in to continue your journey</p>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border px-3 py-2 text-black bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border px-3 py-2 text-black bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-black py-2 text-white disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Continue'}
          </button>

          {message && <p className="text-sm text-red-600">{message}</p>}

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-indigo-600 underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}