"use client";

import { usePathname } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
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
import usePlayer from "@/hooks/usePlayer";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { twMerge } from "tailwind-merge";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "@/types_db";
import { Song } from "@/types";
import { IoClose } from "react-icons/io5";

type SongRow = Database["public"]["Tables"]["songs"]["Row"];

interface SidebarProps {
  children: React.ReactNode;
  songs?: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const player = usePlayer();

  const [songs, setSongs] = useState<Song[]>([]); // 

  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const { isOpen, close } = useSidebarToggle();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("/api/user-songs");

          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`HTTP ${res.status}: ${errText}`);
          }

        const data = await res.json();
        setSongs(data);
      } catch (error) {
        console.error("Failed to fetch user songs:", error);
      }
    };

    fetchSongs();
  }, []);
  
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
    // [
    //   {
    //     icon: BiSolidBinoculars,
    //     label: 'Discover',
    //     active: pathname === '/Discover',
    //     href: '/Discover'
    //   },
    //   {
    //     icon: IoLocation,
    //     label: 'Around You',
    //     active: pathname === '/AroundYou',
    //     href: '/AroundYou'
    //   },
    //   {
    //     icon: MdGroups,
    //     label: 'Top Artists',
    //     active: pathname === '/TopArtists',
    //     href: '/TopArtists'
    //   },
    //   {
    //     icon: FaHashtag,
    //     label: 'Top Charts',
    //     active: pathname === '/TopCharts',
    //     href: '/TopCharts'
    //   }
    // ]
    
  ], [pathname])

  const sidebarContent = (
    <div className="flex flex-col gap-y-2 bg-neutral-900 text-white h-full w-[250px] p-4">
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-lg font-bold">Menu</h2>
        <button onClick={close} className="text-white hover:opacity-75">
          <IoClose size={24} />
        </button>
      </div>

      <Box>
      {routes.map((section, i) => (
        <div key={i}>
          {section.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </div>
      ))}

      </Box>

      <Box className="overflow-y-auto h-full mt-2">
        <Library songs={songs || []} />
      </Box>
    </div>
  );

  // /px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse
    return (
      <div className={twMerge(`
        flex
        h-[100vh]
        overflow-y-scroll
        hide-scrollbar
        flex-col
        xl:flex-row
        `,
        player.activeId && 'h-[calc(100vh-80px)]'
        )}>     
        {/* Desktop Sidebar */}
        <div className="hidden md:flex flex-col bg-transparent h-full w-[300px] p-2">
          {sidebarContent}
        </div>
  
        {/* Mobile Sidebar Drawer */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="absolute left-0 top-0 h-full bg-neutral-900 w-[250px] shadow-lg z-50">
              {sidebarContent}
            </div>
            <div className="h-full w-full" onClick={close}></div>
          </div>
        )}
  
        {/* Main Content */}
        <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
      </div>
  )
}

export default Sidebar