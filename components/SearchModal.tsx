import React from 'react'
import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from 'react-icons/io'

interface SearchModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    children: React.ReactNode;
}

const SearchModal: React.FC<SearchModalProps> = ({
    isOpen,
    onChange,
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
                className="bg-black/80 backdrop-blur-sm fixed inset-0 z-[999]"
            />
            <Dialog.Content
                className="
                    fixed 
                    top-1/2 left-1/2
                    w-full max-w-md
                    -translate-x-1/2 -translate-y-1/2
                    rounded-lg
                    bg-neutral-900
                    p-4
                    z-[1000]
                    mx-4
                "
            >
                <Dialog.Close asChild>
                    <button className='text-neutral-400 hover:text-white absolute top-2 right-2 inline-flex h-[32px] w-[32px] items-center justify-center rounded-full focus:outline-none'>
                        <IoMdClose className="w-5 h-5" />
                    </button>
                </Dialog.Close>
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  )
}

export default SearchModal 