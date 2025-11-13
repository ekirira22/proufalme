'use client'

import { signInWithGoogle } from '@/utils/googleAuth'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome to Proufalme</h1>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition"
      >
        Sign in with Google
      </button>
    </div>
  )
}
