import { forwardRef } from "react"
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, disabled, type, ...props }, ref) => {
    return (
        <input 
            type={type}
            className={twMerge(`
                flex
                w-full
                rounded-md
                bg-neutral-700
                border
                border-transparent
                px-2
                py-2
                sm:px-3
                sm:py-3
                text-sm
                sm:text-base
                file:border-0
                file:bg-transparent
                file:text-sm
                file:font-medium
                text-neutral-400
                
                disabled: opacity-100
                focus: outline-none
                `, className)}
            disabled={disabled}
            ref={ref}
            {...props}
        />
    )
});

Input.displayName = "Input"

export default Input