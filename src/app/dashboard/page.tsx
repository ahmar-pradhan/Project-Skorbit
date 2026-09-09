'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
      setLoading(false)
    }
    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-black">
        Loading...
      </div>
    )
  }

  if (!user) return null

  const stats = [
    { label: 'Active projects', value: 4 },
    { label: 'In review', value: 2 },
    { label: 'Completed', value: 3 },
    { label: 'Certificates', value: 5 },
  ]

  const projects = [
    { name: 'Customer Churn Prediction', category: 'Machine Learning', deadline: '15 Sep 2025', status: 'In progress' },
    { name: 'Real Estate Listing Platform', category: 'Web Development', deadline: '22 Sep 2025', status: 'Under review' },
    { name: 'E-commerce Sales Analysis', category: 'Data Analysis', deadline: '12 Sep 2025', status: 'Completed' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-white p-6">
        <div className="mb-8 text-xl font-bold">Skorbit</div>
        <nav className="space-y-2 text-sm">
          <div className="rounded bg-indigo-50 px-3 py-2 font-medium text-indigo-700">Dashboard</div>
          <div className="px-3 py-2 text-gray-600">Projects</div>
          <div className="px-3 py-2 text-gray-600">Submissions</div>
          <div className="px-3 py-2 text-gray-600">Certificates</div>
          <div className="px-3 py-2 text-gray-600">Learning Path</div>
          <div className="px-3 py-2 text-gray-600">Settings</div>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 w-full rounded border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          Log out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Good morning, {user.email?.split('@')[0]}.</h1>
            <p className="text-sm text-gray-500">Small steps. Real progress.</p>
          </div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border bg-white p-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Projects table */}
        <h2 className="mb-3 text-lg font-semibold">Your projects</h2>
        <div className="overflow-hidden rounded-lg border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-2">Project</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Deadline</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.name} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500">{p.category}</td>
                  <td className="px-4 py-3 text-gray-500">{p.deadline}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs text-indigo-700">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}