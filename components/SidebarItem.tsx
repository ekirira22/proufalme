import Link from "next/link"
import React from "react"
import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge"
import { useSidebarToggle } from '@/hooks/useSidebarToggle';

interface SidebarItemProps {
    icon: IconType
    label: string
    active?: boolean
    href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon, 
    label, 
    active, 
    href,
}) => {
    const { close } = useSidebarToggle();
    const handleClick = () => {
        // Only close sidebar on mobile
        if (window.innerWidth < 768) {
            close();
        }
    };
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={twMerge(`
            flex
            flex-row
            h-auto
            items-center
            w-full
            gap-x-3
            sm:gap-x-4
            text-sm
            sm:text-md
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1
            `, active && "text-white")}
      >
        <Icon size={24} className="sm:w-6 sm:h-6"/>
        <p className="truncate w-full">{ label }</p>
      </Link>
    )
  }

  export default SidebarItem