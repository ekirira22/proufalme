"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import toast from "react-hot-toast"

import useAuthModal from "@/hooks/useAuthModal"
import Modal from "./Modal"
import { isNativeApp } from "@/utils/isNative"

const AuthModal = () => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const { onClose, isOpen } = useAuthModal()

  const redirectTo = isNativeApp()
    ? "proufalme://login-callback"
    : `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`

  // Close modal and refresh page once user is authenticated
  useEffect(() => {
    if (session && isOpen) {
      onClose()
      router.refresh()
    }
  }, [session, isOpen, onClose, router])

  // Force logout ONLY when modal is opened (optional, prevents silent login)
  useEffect(() => {
    if (isOpen && !session) {
      supabaseClient.auth.signOut()
    }
  }, [isOpen, session, supabaseClient])

  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Modal
      title="Welcome Back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      {!session && (
        <Auth
          theme="dark"
          providers={["google", "apple"]}
          supabaseClient={supabaseClient}
          redirectTo={redirectTo}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#404040",
                  brandAccent: "#22c55e",
                },
              },
            },
          }}
        />
      )}
    </Modal>
  )
}

export default AuthModal