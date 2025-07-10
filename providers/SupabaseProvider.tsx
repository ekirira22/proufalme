"use client"

import React, { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { Database } from "@/types_db"
import { isNativeApp } from "@/utils/isNative"

interface SupabaseProviderProps {
  children: React.ReactNode
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [supabaseClient] = useState(() => createClientComponentClient<Database>())

  useEffect(() => {
    if (!isNativeApp()) return

    const setupDeepLinking = async () => {
      try {
        const { App } = await import("@capacitor/app")
        App.addListener("appUrlOpen", async ({ url }) => {
          if (url?.startsWith("myapp://login-callback")) {
            try {
              await supabaseClient.auth.exchangeCodeForSession(url)
              console.log("Deep link session exchanged")
            } catch (err) {
              console.error("Exchange failed", err)
            }
          }
        })
      } catch (err) {
        console.warn("Capacitor App plugin not loaded", err)
      }
    }

    setupDeepLinking()
  }, [supabaseClient])

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  )
}

export default SupabaseProvider;

