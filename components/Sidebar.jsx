'use client'

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { LuListMusic } from "react-icons/lu";
import { BiSolidBinoculars } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

const Sidebar = () => {
  const pathname = usePathname()
  const routes = useMemo(() => [
    [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search', //Come back here in case of pathname bugs
        href: '/'
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search'
      }
    ],
    [
      {
        icon: BiSolidBinoculars,
        label: 'Discover',
        active: pathname === '/Discover',
        href: '/Discover'
      },
      {
        icon: IoLocation,
        label: 'Around You',
        active: pathname === '/AroundYou',
        href: '/AroundYou'
      },
      {
        icon: MdGroups,
        label: 'Top Artists',
        active: pathname === '/TopArtists',
        href: '/TopArtists'
      },
      {
        icon: FaHashtag,
        label: 'Top Charts',
        active: pathname === '/TopCharts',
        href: '/TopCharts'
      }
    ]
    
  ], [pathname])

  return (
    <div className="flex">
      <div className="hidden md:flex flex-col gap-y-2 bg-transparent h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes[0].map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </Box>
        <Box>
        <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes[1].map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library 
          />
        </Box>
        
      </div>
    </div>
  )
}

export default Sidebar;
