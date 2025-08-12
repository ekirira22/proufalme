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

 
  useEffect(() => {
    if (isOpen && !session) {
      supabaseClient.auth.signOut()
    }
  }, [isOpen, session, supabaseClient])

  // Handle auth events
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session);
      if (event === 'SIGNED_IN') {
        console.log('User signed in successfully');
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
      } else if (event === 'USER_UPDATED') {
        console.log('User updated');
      } else if (event === 'PASSWORD_RECOVERY') {
        console.log('Password recovery');
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed');
      } else if (event === 'MFA_CHALLENGE_VERIFIED') {
        console.log('MFA challenge verified');
      } 
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabaseClient]);

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
          magicLink={false} // Disable magic links to focus on OAuth
        />
      )}
    </Modal>
  )
}

export default AuthModal