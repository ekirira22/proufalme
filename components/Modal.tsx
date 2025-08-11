import React from 'react'
import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
  return (
    <Dialog.Root
        open={isOpen}
        defaultOpen={isOpen}
        onOpenChange={onChange}
    >
        <Dialog.Portal>

            <Dialog.Overlay 
                className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0 z-[60]"
            />

            <Dialog.Content
                className="
                    fixed 
                    drop-shadow-md 
                    border 
                    border-neutral-700 
                    top-[50%] 
                    left-[50%] 
                    max-h-full
                    md:h-auto
                    md:max-h-[85vh]
                    w-full
                    md:w-[90vw]
                    md:max-w-[450px]
                    translate-x-[-50%]
                    translate-y-[-50%]
                    rounded-md
                    bg-neutral-800
                    p-4
                    sm:p-[25px]
                    focus:outline-none
                    z-[70]
                    mx-4
                    md:mx-0
                "
            >
                <Dialog.Title className="text-lg sm:text-xl text-center font-bold mb-3 sm:mb-4">
                    {title}
                </Dialog.Title>
                <Dialog.Description className="mb-4 sm:mb-5 text-sm leading-normal text-center">
                    {description}
                </Dialog.Description>
                <div>
                    {children}
                </div>
                <Dialog.Close asChild>
                    <button className='text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[32px] w-[32px] sm:h-[25px] sm:w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none'>
                        <IoMdClose className="w-5 h-5 sm:w-4 sm:h-4" />
                    </button>
                </Dialog.Close>
            </Dialog.Content>

        </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal