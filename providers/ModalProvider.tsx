"use client"
import { useEffect, useState } from "react"

import Modal from "@/components/Modal"

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
        <Modal 
          title="Test Modal" 
          description="Test Description" 
          isOpen
          onChange={() => {}}
        >
          Test Children
        </Modal>
    </>
  )
}

export default ModalProvider