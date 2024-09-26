"use client"
import { useEffect, useState } from "react"

import AuthModal from "@/components/AuthModal"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false) 

    //To prevent hydration errors, we never want to render a modal while in SSR

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }
    

  return (
    <>
        <AuthModal />
    </>
  )
}

export default ModalProvider