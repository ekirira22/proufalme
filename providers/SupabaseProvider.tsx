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
  
    let removeListener: any
  
    const setupDeepLinking = async () => {
      const { App } = await import("@capacitor/app")
  
      removeListener = App.addListener("appUrlOpen", async ({ url }) => {
        if (url?.startsWith("proufalme://login-callback")) {
          const { data, error } = await supabaseClient.auth.exchangeCodeForSession(url)
  
          if (error) {
            console.error("Session exchange error:", error.message)
          } else {
            console.log("Deep link session exchanged:", data)
          }
        }
      })
    }
  
    setupDeepLinking()
  
    return () => {
      if (removeListener && typeof removeListener.remove === "function") {
        removeListener.remove()
      }
    }
  }, [supabaseClient])
  

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  )
}

export default SupabaseProvider;

