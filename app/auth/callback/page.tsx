"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function AuthCallbackPage() {
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const completeSignIn = async () => {
      const { error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error getting session", error)
      }
      router.push("/") 
    }

    completeSignIn()
  }, [router, supabase])

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg text-gray-500">Signing you in...</p>
    </div>
  )
}
