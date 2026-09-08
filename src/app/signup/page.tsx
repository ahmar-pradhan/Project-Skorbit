'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Success! Check your email to confirm your account.')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4 p-6">
        <h1 className="text-2xl font-bold">Sign up for Skorbit</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded border px-3 py-2 text-black bg-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full rounded border px-3 py-2 text-black bg-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded border px-3 py-2 text-black bg-white"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        {message && <p className="text-sm">{message}</p>}
      </form>
    </div>
  )
}