"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import toast from "react-hot-toast"

import useAuthModal from "@/hooks/useAuthModal"
import Modal from "./Modal"

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    //To close modal once registred or logged in !!
    useEffect(() => {
        if(session){
            router.refresh();
            onClose()
            // toast.success("Logged in!")
        }
    }, [session, router, onClose])

    const onChange = (open: boolean) => {
        if(!open) {
            onClose();
        }
    }

  return (
    <Modal
        title="Welcome Back"
        description="Login to account"
        isOpen={isOpen}
        onChange={onChange}
    >
        <Auth
            theme="dark" 
            providers={["google"]}
            supabaseClient={supabaseClient}
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22c55e'
                        }
                    }
                }
            }}
        />

    </Modal>
  )
}

export default AuthModal